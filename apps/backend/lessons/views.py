from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Lesson, LessonProgress
from .serializers import LessonSerializer, LessonProgressSerializer
from .services import LessonService

class LessonListView(generics.ListAPIView):
    queryset = Lesson.objects.all().order_by('order')
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

class LessonCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            lesson = Lesson.objects.get(pk=pk)
            score = request.data.get('score')
            
            if score is None:
                return Response({"error": "Score is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            progress = LessonService.complete_lesson(
                user=request.user,
                lesson=lesson,
                score=score
            )
            
            return Response(LessonProgressSerializer(progress).data)
        except Lesson.DoesNotExist:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)
