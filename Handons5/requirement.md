Tôi muốn viết 1 app trên mobile hoặc mobile web để giúp demo cho banking.

Painpoint: Bank sẽ phát triển các giải pháp về thanh toán và muốn xây dựng app demo cho doanh nghiệp về các giải pháp mới hoặc công nghệ mới: công nghệ thanh toán 1 chạm / không chạm qua NFC, giải pháp gửi tiền tiết kiệm online, công nghệ nhận diện KYC, phát hành visa ảo, ...

===============================================================================================
===============================================================================================
===============================================================================================

graph TD
    A[Người dùng Demo App] --> B1[Mobile App / PWA]
    B1 --> C1[UI Layer]
    B1 --> C2[Business Logic Layer]
    B1 --> C3[Data Layer]

    C1 --> D1[Giao diện Demo NFC / QR / Thẻ ảo]
    C1 --> D2[Demo KYC / Mở tài khoản / Gửi tiết kiệm]
    C1 --> D3[Dashboard tài khoản demo]

    C2 --> E1[Xử lý mô phỏng: thanh toán, gửi tiết kiệm]
    C2 --> E2[Xác thực giả lập (eKYC)]
    C2 --> E3[Quản lý session demo / user flow]

    C3 --> F1[Mock Data Service]
    C3 --> F2[Local Storage / Cache]
    C3 --> F3[Firebase / Supabase (tùy chọn)]

    E2 --> G1[OCR Service (Google ML Kit / Azure Form Recognizer)]
    E2 --> G2[Face Matching API (Azure Face API / Mock Model)]

    style G1 fill:#f9f,stroke:#333,stroke-width:1px
    style G2 fill:#f9f,stroke:#333,stroke-width:1px
