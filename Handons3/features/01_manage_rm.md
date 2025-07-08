# User Stories cho Quản Lý RM

1. **Là quản trị viên, tôi muốn thêm mới RM để quản lý danh sách RM.**
2. **Là quản trị viên, tôi muốn chỉnh sửa thông tin RM để cập nhật dữ liệu chính xác.**

    - **Là ai:** Quản trị viên hệ thống
    - **Muốn làm gì:** Chỉnh sửa các thông tin của RM bao gồm email, tên, avatar, công ty, password, ccid
    - **Để làm gì:** Đảm bảo dữ liệu RM luôn chính xác và cập nhật kịp thời khi có thay đổi

    **Tiêu chí chấp nhận:**
    - Cho phép quản trị viên cập nhật từng trường thông tin: email (required), tên, avatar, công ty, ccid của RM.
    - Hệ thống kiểm tra hợp lệ các trường dữ liệu trước khi lưu (ví dụ: email đúng định dạng, password đủ mạnh...).
    - Sau khi chỉnh sửa, thông tin mới của RM được lưu lại và hiển thị chính xác trên hệ thống.
    - Ghi nhận lịch sử chỉnh sửa (ai, khi nào, thay đổi gì) để phục vụ kiểm tra khi cần thiết (optional - audit log)

3. **Là quản trị viên, tôi muốn xóa RM khỏi hệ thống khi không còn sử dụng.**
4. **Là quản trị viên, tôi muốn xem danh sách tất cả RM để dễ dàng quản lý.**
5. **Là quản trị viên, tôi muốn tìm kiếm RM theo tên hoặc mã để tra cứu nhanh chóng.**
6. **Là quản trị viên, tôi muốn phân quyền cho RM để đảm bảo bảo mật thông tin.**