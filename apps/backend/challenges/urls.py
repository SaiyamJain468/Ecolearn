from django.urls import path
from .views import (
    ChallengeListView,
    ChallengeSubmissionCreateView,
    MySubmissionsView
)

urlpatterns = [
    path('', ChallengeListView.as_view(), name='challenge_list'),
    path('submit/', ChallengeSubmissionCreateView.as_view(), name='challenge_submit'),
    path('my-submissions/', MySubmissionsView.as_view(), name='my_submissions'),
]
