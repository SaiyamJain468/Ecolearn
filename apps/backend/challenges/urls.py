from django.urls import path
from .views import (
    ChallengeListView,
    ChallengeSubmissionCreateView,
    MySubmissionsView,
    MyPointsHistoryView
)

urlpatterns = [
    path('', ChallengeListView.as_view(), name='challenge_list'),
    path('submit/', ChallengeSubmissionCreateView.as_view(), name='challenge_submit'),
    path('my-submissions/', MySubmissionsView.as_view(), name='my_submissions'),
    path('my-points/', MyPointsHistoryView.as_view(), name='my_points_history'),
]
