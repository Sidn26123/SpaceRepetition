import jwt
import datetime

from django.conf import settings

def is_jwt_expired(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        if 'exp' in payload.keys():
            exp = payload.get('exp')
            current_time = datetime.datetime.utcnow()
            exp_time = datetime.datetime.fromtimestamp(exp)
            if current_time > exp_time:
                return True
            
    except jwt.ExpiredSignatureError:
        return True
    return False

def extract_value_from_jwt(token, key):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload.get(key)
    except:
        return None