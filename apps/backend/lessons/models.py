from django.db import models
from django.conf import settings

class Lesson(models.Model):
    CATEGORY_CHOICES = (
        ('ecology', 'Ecology'),
        ('water', 'Water'),
        ('climate', 'Climate'),
        ('waste', 'Waste'),
        ('energy', 'Energy'),
        ('agriculture', 'Agriculture'),
    )
    DIFFICULTY_CHOICES = (
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced'),
    )
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES)
    xp_reward = models.IntegerField()
    content_json = models.JSONField()
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', 'id']

class QuizQuestion(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    options = models.JSONField()  # List of 4 strings
    correct_index = models.IntegerField()  # 0-3
    explanation = models.TextField()

    def __str__(self):
        return f"Q for {self.lesson.title}"

class LessonProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = [['user', 'lesson']]

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title}"
