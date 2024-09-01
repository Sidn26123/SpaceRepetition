import time
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import datetime
from django.http import JsonResponse
from django.conf import settings
from django.core.files import File
from .serializers import UserSerializer
from common.validators import *
from utils import validation_utils
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from utils.file_utils import handle_avatar_name, save_avatar, fetch_avatar_file
from utils.jwt_utils import is_jwt_expired, extract_value_from_jwt
#pyjwt
import jwt
from rest_framework.response import Response
#import RefreshToken
from rest_framework_simplejwt.tokens import RefreshToken, BlacklistedToken


# Create your views here.
class Register(APIView):
    def post(self, request):
        # if request.user.is_authenticated:
        #     return Response({'message': ALREADY_LOGGED_IN_MESSAGE, 'code': ALREADY_LOGGED_IN_CODE}, status = 200)
        data = request.data
        try:
            serializer = UserSerializer(data = data)
            if serializer.is_valid():
                #check password, raise exception if password is not valid
                if not validation_utils.is_valid_password(data['password']):
                    return Response({'message': INVALID_PASSWORD_MESSAGE, 'code': INVALID_PASSWORD_CODE}, status = 400)
                if not validation_utils.is_valid_username(data['username']):
                    return Response({'message': INVALID_USERNAME_MESSAGE, 'code': INVALID_USERNAME_CODE}, status = 400)
                serializer.save()
                user = User.objects.get(username=data['username'])
                user.set_password(data['password'])
                user.save()
                data = {
                    'message': ACCOUNT_CREATE_SUCCESS_MESSAGE,
                    'code': ACCOUNT_CREATE_SUCCESS_CODE,
                    'data': serializer.data
                }
                return Response(data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'message': 'Tài khoản đã tồn tại', 'code': 'account_already_exist'}, status = 400)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response({'user': user_serializer.data}, status = 200)

#import BlacklistedToken
def is_token_blacklisted(refresh_token):
    try:
        token = RefreshToken(refresh_token)
        # Kiểm tra nếu token đã bị đưa vào danh sách đen
        is_blacklisted = BlacklistedToken.objects.filter(token=token).exists()
        return is_blacklisted
    except Exception as e:
        print(f"Error checking token: {str(e)}")
        return False
class Logout(APIView):

    def post(self, request):
        # remove simple jwt token

        try:
            refresh_token = request.data.get('refresh_token')
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            print('blacklist token: ', is_token_blacklisted(refresh_token))
            data = {
                'message': 'Đăng xuất thành công',
                'code': 'logout_success'
            }
            res = Response()
            res.data = data 
            return res
        except Exception as e:
            print(e)
            return Response({'message': 'Đăng xuất thất bại', 'code': 'logout_fail'}, status = 400)
def logout_user(request):
    logout(request)
    res = Response()
    res.delete_cookie('jwt')
    return res