"""
Job 1: Đọc ảnh hóa đơn → Trích xuất thông tin → Ghi file Excel
Tools: Python, Tesseract, pandas, openpyxl
"""
import os
import pytesseract
from PIL import Image
import pandas as pd

# 1. Nhận ảnh từ thư mục
image_folder = 'invoices/'
results = []
for filename in os.listdir(image_folder):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        img_path = os.path.join(image_folder, filename)
        # 2. OCR
        text = pytesseract.image_to_string(Image.open(img_path))
        # 3. Regex lấy tên sản phẩm + giá
        # TODO: Thêm regex phù hợp
        # 4. Ghi vào Excel
        results.append({'file': filename, 'text': text})
df = pd.DataFrame(results)
df.to_excel('output.xlsx', index=False)
