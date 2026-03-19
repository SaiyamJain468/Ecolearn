from django.db import transaction
from .models import EcoPoints
from notifications.services import NotificationService

class PointService:
    @staticmethod
    def award_points(user, points, reason, challenge=None, lesson=None):
        """
        Awards eco-points to a user, updates totals for user and school,
        creates an EcoPoints record, and sends a notification.
        """
        with transaction.atomic():
            # 1. Update User total
            user.eco_points_total += points
            user.save(update_fields=['eco_points_total'])
            
            # 2. Update School total
            if user.school:
                user.school.eco_points_total += points
                user.school.save(update_fields=['eco_points_total'])
            
            # 3. Create EcoPoints record
            eco_point_record = EcoPoints.objects.create(
                user=user,
                points=points,
                reason=reason,
                challenge=challenge,
                lesson=lesson
            )
            
            # 4. Send Notification
            NotificationService.send_notification(
                user=user,
                title="Points Awarded! 🌱",
                body=f"You earned {points} Eco-Points for: {reason}"
            )
            
            return eco_point_record

class ChallengeService:
    @staticmethod
    def submit_challenge(user, challenge, proof_image_url=None):
        """
        Creates a ChallengeSubmission record for a user.
        """
        from .models import ChallengeSubmission
        
        submission = ChallengeSubmission.objects.create(
            user=user,
            challenge=challenge,
            proof_image_url=proof_image_url,
            status='pending'
        )
        return submission

    @staticmethod
    def review_submission(submission_id, reviewer, status, rejection_reason=""):
        """
        Updates a submission status and awards points if approved.
        """
        from .models import ChallengeSubmission
        from django.utils import timezone
        
        with transaction.atomic():
            submission = ChallengeSubmission.objects.select_for_update().get(id=submission_id)
            
            if submission.status != 'pending':
                raise ValueError("Submission is already reviewed")
            
            submission.status = status
            submission.reviewed_by = reviewer
            submission.reviewed_at = timezone.now()
            submission.rejection_reason = rejection_reason
            submission.save()
            
            if status == 'approved':
                PointService.award_points(
                    user=submission.user,
                    points=submission.challenge.points_reward,
                    reason=f"Challenge Completed: {submission.challenge.title}",
                    challenge=submission.challenge
                )
            
            return submission
