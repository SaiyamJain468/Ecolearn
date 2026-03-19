from django.contrib import admin
from .models import Lesson, QuizQuestion, LessonProgress

class QuizQuestionInline(admin.TabularInline):
    model = QuizQuestion
    extra = 1

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'difficulty', 'xp_reward', 'order')
    list_filter = ('category', 'difficulty')
    search_fields = ('title',)
    inlines = [QuizQuestionInline]

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'lesson')
    list_filter = ('lesson',)

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'completed', 'score', 'completed_at')
    list_filter = ('completed', 'completed_at')
