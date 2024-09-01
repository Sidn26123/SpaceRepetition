from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['id'] = user.id
        token['avatar'] = user.avatar
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id','username', 'avatar', 'email']
        extra_kwargs = {'password': {'write_only': True}}
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=255)
    #password = serializers.CharField(max_length=255)
    avatar = serializers.CharField(required=False)
    email = serializers.EmailField()

    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password != None:
            instance.set_password(password)
        instance.save()
        return instance
    