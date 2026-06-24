# Prompt Companion AI

## Overview

Prompt Companion AI is an AI-powered prompt management and assistance platform developed using Flask, MySQL, HTML, CSS, and JavaScript. The application allows users to generate AI responses, manage chat history, edit prompts, organize conversations, and maintain user profiles through a clean and modern dashboard interface.

The project focuses on improving productivity by helping users generate ideas, solve coding problems, create content, and manage AI conversations efficiently.

---

## Features

### User Authentication

* User Registration
* Secure Login System
* Password Hashing using Werkzeug Security
* Session Management
* Logout Functionality

### Dashboard

* Modern AI Chat Dashboard
* Responsive User Interface
* Prompt Input Area
* AI Response Display
* Example Prompt Cards
* Character Counter
* New Chat Functionality

### Chat Management

* Store Prompt History
* View Previous Conversations
* Search Chat History
* Delete Individual Chats
* Edit Existing Prompts
* Copy Prompts
* Copy AI Responses
* Recent Chat Navigation

### Profile Management

* View User Profile
* Edit Profile Information
* Change Password
* Persistent User Session
* Personalized Welcome Message

### AI Features

* Prompt Categorization
* AI Response Generation
* Markdown Response Rendering
* Structured Response Formatting

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Backend

* Python
* Flask

### Database

* MySQL
* SQLAlchemy ORM

### Security

* Werkzeug Password Hashing
* Session-Based Authentication

---

## Project Structure

```text
Prompt-Companion-AI/
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── edit_profile.html
│   └── change_password.html
│
├── app.py
├── models.py
├── ai_engine.py
├── config.py
├── requirements.txt
└── README.md
```

---

## Database Schema

### Users Table

| Column     | Type     |
| ---------- | -------- |
| id         | Integer  |
| name       | String   |
| username   | String   |
| email      | String   |
| password   | String   |
| created_at | DateTime |

### Prompts Table

| Column      | Type    |
| ----------- | ------- |
| id          | Integer |
| user_id     | Integer |
| prompt_text | Text    |
| category    | String  |
| ai_response | Text    |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/prompt-companion-ai.git
cd prompt-companion-ai
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Database

Create a MySQL database and update the credentials inside:

```python
config.py
```

### Run Application

```bash
python app.py
```

Application will start at:

```text
http://127.0.0.1:5000
```

---

## Security Features

* Passwords are securely hashed before storage.
* User sessions are protected using Flask sessions.
* Unauthorized users cannot access dashboard routes.
* Profile and chat data are linked to authenticated users.

---

## Future Enhancements

* Export Chat History
* AI Conversation Categories
* Profile Picture Upload
* Real-Time Chat Updates
* Advanced Search Filters
* Multi-User Collaboration

---

## Learning Outcomes

This project helped in understanding:

* Flask Application Development
* User Authentication Systems
* Database Design with SQLAlchemy
* Session Management
* Frontend and Backend Integration
* AI API Integration
* CRUD Operations
* Responsive Dashboard Design

---

## Author

Vaishnavi Solanki

B.Tech Computer Science Student

Prompt Companion AI – Internship Project
