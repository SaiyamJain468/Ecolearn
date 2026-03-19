from .models import Notification

class NotificationService:
    @staticmethod
    def send_notification(user, title, body):
        """
        Creates a notification database record and (placeholder) sends push notification.
        """
        notification = Notification.objects.create(
            user=user,
            title=title,
            body=body
        )
        
        # Placeholder for Firebase Cloud Messaging
        # print(f"Pushing notification to {user.username}: {title}")
        
        return notification
