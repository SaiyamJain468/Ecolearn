# EcoLearn — PS2 Hackathon TODO
> Environmental Education Platform · Flutter + Django + React · 24hr Hackathon

---

## RULES FOR WORKING ON THIS PROJECT

- Read this entire file before starting anything
- Do ONE task at a time. Finish it completely. Test it. Then commit. Then move to next.
- Every single task gets its own Git commit the moment it is done
- Commit message format is given for every task — use it EXACTLY
- Never batch multiple tasks into one commit
- Never skip testing a task before committing
- If something breaks, fix it before moving forward — do not leave broken code and move on
- Ask for clarification if a task is unclear before attempting it

---

## GIT SETUP — DO THIS ABSOLUTELY FIRST BEFORE ANYTHING ELSE

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/ecolearn.git
git checkout -b main
```

Create a `.gitignore` file with this content:

```
# Python
__pycache__/
*.pyc
*.pyo
venv/
.env
*.sqlite3
media/

# Node
node_modules/
dist/
.env.local
.env.production

# Flutter
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
build/
*.iml
*.lock

# General
.DS_Store
*.log
.idea/
.vscode/
```

Then run:
```bash
git add .gitignore
git commit -m "chore: init repo with gitignore"
git push -u origin main
```

---

## PROJECT FOLDER STRUCTURE — CREATE THIS BEFORE ANY CODE

```
ecolearn/
├── apps/
│   ├── backend/          ← Django REST API (Person A)
│   ├── mobile/           ← Flutter app (Person B)
│   └── web-admin/        ← React dashboard (Person C)
├── .gitignore
├── docker-compose.yml
└── README.md
```

```bash
mkdir -p apps/backend apps/mobile apps/web-admin
```

Commit after creating:
```bash
git add .
git commit -m "chore: scaffold monorepo folder structure"
git push
```

---

## SECTION 1 — DOCKER & ENVIRONMENT SETUP

### Task 1.1 — Create docker-compose.yml

Create `docker-compose.yml` in root:

```yaml
version: '3.9'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: ecolearn
      POSTGRES_USER: ecolearn
      POSTGRES_PASSWORD: ecolearn123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

Run it: `docker-compose up -d`
Confirm both containers are running: `docker-compose ps`

```bash
git add docker-compose.yml
git commit -m "chore: add docker-compose with postgres and redis"
git push
```

---

### Task 1.2 — Create .env.example

Create `apps/backend/.env.example`:

```
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=ecolearn
DB_USER=ecolearn
DB_PASSWORD=ecolearn123
DB_HOST=localhost
DB_PORT=5432
REDIS_URL=redis://localhost:6379/0
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET_NAME=ecolearn-proofs
AWS_S3_REGION=ap-south-1
FIREBASE_CREDENTIALS_PATH=config/serviceAccountKey.json
```

Copy it: `cp apps/backend/.env.example apps/backend/.env`
Fill in real values in `.env` (never commit the real `.env`)

```bash
git add apps/backend/.env.example
git commit -m "chore: add backend env example with all required variables"
git push
```

---

## SECTION 2 — DJANGO BACKEND SETUP

