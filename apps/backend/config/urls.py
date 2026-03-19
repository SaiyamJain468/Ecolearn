from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/challenges/', include('challenges.urls')),
    path('api/lessons/', include('lessons.urls')),
    path('api/badges/', include('badges.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/leaderboard/', include('leaderboard.urls')),
]
