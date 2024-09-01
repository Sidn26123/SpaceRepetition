from rest_framework import serializers
from utils.datetime_utils import convert_datetime_to_timezone, convert_date_to_standard_format
from django.conf import settings
from .models import Study, ReviewStudy
from apps.intervals.models import IntervalTemplate
from apps.intervals.serializers import IntervalTemplateSerializer
class StudySerializer(serializers.Serializer):
    class Meta:
        model = Study
        fields = ['id','content', 'study_time','created_time', 'updated_at', 'difficulty', 'creator']
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField(max_length=255)
    study_time = serializers.DateField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    difficulty = IntervalTemplateSerializer()

    def create(self, validated_data):
        return Study.objects.create(**validated_data)


    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['study_time'] = convert_date_to_standard_format(str(instance.study_time), '%Y-%m-%d', settings.FORMAT_SHOW_DATE)
        representation['created_at'] = convert_datetime_to_timezone(instance.created_at, settings.TIME_ZONE)\
                                            .strftime(settings.FORMAT_SHOW_TIME)
        representation['updated_at'] = convert_datetime_to_timezone(instance.updated_at, settings.TIME_ZONE)\
                                            .strftime(settings.FORMAT_SHOW_TIME)
        return representation

class ReviewStudySerializer(serializers.Serializer):
    study_content = serializers.CharField(source='study.content')
    class Meta:
        model = ReviewStudy
        fields = ['id','study', 'review_time', 'is_learned', 'count', 'study_content']
    
    id = serializers.IntegerField(read_only=True)
    study = StudySerializer()
    review_time = serializers.DateField()
    is_learned = serializers.BooleanField()
    count = serializers.IntegerField()
    def create(self, validated_data):
        return ReviewStudy.objects.create(**validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = convert_datetime_to_timezone(instance.created_at, settings.TIME_ZONE)\
                                            .strftime(settings.FORMAT_SHOW_TIME)
        representation['review_time'] = convert_date_to_standard_format(str(instance.review_time), '%Y-%m-%d', settings.FORMAT_SHOW_DATE)
        return representation