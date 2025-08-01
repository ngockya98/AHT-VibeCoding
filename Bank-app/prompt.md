Tôi muốn viết 1 app trên mobile để giúp demo cho banking. Paintpoint: Bank sẽ phát triển các giải pháp về thanh toán và muốn xây dựng app demo cho doanh nghiệp về các giải pháp mới hoặc công nghệ mới:

Công nghệ thanh toán 1 chạm/ không chậm NFC
Giải pháp gửi tiền tiết kiệm online
Công nghệ nhận diện KYC
Phát hành thẻ Visa ảo...
Mục tiêu Xây dựng một ứng dụng mobile demo, đóng vai trò là công cụ trình diễn các giải pháp công nghệ thanh toán mới mà ngân hàng triển khai hoặc đang phát triển. App được dùng trong demo nội bộ, demo với đối tác, khách hàng doanh nghiệp.

I. Các Module Chính

Trang giới thiệu giải pháp (Landing + Showcase) Mô tả từng tính năng (thanh toán, tiết kiệm, KYC…)
Video hoặc animation minh họa công nghệ

Có thể tùy chỉnh nội dung để phù hợp từng đối tác demo

Thanh toán không chạm (NFC Payment) Mô phỏng tính năng thanh toán bằng NFC (tap to pay)
Cho phép người dùng:

Nhập số tiền giao dịch

“Tap” mô phỏng thiết bị POS/NFC reader (có thể dùng animation hoặc thiết bị test)

Giao dịch mô phỏng thành công/thất bại

Yêu cầu kỹ thuật:

Sử dụng Android Host Card Emulation (HCE) để giả lập thẻ

iOS có thể cần mock vì bị hạn chế NFC trong thanh toán (hoặc chỉ trình diễn qua animation)

Gửi tiền tiết kiệm online Giao diện chọn:
Số tiền gửi

Kỳ hạn gửi (1-3-6-12 tháng)

Lãi suất hiển thị

Mô phỏng xác nhận giao dịch gửi tiền

Có thể export “sổ tiết kiệm” demo PDF hoặc hiển thị trong lịch sử giao dịch

KYC điện tử (eKYC) Cho phép người dùng demo KYC bằng:
Quét CMND/CCCD (upload hoặc camera)

Nhận diện khuôn mặt (chụp ảnh selfie)

Trình diễn:

So khớp thông tin OCR từ giấy tờ

Đối chiếu khuôn mặt người dùng với ảnh trong giấy tờ

Mô phỏng xác minh thành công/thất bại

Có thể có thêm tính năng liveness detection (quay đầu, chớp mắt)

Lưu ý: Dùng mock API hoặc AI SDK (ví dụ: AWS Rekognition, OpenCV hoặc các SDK KYC của bên thứ 3 như VnFace, FPT.AI)

Phát hành thẻ Visa ảo Cho phép người dùng đăng ký mở thẻ nhanh:
Nhập thông tin cơ bản

Xác thực bằng OTP (mock)

Mô phỏng tạo thẻ ảo (số thẻ, hạn dùng, tên người dùng)

Hiển thị thẻ ảo với thiết kế tùy chỉnh (graphic)

Cho phép xem thông tin thẻ, ẩn/hiện CVV

Có thể dùng trong giao dịch test với hệ thống demo

Lịch sử giao dịch demo Danh sách các giao dịch đã thực hiện (NFC, gửi tiết kiệm, phát hành thẻ…)
Trình bày đơn giản, có thể reset khi bắt đầu demo mới

Quản lý người dùng demo (Simple login) Cho phép đăng nhập giả lập:
Không cần bảo mật thực sự

Có thể login bằng mã nhân viên, mã đối tác để tùy biến nội dung demo

II. Yêu cầu phi chức năng (Non-functional Requirements) Thiết kế UI/UX hiện đại, theo màu sắc nhận diện của ngân hàng

App native/hybrid (React Native, Flutter hoặc Swift/Kotlin tùy yêu cầu)

Có thể hoạt động offline hoặc semi-online (tùy phần)

Dễ dàng reset/clear dữ liệu giữa các phiên demo

Cho phép cấu hình từ admin (ẩn/hiện module theo nhu cầu demo)

Bảo mật cơ bản (không yêu cầu lưu thông tin thực tế người dùng)

III. Đề xuất kiến trúc và công nghệ Frontend (Mobile):

React Native / Flutter (nếu muốn chạy cả iOS/Android)

Swift/Kotlin nếu muốn performance cao, NFC tốt hơn

Backend/API giả lập:

Node.js / Firebase / Mock Server (JSON Server)

Có thể host nhẹ trên localhost hoặc server demo tạm thời

SDK gợi ý:

OCR: Google ML Kit / AWS Textract / FPT.AI OCR

Face Matching: FaceIO / VnFace / OpenCV

NFC: Android HCE API

IV. Tính năng nâng cao có thể thêm về sau Demo QR Code Payment (tạo + quét mã QR)

Tích hợp Apple Pay / Google Pay giả lập

Dashboard web kèm app để tracking kết quả demo

Lưu báo cáo kết quả mỗi lần demo (dạng PDF hoặc JSON)

=>> App sẽ sử dụng toàn bộ Firebase làm backend và CSDL