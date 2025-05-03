Sure! Below is a simple documentation template for your project. This documentation provides a clear overview of the app, its features, and how to set it up and run it.

---

# **Task Management Application Documentation**

## **Overview**

This is a task management application built with **React** on the frontend and **Node.js** with **MongoDB** on the backend. The app allows users to register, log in, manage their tasks, and view/update their profile. It supports user authentication with **JWT** tokens and utilizes a RESTful API to manage tasks.

## **Technologies Used**

* **Frontend**:

  * React (with Vite)
  * React Router for page navigation
  * Axios for API requests
  * JWT for user authentication
* **Backend**:

  * Node.js with Express
  * MongoDB for database storage
  * JWT for user authentication
* **Styling**:

  * CSS (custom styles for dark UI)

## **Features**

1. **User Authentication**:

   * Sign Up: New users can register an account with a name, email, and password.
   * Login: Registered users can log in with their credentials, and a JWT token is stored in the cookies for authentication.
   * Logout: The user can log out, clearing the JWT token from the cookies.

2. **Profile Management**:

   * Users can view their profile information (name, email, phone number).
   * They can update their profile details (name, email, phone number) via an update form.

3. **Task Management**:

   * Users can create, view, edit, and delete tasks.
   * Tasks can be filtered using a search bar that searches by task title.
   * Tasks have a due date and a pending/completed status.

4. **Task Filtering**:

   * A search bar allows users to search tasks by title.

5. **UI Styling**:

   * The app uses a dark mode design for both frontend and backend with a clean and simple layout.
   * Buttons and inputs are styled to provide a modern look.

---

## **Project Structure**

```
/client                    # Frontend (React)
  ├── /public              # Public assets
  ├── /src
  │   ├── /components      # Reusable components
  │   ├── /pages           # React pages (Home, Tasks, Profile, CreateTask)
  │   ├── /services        # API requests using Axios
  │   ├── /styles          # Custom CSS for styling
  │   ├── App.jsx          # Main app component
  │   ├── index.jsx        # Entry point for React
  └── package.json         # Client-side dependencies
/server                    # Backend (Node.js)
  ├── /controllers         # Logic for handling API requests
  ├── /models              # MongoDB models (User, Task)
  ├── /routes              # API routes for authentication and tasks
  ├── /services            # Authentication, JWT utilities
  ├── server.js            # Main server setup
  └── package.json         # Server-side dependencies
```

---

## **Setup and Installation**

### **1. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <project_folder>
```

### **2. Install Backend Dependencies**

Navigate to the `server` directory and install the backend dependencies:

```bash
cd backend
npm install
```

### **3. Install Frontend Dependencies**

Navigate to the `client` directory and install the frontend dependencies:

```bash
cd frontend
npm install
```

### **4. Configure Environment Variables**

You will need to configure the following environment variables for the server:

* **`MONGO_URI`**: MongoDB connection string.
* **`JWT_SECRET`**: Secret key for JWT token generation.
* **`PORT`**: Port to run the backend server (e.g., `5000`).

Create a `.env` file in the `server` directory and add the following:

```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### **5. Start the Backend Server**

Run the server using the following command:

```bash
cd backend
npm start
```

This will start the backend server on `http://localhost:5000`.

### **6. Start the Frontend Application**

Now, go to the `client` directory and start the React app:

```bash
cd frontend
npm run dev
```

This will start the React application on `http://localhost:5173`.

---

## **API Endpoints**

### **Authentication Routes**

* **POST `/auth/signup`**: Register a new user.

  * Body: `{ name, email, password }`

* **POST `/auth/login`**: Login and receive a JWT token.

  * Body: `{ email, password }`

* **POST `/auth/logout`**: Log the user out (clears the token).

* **GET `/auth/getuser`**: Get the currently authenticated user's data (requires JWT token).

* **PUT `/auth/edit`**: Update the user's profile (name, email, phone).

  * Body: `{ name, email, phoneNumber }`

### **Task Routes**

* **GET `/tasks`**: Get all tasks for the authenticated user.

* **POST `/tasks`**: Create a new task.

  * Body: `{ title, description, dueDate, status }`

* **PUT `/tasks/:id`**: Update an existing task.

  * Body: `{ title, description, dueDate, status }`

* **DELETE `/tasks/:id`**: Delete a task.

* **GET `/tasks/search`**: Search tasks by title (query parameter: `title`).

---

## **Usage**

* **Login**: Use the login page to authenticate yourself. Once logged in, you will be able to manage tasks, update your profile, and log out.
* **Profile**: View and update your profile (name, email, phone number) by navigating to the Profile page.
* **Tasks**: Manage your tasks by adding, editing, and deleting them. You can search tasks by their title.

---

## **Future Enhancements**

1. **Pagination**: Add pagination to the tasks page to limit the number of tasks displayed at once.
2. **Task Priority**: Add a priority field to tasks, allowing users to set priority levels.
3. **Task Categories**: Implement task categories (e.g., Work, Personal).
4. **Notifications**: Add email or in-app notifications for due tasks.

---

## **License**

This project is licensed under the MIT License.

---

This documentation provides a basic overview of your project, setup instructions, and details about API routes and functionality. If you'd like to expand any sections or add more details, feel free to ask!
