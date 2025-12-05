import os
import sqlite3
import string
import random
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
from werkzeug.utils import secure_filename

# Load environment variables if available
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# Upload configuration
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Database configuration
DB_NAME = os.getenv('DB_NAME', 'reports.db')

def init_db():
    """Initializes the database if not exists."""
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        category TEXT,
        description TEXT,
        anonymous INTEGER,
        contact TEXT,
        address TEXT,
        district TEXT,
        latitude REAL,
        longitude REAL,
        media_path TEXT,
        status TEXT,
        created_at TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

def generate_ticket():
    """Generates a unique ticket ID: 4 digits + 3 letters + 4 digits."""
    part1 = ''.join(random.choices(string.digits, k=4))
    part2 = ''.join(random.choices(string.ascii_uppercase, k=3))
    part3 = ''.join(random.choices(string.digits, k=4))
    return part1 + part2 + part3

def allowed_file(filename):
    """Check if the uploaded file is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/submit', methods=['POST'])
def submit_report():
    try:
        form = request.form
        category = form.get('category')
        description = form.get('description')
        anonymous = form.get('anonymous') == 'true'
        contact = form.get('contact')
        address = form.get('address')
        district = form.get('district')
        latitude = form.get('latitude')
        longitude = form.get('longitude')

        # Handle media upload
        media_path = None
        if 'media' in request.files:
            media = request.files['media']
            if media and allowed_file(media.filename):
                filename = secure_filename(generate_ticket() + "_" + media.filename)
                media_path = os.path.join(UPLOAD_FOLDER, filename)
                media.save(media_path)

        ticket_id = generate_ticket()

        # Insert into database
        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()
        cur.execute("""
        INSERT INTO reports (
            id, category, description, anonymous, contact,
            address, district, latitude, longitude, media_path,
            status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ticket_id, category, description, int(anonymous), contact,
            address, district, latitude, longitude, media_path,
            "Pending", datetime.now().isoformat()
        ))
        conn.commit()
        conn.close()

        return jsonify({"id": ticket_id})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Server error"}), 500

@app.route('/api/report/<ticket_id>/status', methods=['GET'])
def check_status(ticket_id):
    try:
        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()
        cur.execute("SELECT status FROM reports WHERE id = ?", (ticket_id,))
        row = cur.fetchone()
        conn.close()

        if row:
            return jsonify({"status": row[0]})
        else:
            return jsonify({"error": "Not found"}), 404
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Server error"}), 500

@app.route('/uploads/<filename>', methods=['GET'])
def uploaded_file(filename):
    """Serve uploaded files (for testing purposes only)"""
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
