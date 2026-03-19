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