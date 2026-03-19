from rest_framework import serializers
from .models import Challenge, ChallengeSubmission

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'

class ChallengeSubmissionSerializer(serializers.ModelSerializer):
    challenge_details = ChallengeSerializer(source='challenge', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ChallengeSubmission
        fields = [
            'id', 'challenge', 'challenge_details', 'user', 'user_username',
            'status', 'proof_image_url', 'submitted_at', 'rejection_reason'
        ]
        read_only_fields = ['user', 'status', 'submitted_at', 'rejection_reason']
