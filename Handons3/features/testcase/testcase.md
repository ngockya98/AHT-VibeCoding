# Testcase - Tạo mới Relation Manager (relation_manager)

## 1. Tạo RM thành công với dữ liệu hợp lệ
- **Input:** name, username (<=50 ký tự), email hợp lệ, password đủ mạnh, company, avatar, ccid
- **Kỳ vọng:** API trả về mã 201, dữ liệu RM mới với đầy đủ trường, status mặc định là 'active'

## 2. Không nhập email
- **Input:** name, username, password, company, avatar, ccid (không có email)
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo thiếu trường email

## 3. Email sai định dạng
- **Input:** name, username, email="abc@", password, company, avatar, ccid
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo email không hợp lệ

## 4. Username vượt quá 50 ký tự
- **Input:** username > 50 ký tự, các trường còn lại hợp lệ
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo username vượt quá giới hạn

## 5. Email đã tồn tại
- **Input:** email đã tồn tại trong hệ thống, các trường còn lại hợp lệ
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo email đã tồn tại

## 6. Username đã tồn tại
- **Input:** username đã tồn tại trong hệ thống, các trường còn lại hợp lệ
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo username đã tồn tại

## 7. Password yếu
- **Input:** password không đủ mạnh (ví dụ: <6 ký tự), các trường còn lại hợp lệ
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo password yếu

## 8. Không nhập trường bắt buộc (name, username, email, password)
- **Input:** thiếu 1 hoặc nhiều trường bắt buộc
- **Kỳ vọng:** API trả về mã lỗi 400, thông báo thiếu trường bắt buộc

## 9. Kiểm tra trường mặc định
- **Input:** chỉ nhập các trường bắt buộc
- **Kỳ vọng:** Trường status mặc định là 'active', created_at/updated_at được sinh tự động

## 10. Kiểm tra audit log
- **Input:** Tạo mới RM thành công
- **Kỳ vọng:** Bản ghi mới được ghi vào bảng audit_log với action='create', record_id là uuid của RM vừa tạo