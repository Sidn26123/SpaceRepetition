from rest_framework import serializers
from utils.datetime_utils import convert_datetime_to_timezone, convert_date_to_standard_format
from django.conf import settings

from .models import Trash
from apps.studys.models import Study
from apps.studys.serializers import StudySerializer

class TrashSerializer(serializers.Serializer):
    class Meta:
        model = Trash
        fields = ['id','study', 'created_at']
    id = serializers.IntegerField(read_only=True)
    study = StudySerializer()
    created_at = serializers.DateTimeField()

    def create(self, validated_data):
        return Trash.objects.create(**validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = convert_datetime_to_timezone(instance.created_at, settings.TIME_ZONE)\
                                            .strftime(settings.FORMAT_SHOW_TIME)
        return representation