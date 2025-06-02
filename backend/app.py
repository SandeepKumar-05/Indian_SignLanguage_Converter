from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os
import speech_recognition as sr
import pyttsx3
from gtts import gTTS
from io import BytesIO
from deep_translator import GoogleTranslator  # More reliable translation library
from ultralytics import YOLO

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Initialize models and services
yolo_model = YOLO("best_64.pt")  # Load YOLO model
engine = pyttsx3.init()

# Configure paths
ISL_GIFS_DIR = "ISL_Gifs"
os.makedirs(ISL_GIFS_DIR, exist_ok=True)

# ----------------- SIGN LANGUAGE DETECTION ----------------- #
@app.route("/detect", methods=["POST"])
def detect_sign():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        npimg = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        # Run YOLO detection
        results = yolo_model(img)

        detected_text = "No sign detected"
        annotated_img = img.copy()

        for result in results:
            if result.boxes is not None and len(result.boxes) > 0:
                for box in result.boxes:
                    class_id = int(box.cls[0])
                    detected_text = yolo_model.names[class_id]

                    # Draw bounding box
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(annotated_img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(annotated_img, detected_text, (x1, y1 - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Convert annotated image to base64
        _, buffer = cv2.imencode(".jpg", annotated_img)
        annotated_img_base64 = base64.b64encode(buffer).decode("utf-8")

        return jsonify({
            "recognized_text": detected_text,
            "annotated_image": annotated_img_base64,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------------- TEXT TRANSLATION & TTS ----------------- #
@app.route("/translate", methods=["POST"])
def translate_text():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        text = data.get("text", "").strip()
        source_lang = data.get("source_language", "en")
        target_lang = data.get("target_language", "hi")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Using deep_translator as a more reliable alternative
        translated_text = GoogleTranslator(source=source_lang, target=target_lang).translate(text)

        # Generate TTS audio
        tts = gTTS(translated_text, lang=target_lang)
        audio_buffer = BytesIO()
        tts.write_to_fp(audio_buffer)
        audio_buffer.seek(0)
        audio_base64 = base64.b64encode(audio_buffer.read()).decode("utf-8")

        return jsonify({
            "translated_text": translated_text,
            "audio_base64": audio_base64
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------------- SPEECH RECOGNITION & TEXT INPUT ----------------- #
@app.route("/recognize", methods=["POST"])
def recognize_speech():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    recognizer = sr.Recognizer()
    
    try:
        with sr.Microphone() as source:
            print("Calibrating microphone for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=2)
            print("Listening for speech...")
            
            audio = recognizer.listen(source, timeout=8, phrase_time_limit=6)
            text = recognizer.recognize_google(audio).lower()
            print(f"Recognized: {text}")

            engine.say(text)
            engine.runAndWait()
            
            return jsonify({"word": text})
        
    except sr.UnknownValueError:
        return jsonify({"error": "Could not understand audio"}), 400
    except sr.RequestError as e:
        return jsonify({"error": f"Speech recognition service error: {str(e)}"}), 500
    except sr.WaitTimeoutError:
        return jsonify({"error": "No speech detected within timeout period"}), 408
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@app.route("/text_input", methods=["POST"])
def process_text_input():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        word = data.get("word", "").strip().lower()
        if not word:
            return jsonify({"error": "No word provided"}), 400

        engine.say(word)
        engine.runAndWait()

        return jsonify({"word": word})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------------- SERVE GIFs ----------------- #
@app.route("/get_gif/<word>")
def get_gif(word):
    safe_word = "".join(c for c in word if c.isalnum() or c in " _-")
    gif_path = os.path.join(ISL_GIFS_DIR, f"{safe_word}.gif")
    
    if os.path.exists(gif_path):
        return send_from_directory(ISL_GIFS_DIR, f"{safe_word}.gif")
    return jsonify({"error": "GIF not found"}), 404

# Error handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)