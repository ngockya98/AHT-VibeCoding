## Demo Banking React PWA

Dự án này là một Progressive Web App (PWA) demo cho ứng dụng ngân hàng hiện đại, sử dụng React + Vite.

## Tính năng chính
- Dashboard: Thông tin tài khoản, số dư, truy cập nhanh các tính năng.
- Thanh toán NFC/QR: Mô phỏng animation tap thẻ hoặc scan QR, xác nhận giao dịch.
- Gửi tiết kiệm: Form gửi tiết kiệm, mô phỏng kết quả.
- KYC/eKYC: Upload ảnh giấy tờ, selfie, demo AI/OCR.
- Visa ảo: Hiển thị thông tin thẻ ảo, QR code thanh toán.

## Khởi động dự án
```bash
npm install
npm run dev
```

## Cấu trúc đề xuất
- src/components: Các component UI
- src/pages: Các màn hình chính (Dashboard, Payment, Savings, KYC, Visa)
- src/services: Mock API/service
- src/assets: Ảnh, icon, v.v.

## Công nghệ
- React 18, Vite, React Router, Context API
- Có thể tích hợp thêm: react-qr-reader, animation NFC, gọi API AI cloud

## Ghi chú
- Dự án chỉ demo UI/UX, logic local, không kết nối backend thực.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
