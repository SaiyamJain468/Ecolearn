from .models import Badge, UserBadge
from notifications.services import NotificationService

class BadgeService:
    @staticmethod
    def check_and_award_badges(user, category):
        """
        Checks available badges in a category and awards them if user meets criteria.
        """
        # Get all active badges in the category that the user hasn't earned yet
        earned_badge_ids = UserBadge.objects.filter(user=user).values_list('badge_id', flat=True)
        available_badges = Badge.objects.filter(
            category=category,
            is_active=True
        ).exclude(id__in=earned_badge_ids)
        
        awarded_count = 0
        for badge in available_badges:
            if user.eco_points_total >= badge.required_points:
                UserBadge.objects.create(user=user, badge=badge)
                
                # Notify user
                NotificationService.send_notification(
                    user=user,
                    title=f"New Badge Earned! {badge.icon_emoji}",
                    body=f"Congratulations! You've earned the '{badge.name}' badge."
                )
                awarded_count += 1
                
        return awarded_count
