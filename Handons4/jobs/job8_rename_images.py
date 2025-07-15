"""
Job 8: Tự động đổi tên file ảnh → theo quy tắc chuẩn
Tools: Python os, PIL
"""
import os
from PIL import Image
from datetime import datetime

folder = 'images/'
for filename in os.listdir(folder):
    if filename.endswith('.jpg'):
        img_path = os.path.join(folder, filename)
        # Lấy ngày từ metadata hoặc tên cũ
        date_str = datetime.now().strftime('%Y%m%d')
        new_name = f'{date_str}_{filename}'
        os.rename(img_path, os.path.join(folder, new_name))
