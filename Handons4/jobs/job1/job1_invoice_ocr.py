import os
import pytesseract
from PIL import Image
import pandas as pd
import re

# 1. Nhận ảnh từ thư mục
image_folder = 'invoices/'
for filename in os.listdir(image_folder):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        img_path = os.path.join(image_folder, filename)
        # 2. OCR
        text = pytesseract.image_to_string(Image.open(img_path))
        # 3. Regex lấy tên sản phẩm + giá
        items = re.findall(r'(\w[\w\s]+)\s+(\d+[.,]?\d*)', text)
        results = []
        for name, price in items:
            results.append({'file': filename, 'product': name.strip(), 'price': price})
        # 4. Ghi vào file Excel riêng cho từng ảnh
        if results:
            df = pd.DataFrame(results)
            output_file = f"output_{os.path.splitext(filename)[0]}.xlsx"
            df.to_excel(output_file, index=False)
        else:
            print(f'Không tìm thấy sản phẩm nào trong {filename}.')

