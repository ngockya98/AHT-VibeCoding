# Job 1: Đọc ảnh hóa đơn → Trích xuất thông tin → Ghi file Excel

Quy trình này đã được chuyển sang Jupyter Notebook để dễ dàng trình bày, kiểm thử và mở rộng.

## Nội dung notebook
1. Cài đặt và kiểm tra các thư viện cần thiết
2. Đọc danh sách file ảnh hóa đơn
3. Thực hiện OCR trên từng ảnh
4. Trích xuất thông tin sản phẩm và giá bằng regex
5. Ghi kết quả vào file Excel
6. Kiểm tra kết quả ghi ra file

## Cài đặt thư viện
```bash
pip install -r requirements.txt
```

## Lưu ý
- Cần cài đặt Tesseract OCR trên máy (Linux: `sudo apt install tesseract-ocr`).
- Đảm bảo ảnh hóa đơn rõ nét để kết quả OCR tốt nhất.
- Có thể mở rộng thêm các bước xử lý, giao diện, kiểm thử trực tiếp trên notebook.
