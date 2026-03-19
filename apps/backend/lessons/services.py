from django.db import transaction
from django.utils import timezone
from .models import LessonProgress
from challenges.services import PointService

class LessonService:
    @staticmethod
    def start_lesson(user, lesson):
        """
        Initializes lesson progress for a user if it doesn't exist.
        """
        progress, created = LessonProgress.objects.get_or_create(
            user=user,
            lesson=lesson
        )
        return progress

    @staticmethod
    def complete_lesson(user, lesson, score):
        """
        Marks a lesson as completed and awards points if score is high enough.
        """
        with transaction.atomic():
            progress, created = LessonProgress.objects.select_for_update().get_or_create(
                user=user,
                lesson=lesson
            )
            
            if progress.completed:
                return progress # Already completed
            
            progress.completed = True
            progress.score = score
            progress.completed_at = timezone.now()
            progress.save()
            
            # Award points if score >= 70%
            if score >= 70:
                PointService.award_points(
                    user=user,
                    points=lesson.xp_reward,
                    reason=f"Lesson Completed: {lesson.title}",
                    lesson=lesson
                )
            
            return progress
