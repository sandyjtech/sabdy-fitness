#Deploy add
import os

import secrets
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from dotenv import load_dotenv

load_dotenv()
# Instantiate app, set attributes
# Instantiate app, set attributes
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
#Deploy add#
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Secret Key
app.secret_key = secrets.token_hex(16)

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
db.init_app(app)
migrate = Migrate(app, db)

# Instantiate CORS
CORS(app)

# Instantiate REST API
api = Api(app)

# Instantiate Flask-Bcrypt
bcrypt = Bcrypt(app)