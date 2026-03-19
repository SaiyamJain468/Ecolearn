from django.urls import path
from .views import BadgeListView, MyBadgesView

urlpatterns = [
    path('', BadgeListView.as_view(), name='badge_list'),
    path('my/', MyBadgesView.as_view(), name='my_badges'),
]
