import os
import logging
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from config import app, Resource
from dotenv import load_dotenv

load_dotenv()
# Flask-Mail configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587  
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("ADMIN_EMAIL")
app.config["MAIL_PASSWORD"] = os.environ.get("ADMIN_MAIL_PASSWORD")

logging.basicConfig(level=logging.DEBUG) 

mail = Mail(app)

class EmailResource(Resource):
    def post(self):
        data = request.json
        name = data.get("name", "")
        email = data.get("email", "")
        message = data.get("message", "")

        # Email content
        msg = Message("New Contact Form Submission", sender=email, recipients=[os.environ.get("ADMIN_EMAIL")])
        msg.body = f"Name: {name}\nUser's Email: {email}\nMessage: {message}"

        try:
            mail.send(msg)
            logging.info("Email sent successfully")
            print("Email sent successfully")  # Add this line for debugging
            return {"message": "Email sent successfully"}, 200
        except Exception as e:
            print(f"Error sending email: {e}") 
            logging.error(f"Error sending email: {e}")
            return {"error": str(e)}, 500

