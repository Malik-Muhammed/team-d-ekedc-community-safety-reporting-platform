import os
import sqlite3
import string
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Create uploads folder if missing
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

DB_NAME = 'reports.db'

# Create database if it does not exist
def init_db():
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


# Generate ticket: 4 digits, 3 random letters, 4 digits (total: 11 chars)
def generate_ticket():
    part1 = ''.join(random.choice(string.digits) for _ in range(4))
    part2 = ''.join(random.choice(string.ascii_uppercase) for _ in range(3))
    part3 = ''.join(random.choice(string.digits) for _ in range(4))
    return part1 + part2 + part3


@app.route('/api/submit', methods=['POST'])
def submit_report():
    try:
        print("Incoming request:", request.form)
        print("Received form data:", dict(request.form))
        print("Received files:", request.files)

        category = request.form.get('category')
        description = request.form.get('description')
        anonymous = request.form.get('anonymous') == 'true'
        contact = request.form.get('contact')
        address = request.form.get('address')
        district = request.form.get('district')
        latitude = request.form.get('latitude')
        longitude = request.form.get('longitude')

        # File upload
        media_path = None
        if 'media' in request.files:
            media = request.files['media']
            if media.filename:
                filename = generate_ticket() + "_" + media.filename.replace(" ", "_")
                media_path = os.path.join(UPLOAD_FOLDER, filename)
                media.save(media_path)

        ticket_id = generate_ticket()

        conn = sqlite3.connect(DB_NAME)
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO reports (
                id, category, description, anonymous, contact,
                address, district, latitude, longitude, media_path,
                status, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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


if __name__ == '__main__':
    app.run(port=5000, debug=True)
