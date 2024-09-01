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
from .models import Study, ReviewStudy
from .serializers import StudySerializer, ReviewStudySerializer
from apps.intervals.models import IntervalTemplate
from utils.datetime_utils import convert_datetime_to_timezone, convert_date_to_standard_format, start_date, get_current_date_and_format
#pyjwt
# Create your views here.
class StudyInDay(APIView):
    """
    Nội dung học mới trong ngày
    """
    permission_classes = [IsAuthenticated] #cần đăng nhập vì app này kiểu riêng tư
    def get(self, request):
        user = request.user
        date = request.GET.get('date')
        date = str(convert_date_to_standard_format(date,'%d-%m-%Y', '%Y-%m-%d')).split(' ')[0]       
        studys = Study.objects.filter(creator=user, study_time = date, is_deleted=False)
        
        study_serializer = StudySerializer(studys, many=True)
        return Response(study_serializer.data, status=status.HTTP_200_OK)
import json
class AddStudyView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = request.user
            data = request.data
            data['creator'] = user
            try :
                study_time = data['study_time']
            except KeyError:
                study_time = get_current_date_and_format('%d/%m/%Y')
            data['study_time'] = convert_date_to_standard_format(study_time, '%d/%m/%Y', '%Y-%m-%d')
            difficulty_id = data['difficulty']['id']
            difficulty = get_object_or_404(IntervalTemplate, pk=difficulty_id)
            data['difficulty'] = difficulty

            
            study_data = {}
            study_data['content'] = data['content']
            study_data['difficulty'] = difficulty
            study_data['creator'] = user
            study_data['study_time'] = data['study_time']

            study_create = Study.objects.create(**study_data)
            study_serializer = StudySerializer(study_create)
            #create review stone
            review_times = json.loads(str(data['interval']))
            count = 0
            for i in review_times:
                #str to datetime
                count += 1

                study_time_value = datetime.datetime.strptime(study_time, '%d/%m/%Y')
                study_time_value = study_time_value + datetime.timedelta(days=i)
                study_time_value = study_time_value.strftime('%Y-%m-%d')
                review_item = ReviewStudy.objects.create(study=study_create, review_time = study_time_value, count = count)
            return Response(study_serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'message': 'Data integrity error'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateStudyView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = request.user
            data = request.data
            study_id = data['id']
            study = Study.objects.get(pk=study_id)
            if study.creator != user:
                return Response({'message': 'Bạn không có quyền chỉnh sửa mục này'}, status=status.HTTP_400_BAD_REQUEST)
            #deserialize data.difficulty (IntervalTemplate)
            
            for key, value in data.items():
                if key == 'difficulty':
                    difficulty_id = data['difficulty']['id']
                    difficulty = get_object_or_404(IntervalTemplate, pk=difficulty_id)
                    setattr(study, key, difficulty)
                elif key == 'study_time':
                    setattr(study, key, convert_date_to_standard_format(value, '%d/%m/%Y', '%Y-%m-%d'))
                else:
                    setattr(study, key, value)
            study.save()
            
            study_serializer = StudySerializer(study)
            print(study_serializer.data)
            return Response(study_serializer.data, status=status.HTTP_200_OK)
        

        except Exception as e:
            print("error", str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteStudyView(APIView):
    """
    """
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = request.user
            data = request.data
            study_id = data['id']
            study = get_object_or_404(Study, pk=study_id)   
            if study.creator != user:
                return Response({'message': 'Bạn không có quyền xoá mục này'}, status=status.HTTP_400_BAD_REQUEST)
            study.is_deleted = True
            study.save()
            return Response({'message': 'Xoá thành công'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class GetNeedToLearn(APIView):
    """
    Lấy số lượng học liệu cần ôn tập trong ngày
    """
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        date_str = request.GET.get('date')
        date_str = convert_date_to_standard_format(date_str,'%d/%m/%Y', '%Y-%m-%d')
        studys = Study.objects.filter(creator=user, is_deleted=False)
        reviews = ReviewStudy.objects.filter(study_id__in = studys, is_deleted =False,  review_time = date_str).select_related('study')
        review_serializer = ReviewStudySerializer(reviews, many=True)
        return Response(review_serializer.data, status=status.HTTP_200_OK)
import utils.datetime_utils as datetime_utils
from django.db.models import Q, When, Case, Count, IntegerField

class GetLearnedStudyInTimeSpacesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        data = request.data
        date_start_str = data['date_start'] #dd/mm/yyyy
        date_end_str = data['date_end'] 
        try:
            number_of_milestone = data['quantity']
        except:
            number_of_milestone = 5        
        quantity = data['quantity']
        try:
            landmark = data['landmark']
        except:
            landmark = "end"

        pairs = datetime_utils.generate_date_pairs(date_start_str, date_end_str, number_of_milestone, landmark)
        pairs_result = []
        pair_item = [0,0]
        for pair in pairs:
            pair_item[0] = convert_date_to_standard_format(pair[0],'%d/%m/%Y', '%Y-%m-%d')
            pair_item[1] = convert_date_to_standard_format(pair[1],'%d/%m/%Y', '%Y-%m-%d')
            pairs_result.append(pair_item)
        when_conditions = [
            When(Q(review_time__gte=pair[0]) & Q(review_time__lt=pair[1]), then=index + 1)
            for index, pair in enumerate(pairs_result)
        ]

        date_start_str = convert_date_to_standard_format(date_start_str,'%d/%m/%Y', '%Y-%m-%d')
        date_end_str = convert_date_to_standard_format(date_end_str,'%d/%m/%Y', '%Y-%m-%d')
        # reviews = ReviewStudy.objects.filter(study__creator=user, review_time__gte = date_start_str, review_time__lte=date_end_str).prefetch_related('study')
        # reviews = ReviewStudy.objects.filter(
        #     study__creator=user,
        #     review_time__gte=date_start_str,
        #     review_time__lte=date_end_str
        # ).prefetch_related('study')\
        # .annotate(
        #     group=Case(*when_conditions, output_field=IntegerField())
        # ).values('group').annotate(count=Count('id')).order_by('group')
        reviews = ReviewStudy.objects.filter(
            study__creator=user,
            review_time__gte=date_start_str,
            review_time__lte=date_end_str,
            is_deleted=False
        ).annotate(
            group=Case(*when_conditions, output_field=IntegerField())
        ).prefetch_related('study').annotate(counts=Count('id'))
        reviews_serializer = ReviewStudySerializer(reviews, many=True)
        
        return Response(reviews_serializer.data, status=status.HTTP_200_OK)

class GetTotalLearnedStudyInTimeSpacesView(APIView):
    """
    Lấy số lượng học liệu đã học trong các khoảng thời gian
    """
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        data = request.data
        date_start_str =  request.GET.get('date_start') #dd/mm/yyyy
        date_end_str = request.GET.get('date_end') 
        try:
            number_of_milestone = int (request.GET.get('quantity'))
        except:
            number_of_milestone = 5        
        try:
            landmark = data['landmark']
        except:
            landmark = "end"

        pairs = datetime_utils.generate_date_pairs(date_start_str, date_end_str, number_of_milestone, landmark)
        pairs_result = []
        #format lại datetime format từ dd/mm/yyyy sang yyyy-mm-dd
        for pair in pairs:
            # Tạo cặp giá trị mới trong mỗi lần lặp
            pair_item = [
                convert_date_to_standard_format(pair[0], '%d/%m/%Y', '%Y-%m-%d'),
                convert_date_to_standard_format(pair[1], '%d/%m/%Y', '%Y-%m-%d')
            ]
            pairs_result.append(pair_item)
        date_start_str = convert_date_to_standard_format(date_start_str,'%d/%m/%Y', '%Y-%m-%d')
        date_end_str = convert_date_to_standard_format(date_end_str,'%d/%m/%Y', '%Y-%m-%d')
        when_conditions = [
            When(Q(review_time__gte=pair[0]) & Q(review_time__lte=pair[1]), then=index + 1)
            for index, pair in enumerate(pairs_result)
        ]
        # for condition in when_conditions:
        #     print(condition)
        counts = ReviewStudy.objects.filter(
            study__creator=user,
            review_time__gte=date_start_str,
            review_time__lte=date_end_str,
            is_deleted=False
        ).values('id', 'review_time')\
        .annotate(
            group=Case(*when_conditions, output_field=IntegerField())
        ).values('group').annotate(counts=Count('id')).order_by('group')
        result_counts = []


        for index, pair in enumerate(pairs_result):
            pair.append(index + 1)
            if not any(count['group'] == pair[0] for count in counts):
                result_counts.append({'group': pair[0], 'counts': 0})
            else:
                result_counts.append({'group': pair[0], 'counts': counts[index]['counts']})
        return Response(counts, status=status.HTTP_200_OK)

class UpdateReviewStudy(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = request.user
            data = request.data
            review_id = data['id']
            review = get_object_or_404(ReviewStudy, pk=review_id)
            if review.study.creator != user:
                return Response({'message': 'Bạn không có quyền chỉnh sửa mục này'}, status=status.HTTP_400_BAD_REQUEST)
            for key, value in data.items():
                setattr(review, key, value)
            review.save()
            review_serializer = ReviewStudySerializer(review)
            return Response(review_serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print("error", str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# class GetFinishedStudyInSpacesView(APIView):
#     """
#     Lấy số lượng học liệu đã học trong các khoảng thời gian
#     """
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         user = request.user
#         data = request.data
#         date_start_str = data['date_start'] #dd/mm/yyyy
#         date_end_str = data['date_end'] 
#         try:
#             number_of_milestone = data['quantity']
#         except:
#             number_of_milestone = 5        
#         quantity = data['quantity']
#         try:
#             landmark = data['landmark']
#         except:
#             landmark = "end"

#         pairs = datetime_utils.generate_date_pairs(date_start_str, date_end_str, number_of_milestone, landmark)
#         pairs_result = []
#         #format lại datetime format từ dd/mm/yyyy sang yyyy-mm-dd
#         for pair in pairs:
#             # Tạo cặp giá trị mới trong mỗi lần lặp
#             pair_item = [
#                 convert_date_to_standard_format(pair[0], '%d/%m/%Y', '%Y-%m-%d'),
#                 convert_date_to_standard_format(pair[1], '%d/%m/%Y', '%Y-%m-%d')
#             ]
#             pairs_result.append(pair_item)
#         date_start_str = convert_date_to_standard_format(date_start_str,'%d/%m/%Y', '%Y-%m-%d')
#         date_end_str = convert_date_to_standard_format(date_end_str,'%d/%m/%Y', '%Y-%m-%d')
#         when_conditions = [
#             When(Q(review_time__gte=pair[0]) & Q(review_time__lte=pair[1]), then=index + 1)
#             for index, pair in enumerate(pairs_result)
#         ]
#         for condition in when_conditions:
#             print(condition)
#         counts = ReviewStudy.objects.filter(
#             study__creator=user,
#             review_time__gte=date_start_str,
#             review_time__lte=date_end_str
#         ).values('id', 'review_time', 'is_learned', 'count')\
#         .annotate(
#             group=Case(*when_conditions, output_field=IntegerField())
#         ).annotate(counts=Count('id')).order_by('group')
#         unique_rows = []
#         seen = set()
#         for d in counts:
#             identifier = (d.get('id'), d.get('is_learned'), d.get('group'))
#             if d.get('count') 
#             if identifier not in seen:
#                 unique_rows.append(d)
#                 seen.add(identifier)
        
#         for s in seen:
#             print(s)
#         return Response(counts, status=status.HTTP_200_OK)
