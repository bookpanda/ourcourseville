# ourcourseville
Platform for students to publish and access assignments' solutions in order to enhance their learning experience and collaboration.

## Frontend
### Stack
- react
- redux
- tailwindcss

### Prerequisites
- bun v1.1
- node v20

### Setting up
1. Copy `.env.template` and paste it in the same directory as `.env.local` and fill in the values.
```bash
NEXT_PUBLIC_RECENT_COURSES_TTL=31536000000 # 1 year
API_URL=http://localhost:5203 # backend url
API_KEY=apikey # backend api key
EXTENSION_URL= # extension download url in homepage
```
2. Install dependencies and run
```bash
bun install
bun dev
```

## Backend
### Stack
- ASP.NET Core 8
- Firestore
- Redis

### Prerequisites
- .NET 8

### Setting up
1. Copy `.env.template` and paste it in the same directory as `.env` and fill in the values.
```bash
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS="http://localhost:5203"

Web__Url=http://localhost:3000 # frontend url
API__Key=apikey # api key
ConnectionStrings__Redis="localhost:6379,password=5678"
TTL__Faculty=86400000 # 1 day
TTL__Course=3600000 # 1 hour

Firestore__DB=ourcourseville
# Firestore collections
Firestore__Faculties=faculties_dev
Firestore__Courses=courses_dev
Firestore__Assignments=assignments_dev
Firestore__Records=records_dev

GOOGLE_APPLICATION_CREDENTIALS=firebase-adminsdk.json # path to firebase admin sdk
```
2. Install dependencies
```bash
dotnet restore
```
3. Create a service account in Firebase and download the json file. Set the path to the json file in the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
4. Run the backend
```bash
dotnet run watch
```

## Extension
### Stack
- react
- tailwindcss

### Prerequisites
- bun v1.1
- node v20

### Setting up
```bash
bun install

# this will run nodemon and watch for changes (generates the build in the `dist` folder, you can load the extension in chrome by going to `chrome://extensions/` and enabling developer mode)
bun dev
```

## Credits
- [Chrome Extension Boilerplate](https://github.com/JohnBra/vite-web-extension)
- [MCV Quiz AI Solver](https://github.com/leomotors/mcv-quiz-ai-solver)

## Contributing
Feel free to open PRs or raise issues!