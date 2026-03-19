from django.contrib import admin
from .models import Challenge, ChallengeSubmission, EcoPoints

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

@admin.register(EcoPoints)
class EcoPointsAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'reason', 'awarded_at')
    list_filter = ('awarded_at', 'reason')
    search_fields = ('user__username', 'reason')
