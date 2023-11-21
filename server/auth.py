from flask import (
    abort,
    request,
    session,
    Flask,
    make_response,
    jsonify,
    request,
    session,
)
from config import app, api, db, Resource
from sqlalchemy.exc import IntegrityError
from models import User


##Authorization
class Signup(Resource):
    def post(self):
        req_json = request.get_json()
        try:
            new_user = User(
                full_name=req_json["full_name"],
                username=req_json["username"],
                email=req_json["email"],
                time_zone=req_json["time_zone"],
            )
            # Optional fields
            if "phone" in req_json:
                new_user.phone = req_json["phone"]

            new_user.password = req_json["password"]
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except IntegrityError as e:
            db.session.rollback()
            return {"error": "Username already in use"}, 409
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


class Login(Resource):
    def post(self):
        req_json = request.get_json()
        username = req_json["username"]
        password = req_json["password"]

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {"error": "Invalid username or password"}, 401


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "204: No Content"}, 204


class Authorized(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"Error": "User not found"}, 401)


        
# Inside your Flask app
class PasswordReset(Resource):
    def post(self):
        req_json = request.get_json()
        user = User.query.filter_by(email=req_json.get("email")).first()

        if user:
            # Generate a unique token and send it in an email
            # Include a link in the email for the user to reset their password
            # You may want to use Flask-Mail or another library for email functionality
            # Example code for sending email is in your provided code
            # ...

            return {"message": "Password reset email sent successfully"}, 200
        else:
            return {"error": "User not found"}, 404