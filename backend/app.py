import os
import re
import json
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024  # contact requests only; keep payloads small

allowed_origins = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173,http://127.0.0.1:5173")
CORS(app, resources={r"/api/*": {"origins": [origin.strip() for origin in allowed_origins.split(",") if origin.strip()]}})

DATA_DIR = Path(__file__).resolve().parent / "data"
MESSAGES_FILE = DATA_DIR / "messages.json"


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "Paramesh portfolio API"})


@app.get("/api/profile")
def profile():
    return jsonify({
        "name": "Paramesh P",
        "role": "Computer Science and Engineering Student",
        "location": "Coimbatore, Tamil Nadu, India",
        "email": "paramesh25427@gmail.com",
        "links": {
            "linkedin": "https://linkedin.com/in/paramesh-p-95590b338",
            "github": "https://github.com/paramesh25427",
            "leetcode": "https://leetcode.com/u/Paramesh26"
        },
        "interests": ["Backend Development", "DevOps", "Cloud Computing", "Artificial Intelligence"]
    })


def clean_text(value, max_length):
    if not isinstance(value, str):
        return ""
    return value.strip()[:max_length]


@app.post("/api/contact")
def contact():
    if not request.is_json:
        return jsonify({"error": "Please submit the form as JSON."}), 415

    payload = request.get_json(silent=True) or {}
    name = clean_text(payload.get("name"), 100)
    email = clean_text(payload.get("email"), 254)
    subject = clean_text(payload.get("subject", ""), 150)
    message = clean_text(payload.get("message"), 5000)

    if len(name) < 2:
        return jsonify({"error": "Please enter a name with at least 2 characters."}), 400
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify({"error": "Please enter a valid email address."}), 400
    if len(message) < 10:
        return jsonify({"error": "Please write a message of at least 10 characters."}), 400

    record = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "received_at": datetime.now(timezone.utc).isoformat()
    }

    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        records = []
        if MESSAGES_FILE.exists():
            try:
                records = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
                if not isinstance(records, list):
                    records = []
            except (json.JSONDecodeError, OSError):
                records = []
        records.append(record)
        MESSAGES_FILE.write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    except OSError:
        app.logger.exception("Could not persist contact form message")
        return jsonify({"error": "The server could not save your message. Please email me directly instead."}), 500

    # This stores the message locally. Configure an email provider before public deployment.
    app.logger.info("Contact form message received from %s", email)
    return jsonify({"message": "Thanks! Your message was received."}), 201


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": "Your submission is too large."}), 413


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
