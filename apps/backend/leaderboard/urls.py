from django.urls import path
from .views import SchoolLeaderboardView, StudentLeaderboardView

urlpatterns = [
    path('schools/', SchoolLeaderboardView.as_view(), name='school_leaderboard'),
    path('students/', StudentLeaderboardView.as_view(), name='student_leaderboard'),
]
