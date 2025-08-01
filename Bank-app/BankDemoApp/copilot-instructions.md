# Copilot Instructions

This project is a modular React Native demo banking app using Firebase as backend, designed for rapid prototyping and demoing new payment technologies for banks and partners.

## Key Modules
- Landing/Showcase (feature intro, animation/video)
- NFC Payment (mocked, with animation)
- Online Savings (deposit, term, interest, PDF export)
- eKYC (OCR, face match, liveness, mock API)
- Virtual Visa Card (register, OTP mock, card display)
- Transaction History (resettable)
- Simple Login (employee/partner code, no real security)

## Non-functional
- Modern UI/UX, bank branding
- Offline/semi-online support
- Easy data reset
- Admin config (show/hide modules)
- Basic security (no real user data)

## Tech Stack
- React Native 0.80+
- Firebase (auth, firestore, storage)
- react-native-nfc-manager, lottie-react-native, camera/QR, etc.

## Structure
- `/screens` - UI screens per module
- `/services` - API, Firebase, mock logic
- `/models` - Data models/types
- `/assets` - Images, animations
- `/utils` - Helpers, PDF, etc.

## Usage
- See README.md for setup, run, and demo scenarios.
- Each module is isolated for easy demo and reset.
