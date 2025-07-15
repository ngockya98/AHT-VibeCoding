# Job 3: Crawl website tin tức → Lưu vào file CSV

Quy trình này đã được chuyển sang Jupyter Notebook để dễ dàng trình bày, kiểm thử và mở rộng.

## Nội dung notebook
1. Cài đặt và kiểm tra các thư viện cần thiết
2. Định nghĩa URL và cấu trúc HTML cần crawl
3. Gửi request, lấy HTML
4. Trích xuất tiêu đề, link bằng BeautifulSoup
5. Ghi kết quả vào file CSV
6. Kiểm tra kết quả ghi ra file

## Cài đặt thư viện
```bash
pip install -r requirements.txt
```

## Lưu ý
- Cần xác định đúng selector HTML của trang tin tức.
- Có thể mở rộng crawl nhiều trang, lưu thêm metadata, kiểm thử trực tiếp trên notebook.
