from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class GlobalLeaderboardView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-eco_points_total')[:50]
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class SchoolLeaderboardView(generics.ListAPIView):
    queryset = School.objects.all().order_by('-eco_points_total')[:20]
    serializer_class = SchoolSerializer
    permission_classes = [permissions.IsAuthenticated]
