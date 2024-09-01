from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import IntervalTemplate, IntervalDetail
from .serializers import IntervalTemplateSerializer, IntervalDetailSerializer
import json
# Create your views here.
class GetIntervalDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        interval_id = request.GET.get('interval_id')
        interval = get_object_or_404(IntervalTemplate, pk=interval_id)
        interval_serializer = IntervalTemplateSerializer(interval)

        # interval_detail = IntervalDetail.objects.filter(template=interval)
        # interval_detail_serializer = IntervalDetailSerializer(interval_detail, many=True)
        
        return Response({"template" :{"info":interval_serializer.data, "interval": {}}}, status=status.HTTP_200_OK)

class GetIntervalsOfUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        intervals = IntervalTemplate.objects.filter(user=user, is_deleted=False)
        interval_serializer = IntervalTemplateSerializer(intervals, many=True)
        return Response(interval_serializer.data, status=status.HTTP_200_OK)

class AddIntervalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            datas = request.data
            data = {}
            data['name'] = datas['name']
            try:
                data['color'] = datas['color']
            except:
                data['color'] = "#000000"
            data['user'] = user
            interval = (datas['intervals'])
            interval_create = IntervalTemplate.objects.create(**data)
            for i in interval:
                interval_detail = IntervalDetail.objects.create(template=interval_create, value = int (i))
            
            interval_serializer = IntervalTemplateSerializer(interval_create)
            return Response({'data': interval_serializer.data, 'interval': json.dumps(interval), 'message':"Thêm thành công"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UpdateIntervalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            data = request.data['data']
            interval_id = data['id']
            interval = get_object_or_404(IntervalTemplate, pk=interval_id)
            if interval.is_deleted:
                return Response({'message': 'Mục này không tồn tại'}, status=status.HTTP_400_BAD_REQUEST)
            if interval.user != user:
                return Response({'message': 'Bạn không có quyền chỉnh sửa mục này'}, status=status.HTTP_400_BAD_REQUEST)
            for key, value in data.items():
                setattr(interval, key, value)
            interval.save()

            interval_serializer = IntervalTemplateSerializer(interval)
            return Response({'data':interval_serializer.data, "message" : "Chỉnh sửa thành công"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteIntervalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            data = request.data
            interval_id = data['id']
            replace_id = data['replace_id']
            interval = get_object_or_404(IntervalTemplate, pk=interval_id)
            replace_template = get_object_or_404(IntervalTemplate, pk=replace_id)
            if interval.user != user:
                return Response({'message': 'Bạn không có quyền xoá mục này'}, status=status.HTTP_400_BAD_REQUEST)
            interval.is_deleted = True
            interval.save()
            interval_items = IntervalDetail.objects.filter(template=interval)
            for item in interval_items:
                item.template = replace_template
                item.save()
            return Response({'message': 'Xoá thành công'}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error: ", e)
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class AddIntervalItem(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        try:
            data = request.data
            interval_id = data['interval_template_id']
            interval = IntervalTemplate.objects.get(pk = interval_id)
            interval_detail = IntervalDetail.objects.create(template=interval, value=data['value'])
            interval_detail.save()
            return Response({'message': 'Thêm thành công'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeletedIntervalItem(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        try:
            interval_id = request.GET.get('interval_id')
            intervals = IntervalDetail.objects.get(pk = interval_id)
            intervals.delete()
            return Response({'message': 'Xoá thành công'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)