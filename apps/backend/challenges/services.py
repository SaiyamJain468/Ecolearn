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
