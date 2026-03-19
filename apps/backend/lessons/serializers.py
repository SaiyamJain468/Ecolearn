from rest_framework import serializers
from .models import Lesson, QuizQuestion, LessonProgress

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question_text', 'options', 'correct_option_index']

class LessonSerializer(serializers.ModelSerializer):
    quiz_questions = QuizQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'description', 'category', 'content', 
            'difficulty', 'xp_reward', 'order', 'quiz_questions'
        ]

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson_details = LessonSerializer(source='lesson', read_only=True)

    class Meta:
        model = LessonProgress
        fields = [
            'id', 'lesson', 'lesson_details', 'user', 'completed', 
            'score', 'started_at', 'completed_at'
        ]
        read_only_fields = ['user', 'completed', 'score', 'started_at', 'completed_at']
