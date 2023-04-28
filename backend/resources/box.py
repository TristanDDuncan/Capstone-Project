from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Subscription,Content,Survey,Payment,Admin,User
from database.schemas import admin_schema, admins_schema, survey_schema,surveys_schema,subscription_schema,subscriptions_schema,content_schema,contents_schema,payment_schema,payments_schema



class SubscriptionListResources(Resource):
    @jwt_required()
    def get(self):
        subscriptions = Subscription.query.all()
        result = subscriptions_schema.dump(subscriptions)
        return result, 200

    def post(self):
        tier = request.json['tier']
        frequency = request.json['frequency']
        amount = request.json['amount']
        new_subscription = Subscription(tier=tier, frequency=frequency, amount=amount)
        db.session.add(new_subscription)
        db.session.commit()
        result = subscription_schema.dump(new_subscription)
        return result, 201
    

class SubscriptionResources(Resource):
    def get(self, subscription_id):
        subscription = Subscription.query.get_or_404(subscription_id)
        if subscription:
            result = subscription_schema.dump(subscription)
            return result, 200
        else:
            return 'Subscription not found', 404
        
            
    @jwt_required()
    def put(self, subscription_id):
            subscription = Subscription.query.get(subscription_id)
            if subscription:
                subscription.tier = request.json['tier']
                subscription.frequency = request.json['frequency']
                subscription.amount = request.json['amount']
                db.session.commit()
                result = subscription_schema.dump(subscription)
                return result, 200
            else:
                return 'Subscription not found', 404
    
    def delete(self, subscription_id):
        subscription = Subscription.query.get_or_404(subscription_id)
        db.session.delete(subscription)
        db.session.commit()
        
        return "", 204
    

class SurveyListResources(Resource):
    @jwt_required()
    def get(self):
        surveys = Survey.query.all()
        result = surveys_schema.dump(surveys)
        return result, 200

    def post(self):
        question = request.json['question']
        answer = request.json['answer']
        new_survey = Survey(question=question, answer=answer)
        db.session.add(new_survey)
        db.session.commit()
        result = survey_schema.dump(new_survey)
        return result, 201
    
class SurveyResources(Resource):
    def get(self, survey_id):
            survey = Survey.query.get_or_404(survey_id)
            if survey:
                result = survey_schema.dump(survey)
                return result, 200
            else:
                return 'Survey not found', 404
      
    @jwt_required()
    def put(self, survey_id):
                survey = Survey.query.get(survey_id)
                if survey:
                    survey.question = request.json['question']
                    survey.answer = request.json['answer']
                    db.session.commit()
                    result = survey_schema.dump(survey)
                    return result, 200
                else:
                    return 'survey not found', 404
    def delete(self, survey_id):
            survey = Survey.query.get_or_404(survey_id)
            db.session.delete(survey)
            db.session.commit()
            return "", 204
    
class PaymentListResources(Resource):
    @jwt_required()
    def get(self):
        payment = Payment.query.all()
        result = payments_schema.dump(payment)
        return result, 200
    
    @jwt_required()
    def post(self):
        amount = request.json['amount']
        date = request.json['date']
        new_payment = Payment(amount=amount, date=date)
        db.session.add(new_payment)
        db.session.commit()
        result = payment_schema.dump(new_payment)
        return result, 201
    



class PaymentResources(Resource):
    @jwt_required()
    def get(self, payment_id):
        payment = Payment.query.get_or_404(payment_id)
        if payment:
            result = payment_schema.dump(payment)
            return result, 200
        else:
            return 'Payment not found', 404
        
    @jwt_required()
    def put(self, payment_id):
                payment = Payment.query.get(payment_id)
                if payment:
                    payment.amount = request.json['amount']
                    payment.date = request.json['date']
                    db.session.commit()
                    result = payment_schema.dump(payment)
                    return result, 200
                else:
                    return 'payment not found', 404
                
    def delete(self, payment_id):
            payment = Payment.query.get_or_404(payment_id)
            db.session.delete(payment)
            db.session.commit()
            return "", 204
    



class AdminListResources(Resource):
    @jwt_required()
    def get(self):
        admin = Admin.query.all()
        result = admins_schema.dump(admin)
        return result, 200
    

    def post(self):
        username = request.json['username']
        password = request.json['password']
        new_admin = Admin(username=username, password=password)
        db.session.add(new_admin)
        db.session.commit()
        result = admin_schema.dump(new_admin)
        return result, 201
    
class AdminResources(Resource):
    @jwt_required()
    def get(self, user_id):
        user_id = request.args.get("user_id")
        custom_reponse = {}
        user_demo =Subscription.query.filter_by(user_id=user_id)
        custom_reponse["data"] = subscriptions_schema.dump(user_demo)
        popularity = [subscription.user for subscription in user_demo]
        try:
        
            average_subscription = sum(popularity)/len(popularity)
            custom_reponse["Average population"]= average_subscription
        except:
                average_subscription = 'Not Available'
                custom_reponse['Average population']= average_subscription
        