from django.db import models
from django.conf import settings

class Badge(models.Model):
    CATEGORY_CHOICES = (
        ('plant', 'Planting'),
        ('waste', 'Waste Management'),
        ('water', 'Water Conservation'),
        ('energy', 'Energy Saving'),
        ('awareness', 'Awareness'),
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_url = models.URLField(blank=True)
    icon_emoji = models.CharField(max_length=10) # e.g. "🌱"
    required_points = models.IntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class UserBadge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['user', 'badge']]

    def __str__(self):
        return f"{self.user.username} earned {self.badge.name}"
