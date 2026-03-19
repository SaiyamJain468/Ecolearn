from rest_framework import generics, permissions
from rest_framework.response import Response
from django.core.cache import cache
from users.models import School, CustomUser
from .serializers import SchoolLeaderboardSerializer, StudentLeaderboardSerializer

class SchoolLeaderboardView(generics.ListAPIView):
    serializer_class = SchoolLeaderboardSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # In a real app we'd use cache, but for hackathon demo we'll just fetch
        return School.objects.all().order_by('-eco_points_total')[:20]

class StudentLeaderboardView(generics.ListAPIView):
    serializer_class = StudentLeaderboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        school_id = self.request.query_params.get('school_id')
        if school_id:
            return CustomUser.objects.filter(school_id=school_id, role='student').order_by('-eco_points_total')[:20]
        return CustomUser.objects.filter(role='student').order_by('-eco_points_total')[:50]