### Task 2.1 — Initialize Django Project

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary redis django-redis channels daphne boto3 firebase-admin Pillow python-dotenv
pip freeze > requirements.txt
django-admin startproject config .
```

Confirm it works: `python manage.py runserver` → see Django welcome page at localhost:8000

```bash
git add apps/backend/
git commit -m "feat(backend): initialize django project with all dependencies"
git push
```

---

### Task 2.2 — Create All Django Apps

```bash
cd apps/backend
python manage.py startapp users
python manage.py startapp challenges
python manage.py startapp lessons
python manage.py startapp badges
python manage.py startapp leaderboard
python manage.py startapp notifications
```

```bash
git add apps/backend/
git commit -m "feat(backend): create users, challenges, lessons, badges, leaderboard, notifications apps"
git push
```

---

### Task 2.3 — Configure settings/base.py

Edit `apps/backend/config/settings.py` and add:

- Add all 6 apps + `rest_framework` + `corsheaders` + `channels` to `INSTALLED_APPS`
- Set `AUTH_USER_MODEL = 'users.CustomUser'` ← DO THIS BEFORE FIRST MIGRATE OR YOU WILL BREAK EVERYTHING
- Configure `DATABASES` using env variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)
- Configure `CHANNEL_LAYERS` using Redis
- Configure `SIMPLE_JWT` with ACCESS_TOKEN_LIFETIME = 24 hours, REFRESH_TOKEN_LIFETIME = 7 days
- Configure `CORS_ALLOW_ALL_ORIGINS = True` (for hackathon — restrict in production)
- Configure `REST_FRAMEWORK` default auth to JWTAuthentication

Confirm: `python manage.py check` → no errors

```bash
git add apps/backend/config/
git commit -m "feat(backend): configure installed apps, database, jwt, cors, channels"
git push
```

---

## SECTION 3 — DATABASE MODELS

### Task 3.1 — Users Models

In `apps/backend/users/models.py` create:

**CustomUser** (extends AbstractUser):
- `school` → ForeignKey to School (nullable on=SET_NULL)
- `class_grade` → CharField max_length=10 (e.g. "X-B")
- `role` → CharField choices: student / teacher / admin, default student
- `avatar_url` → URLField blank=True
- `eco_points_total` → IntegerField default=0
- `fcm_token` → CharField max_length=255 blank=True (for push notifications)

**School**:
- `name` → CharField max_length=200
- `city` → CharField max_length=100
- `state` → CharField max_length=100
- `district` → CharField max_length=100
- `eco_points_total` → IntegerField default=0
- `created_at` → DateTimeField auto_now_add=True

Register both in `users/admin.py`

Run:
```bash
python manage.py makemigrations users
python manage.py migrate
```

Confirm tables exist in DB.

```bash
git add apps/backend/users/
git commit -m "feat(backend): add CustomUser and School models with roles and eco points"
git push
```

---

### Task 3.2 — Challenge Models

In `apps/backend/challenges/models.py` create:

**Challenge**:
- `title` → CharField max_length=200
- `description` → TextField
- `category` → CharField choices: plant / waste / water / energy / awareness
- `points_reward` → IntegerField
- `proof_required` → BooleanField default=False
- `difficulty` → IntegerField choices: 1 / 2 / 3
- `is_active` → BooleanField default=True
- `created_at` → DateTimeField auto_now_add=True

**ChallengeSubmission**:
- `user` → ForeignKey CustomUser on_delete=CASCADE
- `challenge` → ForeignKey Challenge on_delete=CASCADE
- `status` → CharField choices: pending / approved / rejected, default=pending
- `proof_image_url` → URLField blank=True null=True
- `submitted_at` → DateTimeField auto_now_add=True
- `reviewed_by` → ForeignKey CustomUser null=True blank=True related_name='reviewed_submissions'
- `reviewed_at` → DateTimeField null=True blank=True
- `rejection_reason` → TextField blank=True

Register both in `challenges/admin.py`

```bash
python manage.py makemigrations challenges
python manage.py migrate
```

```bash
git add apps/backend/challenges/
git commit -m "feat(backend): add Challenge and ChallengeSubmission models with proof flow"
git push
```

---

### Task 3.3 — Lesson Models

In `apps/backend/lessons/models.py` create:

**Lesson**:
- `title` → CharField max_length=200
- `category` → CharField choices: ecology / water / climate / waste / energy / agriculture
- `difficulty` → IntegerField choices: 1 / 2 / 3
- `xp_reward` → IntegerField
- `content_json` → JSONField (list of content blocks: {type: 'text'/'heading'/'fact', content: '...'})
- `order` → IntegerField default=0

**QuizQuestion**:
- `lesson` → ForeignKey Lesson on_delete=CASCADE related_name='questions'
- `question` → TextField
- `options` → JSONField (list of 4 strings)
- `correct_index` → IntegerField (0-3)
- `explanation` → TextField

**LessonProgress**:
- `user` → ForeignKey CustomUser on_delete=CASCADE
- `lesson` → ForeignKey Lesson on_delete=CASCADE
- `completed` → BooleanField default=False
- `score` → IntegerField default=0
- `completed_at` → DateTimeField null=True blank=True
- Meta: `unique_together = [['user', 'lesson']]`

```bash
python manage.py makemigrations lessons
python manage.py migrate
```

```bash
git add apps/backend/lessons/
git commit -m "feat(backend): add Lesson, QuizQuestion, LessonProgress models"
git push
```

---

### Task 3.4 — Badge Models

In `apps/backend/badges/models.py` create:

**Badge**:
- `name` → CharField max_length=100
- `description` → TextField
- `icon_url` → URLField blank=True
- `icon_emoji` → CharField max_length=10 (e.g. "🌱") — use this for hackathon instead of image
- `required_points` → IntegerField
- `category` → CharField choices same as Challenge
- `is_active` → BooleanField default=True

**UserBadge**:
- `user` → ForeignKey CustomUser on_delete=CASCADE
- `badge` → ForeignKey Badge on_delete=CASCADE
- `earned_at` → DateTimeField auto_now_add=True
- Meta: `unique_together = [['user', 'badge']]`

```bash
python manage.py makemigrations badges
python manage.py migrate
```

```bash
git add apps/backend/badges/
git commit -m "feat(backend): add Badge and UserBadge models with emoji support"
git push
```

---

### Task 3.5 — EcoPoints + Notification Models

In `apps/backend/challenges/models.py` ADD (same file):

**EcoPoints**:
- `user` → ForeignKey CustomUser on_delete=CASCADE related_name='eco_points'
- `points` → IntegerField
- `reason` → CharField max_length=200
- `challenge` → ForeignKey Challenge null=True blank=True on_delete=SET_NULL
- `lesson` → ForeignKey Lesson null=True blank=True on_delete=SET_NULL (import from lessons)
- `awarded_at` → DateTimeField auto_now_add=True
- Meta: `indexes = [models.Index(fields=['user'])]`

In `apps/backend/notifications/models.py` create:

**Notification**:
- `user` → ForeignKey CustomUser on_delete=CASCADE
- `title` → CharField max_length=200
- `body` → TextField
- `read` → BooleanField default=False
- `created_at` → DateTimeField auto_now_add=True

```bash
python manage.py makemigrations
python manage.py migrate
```

Open DB with any DB viewer and confirm ALL tables exist. There should be 10+ tables.

```bash
git add apps/backend/
git commit -m "feat(backend): add EcoPoints and Notification models, complete database schema"
git push
```

---

### Task 3.6 — Create Superuser + Register All Admin

```bash
python manage.py createsuperuser
# email: admin@ecolearn.com
# password: admin123
```

Make sure ALL models are registered in their respective `admin.py` files.

Visit `localhost:8000/admin` — confirm all tables are visible and browsable.

```bash
git add apps/backend/
git commit -m "feat(backend): register all models in django admin"
git push
```

---

### Task 3.7 — Seed Data Command

Create `apps/backend/challenges/management/commands/seed_data.py`

This command must create:
- 2 Schools: "DPS Bhopal" and "Kendriya Vidyalaya Sector 4 Bhopal"
- 1 Teacher user per school (role=teacher)
- 10 Student users spread across both schools (role=student)
- 8 Challenges: mix of categories, difficulties, proof_required True and False
- 6 Lessons each with 4 QuizQuestions
- 15 Badges with emoji icons and different point thresholds (50, 100, 200, 300, 500, 750, 1000...)

Run it: `python manage.py seed_data`
Confirm data appears in Django admin.

```bash
git add apps/backend/
git commit -m "feat(backend): add seed_data management command with schools, users, challenges, lessons, badges"
git push
```

---

## SECTION 4 — BACKEND SERVICES (BUSINESS LOGIC)

### Task 4.1 — EcoPoints Engine Service

Create `apps/backend/challenges/services.py` with class `EcoPointsEngine`:

```python
from django.db.models import F, Sum
from django.core.cache import cache

