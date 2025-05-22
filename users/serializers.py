from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
CustomUser = get_user_model

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'phone', 'bio')
        extra_kwargs = {'password': {'write_only': True}}

    def create (self, validate_data):
        user = CustomUser.objects.create_user(**validate_data)
        Token.objects.create(user=user)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()