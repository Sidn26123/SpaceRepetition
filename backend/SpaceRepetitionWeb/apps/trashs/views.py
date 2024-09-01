import time
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import datetime
from django.http import JsonResponse
from django.conf import settings
from django.core.files import File
from common.validators import *
from utils import validation_utils
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import Trash
from apps.studys.models import Study
from utils.file_utils import handle_avatar_name, save_avatar, fetch_avatar_file
from utils.jwt_utils import is_jwt_expired, extract_value_from_jwt
from .serializers import TrashSerializer
class AddTrashItem(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        try:
            data = request.data
            print(data['study_id'])
            study = Study.objects.get(id=data['study_id'])
            
            trash_item = Trash.objects.create(
                study = study,
                created_at = datetime.datetime.now(),
                user = user
            )
            print(trash_item)
            trash_item.save()
            return JsonResponse({'message': 'Trash item added successfully'}, status=200)
        except KeyError:
            return JsonResponse({'message': 'Invalid request'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
        
class DeleteTrashItem(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        try:
            data = request.data
            trash_item = Trash.objects.get(id=data['id'])
            trash_item.delete()
            return JsonResponse({'message': 'Trash item deleted successfully'}, status=200)
        except KeyError:
            return JsonResponse({'message': 'Invalid request'}, status=400)
        except Exception as e:
            print("Error: ", e)
            return JsonResponse({'message': str(e)}, status=500)
        
class GetTrashItems(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        try:
            trash_items = Trash.objects.filter(user=user)
            if (len(trash_items) == 0):
                return JsonResponse({'message': 'No trash items found'}, status = 200)
            trash_serializer = TrashSerializer(trash_items, many=True)
            return JsonResponse(trash_serializer.data, status=200, safe = False)
        except Exception as e:
            print(e)
            return JsonResponse({'message': str(e)}, status=500)