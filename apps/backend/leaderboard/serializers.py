from rest_framework import serializers
from users.models import School, CustomUser

class SchoolLeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name', 'eco_points_total', 'city']

class StudentLeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'eco_points_total', 'level']
