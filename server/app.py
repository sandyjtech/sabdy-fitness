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
from models import User, Plan, Schedule, UserPlan
from auth import Signup, Authorized, Login, Logout
from plans import AllPlans, PlanById
from mail import EmailResource
from sqlalchemy.exc import IntegrityError

@app.route("/")
@app.route("/<int:id>")
def index(id=0):
    return render_template("index.html")
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# Authentication Resource routes
api.add_resource(Authorized, "/authorized")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")


class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)


api.add_resource(Users, "/all-users")


class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"errors": "User not found."}, 404)
        return make_response(
            user.to_dict(
                only=(
                    "username",
                    "full_name",
                    "email",
                    "admin",
                    "subscribed",
                    "time_zone",
                )
            ),
            200,
        )

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"errors": "User not found."}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response("", 204)

    def patch(self, id):
        data = request.get_json()
        user = User.query.get(id)

        if not user:
            return make_response({"error": "User not found"}, 404)

        # Verify password
        provided_password = data.get("password")
        if not provided_password or not user.check_password(provided_password):
            return make_response({"error": "Invalid password"}, 401)

        try:
            for attr, value in data.items():
                if attr != "password":  # Exclude password from update
                    setattr(user, attr, value)

            db.session.commit()

        except IntegrityError:
            db.session.rollback()
            return make_response({"errors": ["validation errors"]}, 400)

        return make_response(
            user.to_dict(
                only=(
                    "username",
                    "full_name",
                    "email",
                    "admin",
                    "subscribed",
                    "time_zone",
                )
            ),
            202,
        )


api.add_resource(UserById, "/user/<int:id>")

# Plans and Features
api.add_resource(AllPlans, "/all_plans")
api.add_resource(PlanById, "/plan-by-id/<int:id>")

# Email Resource for Contact
api.add_resource(EmailResource, "/send-email")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
