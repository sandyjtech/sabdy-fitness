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
from models import User, Plan, Schedule, UserPlan, Features


##Plans
class AllPlans(Resource):
    def get(self):
        all_plans = [
            p.to_dict(
                only=(
                    "id",
                    "title",
                    "description",
                    "price",
                    "duration",
                    "days_per_week",
                    "all_features",
                )
            )
            for p in Plan.query.all()
        ]
        return make_response(all_plans, 200)

    def post(self):
        data = request.get_json()
        try:
            new_plan_data = {
                "title": data["title"],
                "description": data["description"],
                "price": data["price"],
                "duration": data["duration"],
                "days_per_week": data["days_per_week"],
            }

            new_plan = Plan(**new_plan_data)
            db.session.add(new_plan)
            db.session.commit()

            new_feature_data = {
                "plan_id": new_plan.id,
                "feature_one": data["feature_one"],
                "feature_two": data["feature_two"],
                "feature_three": data["feature_three"],
            }

            new_feature = Features(**new_feature_data)
            db.session.add(new_feature)
            db.session.commit()

            return make_response(
                {"message": "Plan and features added successfully"}, 200
            )

        except Exception as e:
            return make_response({"error": str(e)}, 400)


class PlanById(Resource):
    def get(self, id):
        plan = Plan.query.get(id)
        if not plan:
            return make_response({"error": "Plan not found"}, 404)

        plan_data = plan.to_dict(
            only=(
                "id",
                "title",
                "description",
                "price",
                "duration",
                "days_per_week",
                "all_features",
            )
        )

        return make_response(plan_data, 200)

    def delete(self, id):
        plan = Plan.query.filter_by(id=id).first()
        if not plan:
            return make_response({"error": "Plan not found"}, 404)
        db.session.delete(plan)
        db.session.commit()
        return make_response("", 204)

    def patch(self, id):
        data = request.get_json()
        plan = Plan.query.get(id)

        if not plan:
            return make_response({"error": "Plan not found"}, 404)

        try:
            # Update Plan and Features
            for attr, value in data.items():
                if hasattr(plan, attr):
                    setattr(plan, attr, value)

                # Check if the attribute corresponds to a feature
                for feature in plan.plan_features:
                    if hasattr(feature, attr):
                        setattr(feature, attr, value)

            db.session.commit()
            return make_response(
                plan.to_dict(
                    only=(
                        "title",
                        "description",
                        "price",
                        "duration",
                        "days_per_week",
                        "all_features",
                    )
                ),
                202,
            )

        except Exception as e:
            db.session.rollback()
            return make_response({"error": f"Update failed: {str(e)}"}, 400)
