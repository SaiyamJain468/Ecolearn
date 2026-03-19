from django.db import models
from django.conf import settings

class Challenge(models.Model):
    CATEGORY_CHOICES = (
        ('plant', 'Planting'),
        ('waste', 'Waste Management'),
        ('water', 'Water Conservation'),
        ('energy', 'Energy Saving'),
        ('awareness', 'Awareness'),
    )
    DIFFICULTY_CHOICES = (
        (1, 'Easy'),
        (2, 'Medium'),
        (3, 'Hard'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    points_reward = models.IntegerField()
    proof_required = models.BooleanField(default=False)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ChallengeSubmission(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    proof_image_url = models.URLField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='reviewed_submissions'
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.challenge.title}"

class EcoPoints(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='eco_points')
    points = models.IntegerField()
    reason = models.CharField(max_length=200)
    challenge = models.ForeignKey(Challenge, null=True, blank=True, on_delete=models.SET_NULL)
    lesson = models.ForeignKey('lessons.Lesson', null=True, blank=True, on_delete=models.SET_NULL)
    awarded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['user'])]
        verbose_name_plural = "Eco points"

    def __str__(self):
        return f"{self.user.username} - {self.points} pts ({self.reason})"
