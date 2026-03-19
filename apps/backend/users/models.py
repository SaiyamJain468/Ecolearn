from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Minimal fields for Task 3.1
    school = models.ForeignKey('School', on_delete=models.SET_NULL, null=True, blank=True)
    class_grade = models.CharField(max_length=10, blank=True)
    role = models.CharField(max_length=20, default='student')
    avatar_url = models.URLField(blank=True)
    eco_points_total = models.IntegerField(default=0)
    fcm_token = models.CharField(max_length=255, blank=True)

class School(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    eco_points_total = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
