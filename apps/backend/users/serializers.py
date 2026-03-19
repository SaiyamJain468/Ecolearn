from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import School

User = get_user_model()

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name', 'city', 'state', 'district', 'eco_points_total']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    school_details = SchoolSerializer(source='school', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'first_name', 'last_name',
            'school', 'school_details', 'class_grade', 'role', 'avatar_url', 
            'eco_points_total'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
