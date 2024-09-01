from .models import IntervalTemplate, IntervalDetail
from rest_framework import serializers

class IntervalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervalDetail
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
    
class IntervalTemplateSerializer(serializers.ModelSerializer):
    intervals = IntervalDetailSerializer(many=True, read_only=True, source='intervaldetail_set')
    class Meta:
        model = IntervalTemplate
        fields = '__all__'
    

