# models.py
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt, SerializerMixin, hybrid_property, app, api

##Models


##Manage Timestamps
class TimestampsMixin:
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


# User
class User(db.Model, SerializerMixin, TimestampsMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=True, default=None)
    time_zone = db.Column(db.String, nullable=False)
    subscribed = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)

    @validates("password")
    def validate_password(self, key, value):
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters long.")

        if not any(char in "!@#$%^&*()_-+=<>?/~." for char in value):
            raise ValueError("Password must contain at least one special character.")

        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter.")

        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit.")

        return value

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext_password):
        hashed_password = bcrypt.generate_password_hash(
            plaintext_password.encode("utf-8")
        )
        self._password = hashed_password.decode("utf-8")

    def check_password(self, plaintext_password):
        return bcrypt.check_password_hash(
            self._password, plaintext_password.encode("utf-8")
        )

    # @validates("time_zone")
    # def time_zone(self, key, time_zone):
    #     if not time_zone in ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles']:
    #         raise ValueError("Time zone must be one of the following: 'America/New_York', 'America/Chicago', 'America/Los_Angeles")
    #     return time_zone


# Plan
class Plan(db.Model, SerializerMixin, TimestampsMixin):
    __tablename__ = "plans"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.Float, nullable=False)
    days_per_week = db.Column(db.Integer, nullable=False)
    plan_features = db.relationship("Features", backref="plan", cascade="delete")

    @property
    def all_features(self):
        return (
            [feature.feature_one for feature in self.plan_features]
            + [feature.feature_two for feature in self.plan_features]
            + [feature.feature_three for feature in self.plan_features]
        )

    serialize_rules = ("-all_features",)


class Features(db.Model, SerializerMixin, TimestampsMixin):
    __tablename__ = "features"
    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey("plans.id"))
    feature_one = db.Column(db.String(255), nullable=False)
    feature_two = db.Column(db.String(255), nullable=False)
    feature_three = db.Column(db.String(255), nullable=False)


##if subscribed is True
# Schedule
class Schedule(db.Model, SerializerMixin, TimestampsMixin):
    __tablename__ = "schedules"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    from_date_time = db.Column(db.DateTime, nullable=False)
    to_date_time = db.Column(db.DateTime, nullable=False)


# Users active Plan


class UserPlan(db.Model, SerializerMixin, TimestampsMixin):
    __tablename__ = "user_plans"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    plan_id = db.Column(db.Integer, db.ForeignKey("plans.id"), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey("schedules.id"), nullable=False)
