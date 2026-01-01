# Cosmos Core Assessment Frontend

## Introduction

This project is a lightweight SaaS Platform is designed to streamline task assignments and tracking for remote teams. It provides a centralized system where team admins can manage projects and tasks, while team members can claim and update tasks **status** to completed in real time. The platform ensures accountability, visibility, and efficiency across distributed teams by integrating automated features and audit logging.

## Features

- **Authentication**: User authentication and authorization
- **Admin Project & Task Management**: Create, update, and delete projects and tasks.
- **Task Assignment & Automation**: Users can claim open tasks, and tasks are automatically expired or reassigned when needed.
- **Role-Based Access Control**: (ADMIN | USER) have access permissions tailored to their responsibilities.
- **Resilient & Reliable**: Handles access token and refresh token expiration securely and gracefully
- **Error Handling & Resilience**: Handles token expiration and ensure app stability
- **Polling for Real-Time Updates**: Atomic updates with conditions for expiring and re-assigning task

## Table of Contents

- [Setup](#setup)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Architechture And Design Decisions](#architecture-and-design-decisions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Images](#images)

## Setup

Follow these instructions to set up the project on your local machine.

## Tech Stack

**Frontend**: React, Redux Toolkit, Tailwind CSS, Axios

**Authentication**: JWT (access token & refresh token)

**API Requests**: Axios with interceptors for token refresh and error handling

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/peterihimire/cosmos-core-ftend.git
   ```

2. Change directory into the project folder:

   ```sh
   cd cosmos-core-ftend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Set up the environment variables (See Environment Variables):

   Create a `.env` file in the root directory and copy contents of `.env.example` to your created `.env` file.

   ```sh
   cp .env.example .env
   ```

## Environment Variables

The project requires several environment variables to be configured. Here’s a brief overview of each:

- `VITE_BASE_API_URL`=https://your-backend-server.com/api
- `VITE_NODE_ENV`=development

Ensure these variables are set in your `.env` file as specified in the [Installation](#installation) section.

## Running the Server

1. Start the server:

   ```sh
   npm run dev
   # or
   yarn run dev
   ```

## API Documentation

Visit the Postman documentation [Link](https://documenter.getpostman.com/view/12340633/2sBXVcjsQz) of this mini task management SaaS app.

## Architechture And Design Decisions

**React + Redux Toolkit**:

- Redux Toolkit is used for state management to handle tasks, user sessions, and UI updates.
- Async thunks (createAsyncThunk) manage API calls for CRUD operations on tasks.

**Token-based Authentication with Refresh**:

- Access tokens expire quickly (e.g., 2 hours)
- Refresh tokens stored as HTTP-only cookies (e.g., 5 days)
- Automatic token refresh handled in frontend Axios interceptors.

**Error Isolation**:

- Each slice (tasks, auth) handles its own errors to avoid global app failure.
- Axios interceptors retry requests when tokens expire, ensuring seamless user experience.

**Real-Time Updates**:

- Polling every 5 minutes keeps the task list up-to-date.
- Chosen over WebSockets for simplicity and to reduce backend complexity.

**Role-Based UI Controls:**:

- ADMIN role can see create, edit, delete tasks on the UI, but not functional
- USER role can claim and complete tasks only

**TypeScript**:

- Used typescript for type safety and bug prevention
- Helps in self documenting
- Helps for scalability and team collaboration

**Protected Routes For Authenticated Users**:

- Only authenticated users can view task

## Future Improvements

- Replace polling with WebSockets for real-time updates.
- Add email notifications for task assignments & expirations
- Implement more granular roles & permissions
- Add unit and integration tests

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please reach out to:

- Email: peterihimire@gmail.com
- Github Issues: [Create an issue](https://github.com/peterihimire/cosmos-core-bkend/issues)

## Images

![register](https://res.cloudinary.com/dymhdpka1/image/upload/v1767305703/Screenshot_2026-01-01_at_11.13.15_PM_q39gra.png)
![login](https://res.cloudinary.com/dymhdpka1/image/upload/v1767305703/Screenshot_2026-01-01_at_11.13.38_PM_v5evqm.png)
![admin](https://res.cloudinary.com/dymhdpka1/image/upload/v1767294223/Screenshot_2026-01-01_at_7.55.41_PM_jzxp9f.png)
![user](https://res.cloudinary.com/dymhdpka1/image/upload/v1767294739/Screenshot_2026-01-01_at_8.11.51_PM_knukmt.png)
