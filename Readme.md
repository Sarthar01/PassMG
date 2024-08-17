# PassMG - Password Manager

PassMG is a simple and intuitive password manager built with a React frontend and an Express backend. It uses MongoDB to store and manage your passwords securely.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)
- [Contact](#contact)

## Features

- **Add, View, Edit, and Delete Passwords**: Manage your credentials with ease.
- **Password Visibility Toggle**: Securely show or hide passwords in the manager.
- **Copy to Clipboard**: Easily copy site URLs, usernames, and passwords.
- **Responsive UI**: User-friendly interface optimized for different screen sizes.

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Other Tools**: Framer Motion, React Toastify

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Sarthar01/PassMG.git
    ```
2. Navigate to the project directory:
    ```sh
    cd PassMG
    ```
3. Install the dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

## Usage

1. Set up environment variables for the backend:
    - Create a `.env` file in the `backend` directory and add your MongoDB connection URL:
      ```env
      MONGODB_URL=your_mongodb_connection_url
      ```
2. Start the backend server:
    ```sh
    cd backend
    npm start
    ```
3. Navigate to the `frontend` directory and start the React development server:
    ```sh
    cd ../frontend
    npm start
    ```
4. Build the React project for production:
    ```sh
    npm run build
    ```

## Scripts

- `dev` (frontend): Starts the React development server.
- `build` (frontend): Builds the React project for production.
- `start` (backend): Starts the Express server.
- `lint` (frontend): Runs ESLint to check for linting errors.

## Dependencies

- **Frontend**:
  - `react`: ^18
  - `react-dom`: ^18
  - `tailwindcss`: ^3.4.1
  - `framer-motion`: ^7.0.0
  - `react-toastify`: ^9.0.1

- **Backend**:
  - `express`: ^4.18.2
  - `mongodb`: ^5.1.0
  - `body-parser`: ^1.20.2
  - `cors`: ^2.8.5
  - `dotenv`: ^16.4.5

## Dev Dependencies

- **Frontend**:
  - `eslint`: ^8
  - `eslint-config-next`: 14.2.5
  - `postcss`: ^8

- **Backend**:
  - `nodemon`: ^2.0.22

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: asiksmk1@gmail.com
- **GitHub**: [Sarthar01](https://github.com/Sarthar01)
