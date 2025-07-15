"""
Job 9: Text-to-Speech → tạo file mp3 từ chuỗi input
Tools: gTTS, pyttsx3
"""
from gtts import gTTS
text = 'Xin chào, đây là file mp3.'
tts = gTTS(text)
tts.save('output.mp3')
