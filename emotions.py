import cv2
from deepface import DeepFace
import time

def analyze_frame(frame):
    try:
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        return result[0]['dominant_emotion']
    except Exception as e:
        print(f"Exception!!!!!!!")
        return None

def process_video():
    cap = cv2.VideoCapture('quizVideo.mp4')
    if not cap.isOpened():
        print("EXCEPTION WITH ACCESS VIDEO !!!!")
        return
    frame_count = 0
    frame_skip = 5
    start = time.time()
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_skip ==0:
            emotion = analyze_frame(frame)
            print(f"Frame num {frame_count}: Dominant Emotion - {emotion}")
        frame_count += 1
    end = time.time()
    print(end - start)
    cap.release()
    cv2.destroyAllWindows()
process_video()
