from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )
    email = models.EmailField(unique=True)
    school = models.ForeignKey('School', on_delete=models.SET_NULL, null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    class_grade = models.CharField(max_length=10, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    avatar_url = models.URLField(blank=True)
    eco_points_total = models.IntegerField(default=0)
    streak_days = models.IntegerField(default=0)
    level = models.CharField(max_length=50, default="EARTH KEEPER")
    fcm_token = models.CharField(max_length=255, blank=True)

class School(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    eco_points_total = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
