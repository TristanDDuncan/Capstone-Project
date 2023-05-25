from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Subscription, Content ,Survey , Admin, Payment
ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    address = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    city = fields.String(required=True)
    state = fields.String(required=True)
    zip_code = fields.String(required=True)
    subscription = fields.String(required=False)
    is_admin = fields.Boolean(required=False)
    class Meta:
        fields = ("id", "username",  "password", "address","first_name", "last_name", "email", "city", "state", "zip_code","subscription", "is_admin")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    address = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    city = fields.String(required=True)
    state = fields.String(required=True)
    zip_code = fields.String(required=True)
    subscription = fields.String(required=False)
    is_admin = fields.Boolean(required=False)

    class Meta:
        fields = ("id", "username", "first_name", "address", "last_name", "email", "city", "state", "zip_code", "subscription","is_admin")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below

class ContentSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    quantity = fields.Integer(primary_key=True)
    subscription_id = fields.Integer()
    class Meta:
        fields = ("id", "quantity", "subscription_id")
    @post_load
    def create_content(self, data, **kwargs):
        return Content(**data)
content_schema = ContentSchema()
contents_schema = ContentSchema(many=True)

class SubscriptionSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    tier = fields.String(required=True)
    frequency = fields.String(required=True)
    category = fields.String(required=True)
    amount = fields.Integer(required=True)
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "tier", "frequency","category", "amount", "user_id", "user")

    @post_load
    def create_subscription(self, data, **kwargs):
        return Subscription(**data)

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)



class SurveySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    question = fields.String(required=True)
    answer = fields.String(required=True)
    user_id = fields.Integer()
  

    class Meta:

        fields = ("id", "question", "answer", "user_id")
    @post_load
    def create_survey(self, data, **kwargs):
        return Survey(**data)
survey_schema = SurveySchema()
surveys_schema = SurveySchema(many=True)

class PaymentSchema(ma.Schema):
    id = fields.Integer(primkary_key= True)
    amount = fields.Integer()
    date = fields.DateTime()
    user_id = fields.Integer()

    class Meta:
        fields = ("id", "amount", "date", "user_id")
    @post_load
    def create_payment(self, data, **kwargs):
        return Payment(**data)
payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)


class AdminSchema(ma.Schema):
    id = fields.Integer(primkary_key= True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "password")
    @post_load
    def create_admin(self, data, **kwargs):
        return Admin(**data)
admin_schema = AdminSchema()
admins_schema = AdminSchema(many=True)