# Paramesh P — Developer Portfolio

A responsive dark-purple developer portfolio built with React, Vite, CSS, and Python Flask.

## Features

- Responsive layout for mobile, tablet, and desktop
- About, skills, projects, education, achievements, and contact sections
- Resume-based profile details and external profile links
- Contact form connected to a Flask API
- Backend input validation and local JSON message storage
- Health and profile API endpoints
- Keyboard focus styles and reduced-motion support

## Requirements

- Node.js 18+ (Node 22 is fine)
- Python 3.10+

## Run locally on Windows

Open two terminals in your editor.

### 1. Start the Flask backend

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

If PowerShell blocks activation, you can run the virtual environment interpreter directly:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

The API runs at `http://127.0.0.1:5000`.

Test it by opening `http://127.0.0.1:5000/api/health`.

### 2. Start the React frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Contact form behaviour

The form sends a POST request to `/api/contact`. The Flask backend validates and saves submissions to `backend/data/messages.json`. This is suitable for local development and a demo, not a production contact workflow. It does **not** send an email yet.

Before public deployment:
- Configure a transactional email provider or another secure message delivery method.
- Use a persistent database or managed storage instead of a local JSON file.
- Set `FRONTEND_ORIGIN` to your exact deployed frontend origin.
- Set `VITE_API_URL` in the frontend environment to the deployed backend URL.
- Add rate limiting, spam protection, HTTPS, and appropriate privacy messaging.
- Do not commit `.env` or private credentials.

## Useful API endpoints

- `GET /api/health` — confirms the backend is running
- `GET /api/profile` — returns public portfolio profile data
- `POST /api/contact` — validates and stores a contact message

## Personalisation checklist

1. Confirm the resume details and profile links.
2. Add repository and live-demo links to each project card when available.
3. Add a PDF resume download file if desired.
4. Configure email delivery for the contact form.
5. Deploy the frontend and backend, then test from a phone.

## Resume details represented

- Paramesh P, CSE student, Sri Shakthi Institute of Engineering and Technology (2024–2028), CGPA 7.7
- Projects: Smart AI Surveillance, Job Finder for Resume, Scanalyse — Website Safety Analyzer, Tailor E-Commerce Website
- Skills: Java, Python, C++, C, HTML, CSS, JavaScript, Flask, SQL, MongoDB, Git, GitHub, VS Code, Postman, OpenCV, DSA, OOP, DBMS, REST APIs
- Sri Shakthi Hackathon finalist, HackSprint participant, two Kaggle badges
- Contact and profile links are based on the uploaded resume
