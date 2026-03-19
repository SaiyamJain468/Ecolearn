from django.contrib import admin
from .models import Challenge, ChallengeSubmission

@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'points_reward', 'difficulty', 'is_active')
    list_filter = ('category', 'difficulty', 'is_active')
    search_fields = ('title', 'description')

@admin.register(ChallengeSubmission)
class ChallengeSubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'challenge', 'status', 'submitted_at')
    list_filter = ('status', 'submitted_at')
    search_fields = ('user__username', 'challenge__title')
    readonly_fields = ('submitted_at',)
