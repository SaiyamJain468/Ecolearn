from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seeds specific accounts for the hackathon demo'

    def handle(self, *args, **options):
        # Move imports inside to avoid early execution errors
        from users.models import School
        from challenges.models import Challenge, ChallengeSubmission
        from badges.models import Badge, UserBadge
        
        User = get_user_model()
        
        self.stdout.write("Seeding demo accounts...")

        # 1. Ensure DPS Bhopal exists
        school, _ = School.objects.get_or_create(
            name="DPS Bhopal",
            defaults={
                "city": "Bhopal", 
                "state": "Madhya Pradesh",
                "district": "Bhopal",
                "eco_points_total": 42000
            }
        )

        # 2. Create Student: Aryan
        student, created = User.objects.get_or_create(
            email="aryan@dps.com",
            defaults={
                "username": "aryan",
                "first_name": "Aryan",
                "last_name": "Jain",
                "role": "student",
                "school": school,
                "class_grade": "X-B",
                "eco_points_total": 1240,
                "streak_days": 7,
                "level": "ECO WARRIOR"
            }
        )
        student.set_password("demo123")
        student.save()
        
        if created:
            self.stdout.write(f"Created student: {student.email}")

        # 3. Create Teacher: Teacher
        teacher, created = User.objects.get_or_create(
            email="teacher@dps.com",
            defaults={
                "username": "teacher",
                "first_name": "Teacher",
                "last_name": "Account",
                "role": "teacher",
                "school": school
            }
        )
        teacher.set_password("demo123")
        teacher.save()
        
        if created:
            self.stdout.write(f"Created teacher: {teacher.email}")

        # 4. Ensure at least one pending submission for the demo
        challenge = Challenge.objects.first()
        if challenge and not ChallengeSubmission.objects.filter(user=student, status='pending').exists():
            ChallengeSubmission.objects.create(
                user=student,
                challenge=challenge,
                proof_image_url="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
                status='pending'
            )
            self.stdout.write("Created pending submission for Aryan")

        # 5. Award some badges to Aryan
        badges = Badge.objects.all()[:3]
        for badge in badges:
            UserBadge.objects.get_or_create(user=student, badge=badge)

        self.stdout.write(self.style.SUCCESS("Demo seeding complete!"))
