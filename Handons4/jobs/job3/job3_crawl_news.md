# Job 3: Crawl website tin tức → Lưu vào file CSV

Quy trình đã được refactor lại:
- Backend (FastAPI) nằm trong folder `backend/`, xử lý crawl, ghi file CSV, trả kết quả cho frontend.
- Frontend web nằm trong folder `web/`, nhận input từ người dùng, gửi request tới backend và hiển thị kết quả.
- Các thư viện backend được quản lý trong file `backend/requirements.txt`.

## Cài đặt backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Cài đặt frontend
Chỉ cần mở file `web/index.html` bằng trình duyệt.

## Lưu ý
- Đảm bảo backend chạy ở localhost:8000 để frontend kết nối được.
- Có thể mở rộng backend để crawl nhiều trang, lưu thêm metadata, bảo mật API.
