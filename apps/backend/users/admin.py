from django.contrib import admin
from .models import CustomUser, School

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'school', 'role', 'eco_points_total')
    list_filter = ('role', 'school')

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'eco_points_total')
    search_fields = ('name', 'city')
