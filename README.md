# Radar Task Manager [BACKEND]

## Requrements
- Docker: Version >= 26.1.1
- Git: Version >= 2.45.1

## Description

**Backend** repository for Task Manager App built in [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Dev setup

```bash
# Clone repository
$ git clone https://github.com/alfonso68/tasker-be.git

# Change directory
$ cd tasker-be

# Copy env file
$ cp env .env
```

## Firebase setup .env

```yaml
# Replace #[PLACEHOLDERS]# in .env file

FIREBASE_DATABASE_URL=#[FIREBASE_DATABASE_URL]#
FIREBASE_CONFIG_FILE=#[FIREBASE_CONFIG_FILE]#
```

## Firebase Config download

1. Go to **Firebase Console**
1. Select Firebase project
1. On the left panel, click on **Project Settings** (gear icon)
1. Click on **Service Accounts**
1. Click on **Generate new private key** button
1. Download file with the following **name** & **location**:
``
tasker-be/src/firebase-config.json
``

## Build & Run

```bash
# Change to project root dir
$ cd tasker-be

# Install libs & Build
$ npm install
$ npm run build

# Run on Docker
$ docker-compose up --build

# Wait for message:
LOG [NestApplication] Nest application successfully started
```


## Access GraphQL Playground & API Docs

- Go to http://localhost:3000/graphql
- For API Docs click on **Schema**/**Docs** on right panel


## API Queries for playground
```gql
# Get all tasks:
query {
  getTasks{
    id,
    title,
    description,
    isCompleted,
    dueDate
  }
}

# Create task:
mutation {
  createTask (input: {
    title:"CR current projects",
    description:"Code review open Pull Requests, approve or decline accordingly",
    dueDate:"2024-06-30"
  }) {
    id,
    title,
    description,
    dueDate,
    isCompleted
  }
}

# Update task (Set completed)
mutation {
  updateTask (input: {
    id:"-O0fMIMxgVxbkOOINUnT",
    title: "CR current projects COMPLETED",
    isCompleted: true
  }) {
    id,
    title,
    description,
    dueDate,
    isCompleted
  }
}

# Delete task
mutation {
  deleteTask (
    id:"-O0fMIMxgVxbkOOINUnT"
  )
}
```

## Stop & Shutdown containers
```bash
$ docker-compose down -v 
```