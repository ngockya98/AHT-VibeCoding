# Security Policy

## Reporting a Vulnerability

Please report security issues via email to security@automotive-platform.local.

## Checklist

- [x] Use Helmet for HTTP headers
- [x] Enable CORS
- [x] Rate limit all APIs
- [x] Validate input with zod
- [x] Encrypt PII (phone/email) with AES-256-GCM
- [x] Audit log all sensitive actions (mask PII)
- [x] Do not log secrets or raw PII