class EcoPointsEngine:
    @staticmethod
    def award(user, points, reason, challenge=None, lesson=None):
        # Step 1: Record transaction in EcoPoints table
        EcoPoints.objects.create(
            user=user, points=points, reason=reason,
            challenge=challenge, lesson=lesson
        )
        # Step 2: Increment user cached total (use F() to avoid race conditions)
        user.__class__.objects.filter(id=user.id).update(
            eco_points_total=F('eco_points_total') + points
        )
        # Step 3: Increment school total
        user.school.__class__.objects.filter(id=user.school_id).update(
            eco_points_total=F('eco_points_total') + points
        )
        # Step 4: Check if user has unlocked any new badges
        BadgeService.check_and_award(user)
        # Step 5: Invalidate leaderboard Redis cache
        cache.delete('lb_schools_all')
        cache.delete(f'lb_students_{user.school_id}')
        # Step 6: Send push notification
        NotificationService.push(user, f'+{points} Eco Points!', reason)
```

Write `BadgeService` class in `apps/backend/badges/services.py`:
- `check_and_award(user)` → get user's current total → query all active badges where required_points <= total → filter out ones user already has (UserBadge) → create UserBadge for each new one → for each new badge send push notification

```bash
git add apps/backend/
git commit -m "feat(backend): implement EcoPointsEngine and BadgeService core business logic"
git push
```

---

### Task 4.2 — Notification Service

Create `apps/backend/notifications/services.py` with class `NotificationService`:
- `push(user, title, body)` → create Notification record in DB → if user.fcm_token is not empty → initialize firebase_admin → call firebase_admin.messaging.send() with Message(notification=Notification(title, body), token=user.fcm_token)
- Wrap Firebase call in try/except — if it fails, log the error but do NOT raise exception (never let a failed push notification break the main flow)

```bash
git add apps/backend/notifications/
git commit -m "feat(backend): add NotificationService with FCM push and DB notification logging"
git push
```

---

## SECTION 5 — BACKEND APIs

### Task 5.1 — Auth APIs

Create `apps/backend/users/serializers.py`:
- `RegisterSerializer` → validates name, email, password, school_id, class_grade, role
- `UserProfileSerializer` → returns id, name, email, school name, class_grade, role, eco_points_total, avatar_url

Create `apps/backend/users/views.py`:
- `RegisterView` → POST → create user → return tokens + profile
- `LoginView` → POST email+password → return access token + refresh token + profile
- `MyProfileView` → GET → return current user profile (requires auth)
- `UpdateFCMTokenView` → POST → save fcm_token to user profile

Create `apps/backend/users/urls.py` and wire into `config/urls.py`

Test in Postman:
- Register a student → get 201 with tokens
- Login with same credentials → get 200 with tokens
- Use access token in Authorization: Bearer header → hit /api/users/me/ → get profile

```bash
git add apps/backend/users/
git commit -m "feat(backend): add register, login, profile, fcm-token auth endpoints"
git push
```

---

### Task 5.2 — Challenge APIs

Create `apps/backend/challenges/serializers.py`:
- `ChallengeSerializer` → all fields + `user_submitted` boolean (annotated)
- `SubmissionSerializer` → full submission with user name and challenge title

Create `apps/backend/challenges/views.py`:
- `ChallengeListView` → GET /api/challenges/ → list active, supports ?category= filter
- `ChallengeDetailView` → GET /api/challenges/{id}/
- `SubmitChallengeView` → POST /api/challenges/{id}/submit/ → create submission → if proof_required=False auto-approve and call EcoPointsEngine.award() → return { submission, points_awarded, new_badges }
- `MySubmissionsView` → GET /api/challenges/my-submissions/
- `PendingSubmissionsView` → GET /api/challenges/pending/ → teacher only
- `ReviewSubmissionView` → PATCH /api/challenges/submissions/{id}/ → teacher only → on approved call EcoPointsEngine.award()

Test every endpoint with student token AND teacher token.

```bash
git add apps/backend/challenges/
git commit -m "feat(backend): add challenge list, detail, submit, review, pending submission endpoints"
git push
```

---

### Task 5.3 — Lesson APIs

Create `apps/backend/lessons/views.py`:
- `LessonListView` → GET /api/lessons/ → list with ?category= filter → annotates each with completed status for current user
- `LessonDetailView` → GET /api/lessons/{id}/ → full content + quiz questions
- `CompleteLessonView` → POST /api/lessons/{id}/complete/ → body: { answers: [0,2,1,3] } → grade quiz → create/update LessonProgress → call EcoPointsEngine.award(lesson.xp_reward) → return { score, correct, total, xp_awarded, new_badges }

```bash
git add apps/backend/lessons/
git commit -m "feat(backend): add lesson list, detail, and complete with quiz grading endpoints"
git push
```

---

### Task 5.4 — Leaderboard APIs with Redis Cache

Create `apps/backend/leaderboard/views.py`:
- `SchoolLeaderboardView` → GET /api/leaderboard/schools/ → check Redis cache 'lb_schools_all' → if miss: aggregate School objects by eco_points_total top 20 → cache for 60 seconds → return
- `StudentLeaderboardView` → GET /api/leaderboard/students/?school_id=X → cache per school → return top 20 students
- `MyRankView` → GET /api/leaderboard/my-rank/ → return { school_rank: N, global_rank: N, total_points: N }

```bash
git add apps/backend/leaderboard/
git commit -m "feat(backend): add school and student leaderboard with redis caching and rank endpoint"
git push
```

---

### Task 5.5 — AWS S3 Presigned URL

Create `apps/backend/users/views.py` ADD:
- `PresignedUploadView` → POST /api/upload/presigned-url/ → body: { filename, content_type } → use boto3 to generate presigned PUT URL for S3 → return { upload_url, file_url }

Flutter will:
1. Call this endpoint to get presigned URL
2. PUT the image directly to S3 (not through Django)
3. Use the returned file_url as proof_image_url in challenge submission

Test: call endpoint → use returned upload_url in Postman PUT with image → confirm image appears in S3 bucket.

```bash
git add apps/backend/users/
git commit -m "feat(backend): add s3 presigned url endpoint for direct client-side image upload"
git push
```

---

### Task 5.6 — Badge + Notification APIs

- `GET /api/badges/` → all badges with `earned: true/false` for current user
- `GET /api/notifications/` → current user's notifications, newest first
- `PATCH /api/notifications/{id}/read/` → mark as read

```bash
git add apps/backend/badges/ apps/backend/notifications/
git commit -m "feat(backend): add badges list with earned status and notifications endpoints"
git push
```

---

### Task 5.7 — WebSocket Live Leaderboard

Install channels and configure `asgi.py` to route websocket connections.

Create `apps/backend/leaderboard/consumers.py`:

```python
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LeaderboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("leaderboard", self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard("leaderboard", self.channel_name)

    async def leaderboard_update(self, event):
        await self.send(text_data=json.dumps(event['data']))
```

In `EcoPointsEngine.award()` after cache bust, add:
```python
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
channel_layer = get_channel_layer()
async_to_sync(channel_layer.group_send)("leaderboard", {
    "type": "leaderboard.update",
    "data": { "event": "points_updated", "school_id": user.school_id }
})
```

Test: connect to ws://localhost:8000/ws/leaderboard/ in a WebSocket testing tool. Award points via API. Confirm message arrives on WS connection.

```bash
git add apps/backend/
git commit -m "feat(backend): add websocket leaderboard consumer and real-time broadcast on points award"
git push
```

---

## SECTION 6 — FLUTTER MOBILE APP

### Task 6.1 — Initialize Flutter Project

```bash
cd apps/mobile
flutter create . --org com.ecolearn --project-name ecolearn
```

Add to `pubspec.yaml` dependencies:
```yaml
dio: ^5.4.0
flutter_riverpod: ^2.5.1
riverpod_annotation: ^2.3.5
go_router: ^13.2.0
flutter_animate: ^4.5.0
hive_flutter: ^1.1.0
cached_network_image: ^3.3.1
image_picker: ^1.0.7
firebase_core: ^2.27.0
firebase_messaging: ^14.7.20
shared_preferences: ^2.2.3
web_socket_channel: ^2.4.0
```

```bash
flutter pub get
flutter run
```

Confirm default app runs on device/emulator.

```bash
git add apps/mobile/
git commit -m "feat(mobile): initialize flutter project with all dependencies"
git push
```

---

### Task 6.2 — Core Setup (Theme + API Client + Models)

Create folder structure inside `lib/`:
```
lib/
├── core/
│   ├── api/api_client.dart      ← Dio instance + JWT interceptor
│   ├── auth/auth_storage.dart   ← SharedPreferences JWT read/write
│   └── theme/app_theme.dart     ← Colors, text styles
├── features/
│   ├── auth/
│   ├── home/
│   ├── challenges/
│   ├── lessons/
│   ├── leaderboard/
│   ├── badges/
│   └── profile/
└── shared/
    ├── models/                  ← Dart data classes
    └── widgets/                 ← Reusable widgets
```

**api_client.dart**: Dio with baseUrl `http://10.0.2.2:8000/api` (Android emulator) or `http://localhost:8000/api` (iOS). Interceptor reads JWT from SharedPreferences and adds `Authorization: Bearer TOKEN` to every request. On 401: clear token and redirect to login.

**app_theme.dart**: Define colors: cream=#FDF6EE, coral=#E8573A, peach=#F4A07A, dark=#1A0F0A. Text styles using Bebas Neue for display (use google_fonts package), DM Mono for body.

**Dart models** (fromJson/toJson for each):
- `UserProfile`, `School`, `Challenge`, `ChallengeSubmission`, `Lesson`, `QuizQuestion`, `Badge`, `UserBadge`, `LeaderboardItem`, `EcoPointsTransaction`, `AppNotification`

```bash
git add apps/mobile/lib/
git commit -m "feat(mobile): add api client with jwt interceptor, theme, and all dart models"
git push
```

---

### Task 6.3 — Auth Screens (Login + Register + Splash)

**SplashScreen**: On app start check SharedPreferences for JWT. If exists → HomeScreen. If not → LoginScreen.

**LoginScreen**: Email + password text fields. Login button. On tap: POST /api/auth/login/ → save JWT to SharedPreferences → navigate to HomeScreen. Show error snackbar on failure.

**RegisterScreen**: Name, email, password, school dropdown (fetch from /api/schools/), class_grade text field, role selector. Submit → POST /api/auth/register/ → save JWT → HomeScreen.

Set up `go_router` in `lib/core/routing/app_router.dart` with routes: `/` (splash), `/login`, `/register`, `/home`, `/challenges/:id`, `/lessons/:id`, `/quiz/:id`, `/leaderboard`, `/badges`, `/profile`

```bash
git add apps/mobile/lib/
git commit -m "feat(mobile): add splash, login, register screens with jwt auth flow and go_router"
git push
```

---

### Task 6.4 — Home Dashboard Screen

Fetch GET /api/users/me/ on load.

Display:
- User name + "Good morning/afternoon" greeting
- Eco points total (large animated number)
- Current level name (e.g. "ECO WARRIOR") based on points thresholds
- XP progress bar → `AnimatedContainer` animates width from 0 to correct % over 1.5 seconds on load
- Weekly streak row → 7 boxes Mon-Sun, filled green for completed days, coral for today
- Recent activity feed → last 5 EcoPoints transactions
- Rank orb → circular widget showing rank number with rotating dashed ring

```bash
git add apps/mobile/lib/features/home/
git commit -m "feat(mobile): add home dashboard with xp bar, streak row, activity feed, rank orb"
git push
```

---

### Task 6.5 — Challenges Screen

Fetch GET /api/challenges/ on load.

- Category filter pill row at top: All / Plant / Waste / Water / Energy / Awareness
- Challenge card shows: title, category tag, description, XP badge, difficulty (1-3 filled squares), Complete/Completed button
- Tap card → ChallengeDetailScreen

**ChallengeDetailScreen**:
- Show full challenge info
- If `proof_required = false`: show Complete button → POST submit → animate points → check for badges
- If `proof_required = true`: show "Take Photo" button → open camera via image_picker → upload to S3 presigned URL → POST submit with image URL

**Camera + S3 upload flow** (most complex part):
1. Open camera: `ImagePicker().pickImage(source: ImageSource.camera)`
2. GET presigned URL: `POST /api/upload/presigned-url/` with filename
3. Upload: `Dio().put(presignedUrl, data: imageBytes)` ← PUT directly to S3, not your server
4. Submit: `POST /api/challenges/{id}/submit/` with `proof_image_url`
5. On success: call `animatePointsCounter(newPoints)` + show badge dialog if new badges

```bash
git add apps/mobile/lib/features/challenges/
git commit -m "feat(mobile): add challenges screen with camera proof upload and s3 presigned url flow"
git push
```

---

### Task 6.6 — Lessons + Quiz Screen

**LessonsScreen**: Grid of lesson cards by category. Completed = green checkmark overlay.

**LessonDetailScreen**: Render `content_json` as formatted scrollable text. "Start Quiz" button at bottom.

**QuizScreen**:
- One question at a time
- 4 option buttons
- On tap: disable all buttons, green correct / red wrong, show explanation
- "Next" button
- On finish: POST /api/lessons/{id}/complete/ with answers array → show score screen with XP earned + animated counter

```bash
git add apps/mobile/lib/features/lessons/
git commit -m "feat(mobile): add lessons grid, lesson detail reader, and quiz flow with scoring"
git push
```

---

### Task 6.7 — Leaderboard Screen

- Two tabs: Schools / My School Students
- Fetch from REST APIs on load
- Connect to WebSocket `ws://10.0.2.2:8000/ws/leaderboard/` using `web_socket_channel`
- On WS message: re-fetch leaderboard data and update list

```bash
git add apps/mobile/lib/features/leaderboard/
git commit -m "feat(mobile): add leaderboard screen with school/student tabs and websocket live updates"
git push
```

---

### Task 6.8 — Badges Screen

- 5-column grid
- Earned badges: full color, tappable → shows description tooltip
- Unearned badges: grayscale + 30% opacity
- Show counts: X earned / 20 total

**BadgeUnlockDialog** (this is your biggest wow moment in the demo):
- Full screen overlay with dark background
- Badge icon scales from 0 to 1 with elastic curve: `.animate().scale(duration: 600.ms, curve: Curves.elasticOut)`
- Badge name slides up with fade
- "Amazing!" dismiss button

```bash
git add apps/mobile/lib/features/badges/
git commit -m "feat(mobile): add badges screen and badge unlock dialog with elastic animation"
git push
```

---

### Task 6.9 — Animations & Polish

Do these LAST after all screens work:

- **Animated points counter**: when points increase, `AnimationController` tweens the number from old to new over 1.5s. Display with `AnimatedBuilder`.
- **Screen shake on points earn**: when XP is awarded, briefly translate the points widget ±6px left/right 3 times using a custom shake curve. Add `HapticFeedback.mediumImpact()`.
- **Page transitions**: All routes use `CustomTransitionPage` with `SlideTransition` from right.
- **Challenge card tilt**: on long press, `Transform.rotate(angle: 0.02)` with haptic feedback.

```bash
git add apps/mobile/lib/
git commit -m "feat(mobile): add animated xp counter, screen shake, page transitions, card tilt effects"
git push
```

---

## SECTION 7 — REACT ADMIN DASHBOARD

### Task 7.1 — Initialize React Project

```bash
cd apps/web-admin
npm create vite@latest . -- --template react
npm install axios @tanstack/react-query recharts react-router-dom date-fns
npm run dev
```

Confirm Vite welcome page at localhost:5173. Delete boilerplate.

```bash
git add apps/web-admin/
git commit -m "feat(admin): initialize react vite project with query, recharts, router"
git push
```

---

### Task 7.2 — Auth + Layout

Create `src/api/client.js`: Axios instance with baseURL from env. Interceptor adds JWT from localStorage.

Create `LoginPage`: email + password → POST /api/auth/login/ → save JWT → redirect /dashboard.

Create `ProtectedRoute`: checks JWT in localStorage → if missing → redirect /login.

Create `Sidebar`: links to Dashboard / Students / Submissions / Leaderboard. Show logged-in teacher name at bottom.

```bash
git add apps/web-admin/src/
git commit -m "feat(admin): add auth flow, protected routes, and sidebar navigation layout"
git push
```

---

### Task 7.3 — Overview Dashboard Page

4 metric cards at top row:
- Total Students (GET /api/users/?role=student count)
- Eco Points This Week (sum of EcoPoints awarded in last 7 days)
- Challenges Completed Today (ChallengeSubmissions approved today)
- Pending Approvals (with red badge if > 0 — links to Submissions page)

Recharts BarChart: top 8 students by eco points. Coral fill.

Recharts LineChart: eco points earned per day last 14 days.

```bash
git add apps/web-admin/src/
git commit -m "feat(admin): add overview dashboard with metric cards and recharts bar/line charts"
git push
```

---

### Task 7.4 — Submission Approval Queue

This is the most important page. Polish it well.

Fetch `GET /api/challenges/pending/` with React Query, auto-refresh every 15 seconds.

Each submission card shows:
- Student name + avatar initials circle
- Challenge title + category tag
- Time since submitted (use date-fns `formatDistanceToNow`)
- Proof image (full size, click to open in new tab)
- Approve button (green) + Reject button (red)

Approve: `PATCH /api/challenges/submissions/{id}/` status=approved → card fades out → success toast "+ 150 XP awarded to Aryan"

Reject: show text input for reason → PATCH with status=rejected + reason → card fades out

Connect to WebSocket for real-time: new submissions appear at top of queue without refresh.

```bash
git add apps/web-admin/src/
git commit -m "feat(admin): add submission approval queue with photo review, approve/reject, and websocket"
git push
```

---

### Task 7.5 — Students Table + School Leaderboard

**Students Table**:
- All students in teacher's school
- Columns: Name, Class, Total Points, Challenges Done, Last Active, Rank
- Search by name, sort by any column

**School Leaderboard**:
- Ranked list + Recharts BarChart side by side
- Connect to WebSocket — bar heights animate when rankings change

```bash
git add apps/web-admin/src/
git commit -m "feat(admin): add students table with search/sort and school leaderboard with live bar chart"
git push
```

---

## SECTION 8 — DEPLOYMENT

### Task 8.1 — Dockerize Backend

Create `apps/backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]
```

Create `apps/backend/nginx.conf` for reverse proxy.

Update `docker-compose.yml` to add backend and nginx services.

Test: `docker-compose up --build` → all services start → hit localhost/api/auth/login/ → works.

```bash
git add .
git commit -m "feat(devops): add dockerfile and nginx config, update docker-compose for full stack"
git push
```

---

### Task 8.2 — Deploy Backend

**Option A — Render.com (Faster, recommended for hackathon)**:
1. Go to render.com → New Web Service
2. Connect GitHub repo
3. Root directory: `apps/backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn config.wsgi:application`
6. Add all env variables from .env.example
7. Add PostgreSQL database (Render free tier)
8. Add Redis (Render free tier)
9. Deploy → get live URL like `https://ecolearn-api.onrender.com`

After deploy:
```bash
# SSH into Render console or use their shell
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
```

Test: `https://your-url.onrender.com/api/auth/login/` with Postman → confirm 200.

```bash
git add .
git commit -m "chore: add render deployment config and update cors for production url"
git push
```

---

### Task 8.3 — Deploy React to Vercel

1. Update `apps/web-admin/.env.production`: `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
2. `npm run build` → confirm no errors
3. Go to vercel.com → Import repo → Root: `apps/web-admin` → Deploy
4. Get live URL: `https://ecolearn-admin.vercel.app`
5. Open in browser → login with teacher credentials → confirm it works

```bash
git add apps/web-admin/
git commit -m "feat(admin): configure production api url and verify vercel deployment"
git push
```

---

### Task 8.4 — Point Flutter at Live Backend

Update `apps/mobile/lib/core/api/api_client.dart`:
- Change baseUrl from `http://10.0.2.2:8000/api` to `https://your-backend.onrender.com/api`

Run `flutter run` on real phone.
Test the full demo flow end-to-end on live backend:
- Login → complete challenge → earn points → badge unlocks → leaderboard updates

```bash
git add apps/mobile/lib/core/api/
git commit -m "feat(mobile): switch api base url to production backend"
git push
```

---

## SECTION 9 — DEMO PREP

### Task 9.1 — Demo Data Setup

In Django admin (or via seed_data command), create these specific accounts:
- Student: `aryan@dps.com` / `demo123` → DPS Bhopal, Class X-B, 1240 points, 7-day streak
- Teacher: `teacher@dps.com` / `demo123` → DPS Bhopal

This is the account you use in the live demo. Make sure it has:
- Points: 1,240 (enough to show rank but not #1 so there's room to grow during demo)
- 7-day streak active
- At least 3 badges already earned
- At least 1 challenge submission pending (so approval flow is instant)

```bash
git add apps/backend/
git commit -m "chore: add demo account seed script for hackathon presentation"
git push
```

---

### Task 9.2 — Full Demo Rehearsal Checklist

Do this 3 times before going on stage:

- [ ] Phone logged in as Aryan. Home screen loads with 1240 XP visible.
- [ ] Laptop browser open at admin dashboard, teacher logged in, submission queue visible.
- [ ] Phone screen mirrored to laptop via Vysor or scrcpy.
- [ ] Both phone (left) and laptop (right) visible on projector.

**The 90-second demo sequence** (practice until it's muscle memory):

1. `[0:00]` Say: *"In India, millions of students learn about the environment only from textbooks. EcoLearn changes that."*
2. `[0:10]` Show phone home screen. Say: *"This is Aryan, Class 10, DPS Bhopal — 1,240 eco points, 7-day streak."*
3. `[0:18]` Tap Challenges tab.
4. `[0:22]` Tap "Plant a Sapling."
5. `[0:26]` Tap Complete Challenge → camera opens. Point at any plant. Take photo.
6. `[0:34]` Show "Pending teacher approval" screen.
7. `[0:38]` Switch to LAPTOP. Say: *"The teacher sees it instantly."* Submission card with Aryan's photo is at the top.
8. `[0:44]` Click Approve. Card fades out.
9. `[0:50]` Switch to PHONE. Notification arrives: "+200 Eco Points!" XP counter animates. Badge unlock fires: "Tree Planter!"
10. `[1:00]` Tap Leaderboard. DPS Bhopal moved up on school chart.
11. `[1:08]` Say: *"One student, one action, one tree. Their school noticed. That ripple effect is how EcoLearn builds environmentally aware citizens — and that's exactly what PS2 is asking for."*

---

## SECTION 10 — TRIAGE (IF YOU ARE BEHIND AT HOUR 20)

Cut these in order — least important first:

| Cut This | Saves | Keep? |
|---|---|---|
| Offline Hive caching | 30 min | Cut |
| CSV export in admin | 15 min | Cut |
| Animated rank changes | 20 min | Cut |
| WebSocket leaderboard | 40 min | Cut if needed |
| Push notifications | 30 min | Cut if needed |
| Card tilt animations | 15 min | Cut |

**NEVER CUT:**
- Login and register
- Challenge submit with camera
- Animated XP counter
- Badge unlock dialog animation
- Teacher approval queue
- School leaderboard (static is fine)

---

## COMMIT HISTORY GOAL

By end of hackathon your git log should look like this:

```
feat(mobile): switch api base url to production backend
feat(admin): configure production api url and verify vercel deployment
chore: add render deployment config and update cors for production url
feat(devops): add dockerfile and nginx config, update docker-compose for full stack
feat(admin): add students table with search/sort and school leaderboard with live bar chart
feat(admin): add submission approval queue with photo review, approve/reject, and websocket
feat(admin): add overview dashboard with metric cards and recharts bar/line charts
feat(admin): add auth flow, protected routes, and sidebar navigation layout
feat(admin): initialize react vite project with query, recharts, router
feat(mobile): add animated xp counter, screen shake, page transitions, card tilt effects
feat(mobile): add badges screen and badge unlock dialog with elastic animation
feat(mobile): add leaderboard screen with school/student tabs and websocket live updates
feat(mobile): add lessons grid, lesson detail reader, and quiz flow with scoring
feat(mobile): add challenges screen with camera proof upload and s3 presigned url flow
feat(mobile): add home dashboard with xp bar, streak row, activity feed, rank orb
feat(mobile): add splash, login, register screens with jwt auth flow and go_router
feat(mobile): add api client with jwt interceptor, theme, and all dart models
feat(mobile): initialize flutter project with all dependencies
feat(backend): add websocket leaderboard consumer and real-time broadcast on points award
feat(backend): add badges list with earned status and notifications endpoints
feat(backend): add s3 presigned url endpoint for direct client-side image upload
feat(backend): add school and student leaderboard with redis caching and rank endpoint
feat(backend): add lesson list, detail, and complete with quiz grading endpoints
feat(backend): add challenge list, detail, submit, review, pending submission endpoints
feat(backend): add register, login, profile, fcm-token auth endpoints
feat(backend): implement EcoPointsEngine and BadgeService core business logic
feat(backend): add NotificationService with FCM push and DB notification logging
chore: add demo account seed script for hackathon presentation
feat(backend): add seed_data management command with schools, users, challenges, lessons, badges
feat(backend): register all models in django admin
feat(backend): add EcoPoints and Notification models, complete database schema
feat(backend): add Badge and UserBadge models with emoji support
feat(backend): add Lesson, QuizQuestion, LessonProgress models
feat(backend): add Challenge and ChallengeSubmission models with proof flow
feat(backend): add CustomUser and School models with roles and eco points
feat(backend): initialize django project with all dependencies
feat(backend): create users, challenges, lessons, badges, leaderboard, notifications apps
chore: add backend env example with all required variables
chore: add docker-compose with postgres and redis
chore: scaffold monorepo folder structure
chore: init repo with gitignore
```

That's 40+ meaningful commits. It tells a story. Every commit is small, purposeful, and named correctly.

---

*EcoLearn · PS2 · Built Different.*