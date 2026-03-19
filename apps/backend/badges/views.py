from rest_framework import generics, permissions
from .models import Badge, UserBadge
from .serializers import BadgeSerializer, UserBadgeSerializer

class BadgeListView(generics.ListAPIView):
    queryset = Badge.objects.filter(is_active=True)
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

class MyBadgesView(generics.ListAPIView):
    serializer_class = UserBadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)
