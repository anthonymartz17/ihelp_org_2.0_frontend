# iHelp

## Overview

iHelp is a community-focused app designed to streamline volunteer management for organizations and make community service engaging for teen volunteers. It connects teens with tasks in their local communities, helping them build leadership skills, gain a sense of responsibility, and earn rewards for their contributions.

The app features two distinct interfaces:

1. **Organization Interface**: Designed for administrative use to manage requests and track task completion.
2. **Volunteer Interface**: Gamifies the volunteering process, allowing teens to browse, commit to tasks, and track progress while earning points and badges.

## Features

### Organization Interface

- **Create and Manage Requests**: Organizations can log requests from the community, assign categories, add detailed descriptions, set due dates, and define point values based on task difficulty.
- **Task Assignment**: Break down requests into multiple tasks, allowing volunteers to commit individually.
- **Real-Time Updates**: Tracks progress and updates task completion status across the app.

#### Example Workflow:
Maria, a community center manager, receives a request for yard work from Mr. Anderson. She creates a request in the app with a description, due date, and point allocation. Tasks like raking leaves are added, and the request is posted to the volunteer side.

### Volunteer Interface

- **Browse and Commit to Tasks**: Teens can view available tasks, see task details, and commit to specific ones.
- **Progress Tracking**: Volunteers follow task stages like "Start," "On My Way," "Arrived," "Began Task," and "Completed."
- **Gamification**: Earn points, badges, and rewards for completing tasks.
- **Navigation**: Volunteers can easily access:
  - Profile: View earned badges, points, and completed hours.
  - Requests: Explore available opportunities.
  - Help: Access guidance for using the app.
  - Leaderboard: See top contributors in the community.
  - Commitments: Track pending and completed tasks.

#### Example Workflow:
Kevin, a teen needing volunteer hours, logs in and browses available requests. He commits to raking leaves for Mr. Anderson. As Kevin completes the task stages, he earns 50 points. Once all tasks in the request are completed, Kevin receives his hours of service.

## Technology Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express, PostgreSQL
- **Real-Time Communication**: Socket.io
- **Authentication & Storage**: Firebase

## Future Features

- **Alert Messaging System**: Automated reminders to keep volunteers on track.
- **AI Assistance**: Guide teens through task completion with step-by-step instructions.
- **Task Preferences**: Allow volunteers to filter and choose tasks based on their interests.

## Installation and Setup

### Requirements

- Node.js
- PostgreSQL
- Firebase account for authentication

### Setup Steps

1. Clone the repository:
   
   git clone https://github.com/your-repo/iHelp.git
   

2. Install dependencies:
   
   npm install
   

3. Configure environment variables:
   - Add Firebase credentials to `firebase-credential.json` in the root directory.
   - Set up `.env` for PostgreSQL and Socket.io configurations.

4. Start the development server:
   
   npm run dev
   

## Contributors

| Name               | Role                                        |
|--------------------|---------------------------------------------|
| Antonio Martinez   | Lead UI/UX Developer, Database Designer     |
| Kurt Julien        | Backend Developer, System Integrator        |
| Shanel             | Full-Stack Developer, Feature Implementation|
| Marcus             | Frontend Developer, Debugging Specialist    |
| Abdel              | Database Engineer, Debugging Expert         |

## Closing Statement

iHelp transforms volunteering from a chore into an engaging experience, bridging the gap between organizations and their communities. Together, we're building stronger, more connected communities, one task at a time.
