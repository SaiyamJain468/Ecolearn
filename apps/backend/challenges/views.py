from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Challenge, ChallengeSubmission, EcoPoints
from .serializers import (
    ChallengeSerializer, 
    ChallengeSubmissionSerializer,
    EcoPointsSerializer
)
from .services import ChallengeService

class ChallengeListView(generics.ListAPIView):
    queryset = Challenge.objects.filter(is_active=True)
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

class ChallengeSubmissionCreateView(generics.CreateAPIView):
    serializer_class = ChallengeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # We call the service instead of just saving the serializer 
        # to ensure any custom logic is executed.
        challenge = serializer.validated_data['challenge']
        proof_image_url = self.request.data.get('proof_image_url')
        
        ChallengeService.submit_challenge(
            user=self.request.user,
            challenge=challenge,
            proof_image_url=proof_image_url
        )

class MySubmissionsView(generics.ListAPIView):
    serializer_class = ChallengeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChallengeSubmission.objects.filter(user=self.request.user)

class MyPointsHistoryView(generics.ListAPIView):
    serializer_class = EcoPointsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return EcoPoints.objects.filter(user=self.request.user).order_by('-awarded_at')
