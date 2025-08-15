# Automotive Service Management Platform — Build Playbook (Executable-Code Prompts)

> Dùng file này làm **playbook sinh mã nguồn hoàn chỉnh** với Copilot/GPT.  
> Mỗi prompt dưới đây **bắt buộc** trả về **các file + nội dung code đầy đủ** theo format:
>
> ```
> FILE: path/to/file.ext
> <nội dung code đầy đủ, chạy được>
> FILE: path/to/another_file.ext
> <nội dung code đầy đủ, chạy được>
> ```
>
> **Không** trả về mô tả/giải thích. Chỉ **code + đường dẫn file**.  
> Kiến trúc theo **monorepo**: `apps/*`, `libs/*`, `infra/*`, `docs/*`.
>
> #### Tech stack tổng
> - Backend: **NestJS (TypeScript)**, PostgreSQL, Redis, RabbitMQ, Elasticsearch, MinIO (S3)
> - Frontend: **Next.js + Tailwind + shadcn/ui** (Garage & Distributor)
> - Mobile: **React Native (Expo)** (Staff & Customer)
> - Auth: JWT (access+refresh), OAuth2 (tùy chọn), RBAC
> - Infra: Docker, docker-compose, Kubernetes (Helm), Terraform (tùy chọn), GitHub Actions/GitLab CI
> - Observability: OpenTelemetry, Prometheus, Grafana, Loki
> - BI/ETL: dbt models (skeleton), DW schema (star), optional Airflow/Singer
> - Performance: k6
>
> #### Quy ước chung cho mọi prompt
> 1) **Chỉ output file + code**. Không mô tả.
> 2) **Tạo đủ**: cấu trúc thư mục, file config, code modules, test, seed (nếu có), scripts chạy.
> 3) Dùng **.env.example** cho cấu hình. Tất cả service kết nối qua tên host docker-compose.
> 4) Tên workspace: `automotive-platform`.
> 5) **RBAC** theo vai trò: `admin`, `manager`, `advisor`, `technician`, `warehouse`, `finance`, `customer`.
> 6) Tạo **Makefile** cho lệnh nhanh: `make bootstrap`, `make dev`, `make test`, `make down`.
> 7) Tạo **root docker-compose.yml** để up toàn bộ hạ tầng + service tối thiểu chạy demo.
>
> ---
>
> ## 0) System Prompt (Gốc + Monorepo Scaffold)
> **Mục tiêu**: Sinh **bộ khung monorepo** có thể chạy demo end-to-end tối thiểu với Auth + Garage + Inventory + Frontend + Infra.
>
> **YÊU CẦU OUTPUT (chỉ file + code)**:
> - Root files: `.gitignore`, `README.md`, `package.json` (pnpm workspaces), `pnpm-workspace.yaml`, `tsconfig.base.json`, `.prettierrc`, `.eslintrc.js`, `Makefile`
> - Root env: `.env.example`
> - **docker-compose.yml** (services: `postgres`, `redis`, `rabbitmq`, `elasticsearch`, `kibana`, `minio`, `otel-collector`, `prometheus`, `grafana`, `loki`, `tempo`)
> - **apps/**
>   - `apps/auth-service` (NestJS skeleton)
>   - `apps/garage-service` (NestJS skeleton)
>   - `apps/inventory-service` (NestJS skeleton)
>   - `apps/frontend-web` (Next.js skeleton)
> - **libs/**
>   - `libs/common` (DTOs chung, utils, logger, OpenTelemetry setup)
> - **infra/**
>   - `infra/k8s/` (Helm chart skeleton tối thiểu cho 1 service + values.yaml)
> - **docs/**
>   - `docs/ARCHITECTURE.md` (ASCII diagram ngắn)
>
> **Yêu cầu chi tiết**:
> - `package.json` root có scripts: `bootstrap` (pnpm i), `build`, `dev`, `lint`, `format`.
> - `Makefile` map ra các lệnh: `bootstrap`, `dev`, `test`, `down`, `logs`.
> - `docker-compose.yml` mount volume dữ liệu, port mapping hợp lý, network chung `auto_net`.
> - `apps/*` có `package.json`, `tsconfig.json`, `src/main.ts`, `src/app.module.ts`, healthcheck `/health`.
> - `libs/common` cung cấp `logger`, `config`, `tracing` (OTel). Các service import được.
>
> **FORMAT TRẢ VỀ**: đúng block `FILE: ...` + code.
>
> ---
>
> ## 1) DB & ERD (PostgreSQL) — Schema + Seed + Migration SQL
> **Mục tiêu**: Sinh schema **PostgreSQL** cho các bounded context (Auth, Garage, Inventory/Marketplace, Orders, Finance, Warranty, System & Audit) **bám sát overview**.
>
> **YÊU CẦU OUTPUT**:
> - `db/schema.sql`: DDL đầy đủ (UUID v7, timestamptz, FK, index, constraints, enum types).
> - `db/seed.sql`: seed dữ liệu tối thiểu: roles/permissions, 1 garage, 1 distributor, 2 users (admin/tech), 5 products, 2 warehouses, 1 vehicle, 1 RO, 1 invoice.
> - `db/migrations/001_init_up.sql`, `db/migrations/001_init_down.sql`
> - `db/README.md`: hướng dẫn chạy `psql` bằng docker-compose để apply schema + seed.
>
> **Bảng chính** (đúng tên ở overview): users, roles, permissions, user_roles, role_permissions, auth_tokens, garages, garage_staff, customers, vehicles, appointments, repair_orders, tasks, service_packages, products, product_media, warehouses, inventory, orders, order_items, price_rules, work_logs, quality_checks, warranty, maintenance_schedule, invoices, payments, expenses, commission_records, audit_logs, system_settings, notifications.
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 2) OpenAPI + GraphQL + AsyncAPI
> **Mục tiêu**: Định nghĩa API bám sát endpoints ở overview.
>
> **YÊU CẦU OUTPUT**:
> - `api/openapi.yaml` (v1): REST endpoints sau
>   - Auth: `/auth/login`, `/auth/register`, `/auth/refresh`, `/users/me`, `/users`, `/users/{id}`
>   - Garage: `/garages`, `/customers`, `/appointments`, `/appointments/{id}`
>   - Repair & Tasks: `/repair-orders`, `/repair-orders/{id}`, `/tasks`, `/tasks/{id}/status`
>   - Marketplace & Inventory: `/products/search`, `/products/{id}`, `/inventory`, `/inventory/{id}`, `/orders`, `/orders/{id}/status`
>   - Finance: `/invoices`, `/invoices/{id}`, `/payments`
>   - Reports: `/reports/sales`, `/reports/inventory`, `/reports/finance`
>   - Chuẩn pagination/filter/sort, error schema, security (Bearer).
> - `api/schema.graphql`: types/inputs/resolvers tương ứng (Relay connections cho list).
> - `api/asyncapi.yaml`: events: `inventory_changed`, `order_status_changed`, `payment_captured`, `repair_order_updated`, `notification_sent`.
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 3) Backend Service Template (NestJS) — Boilerplate chuẩn
> **Mục tiêu**: Tạo **template tái sử dụng** cho mọi service NestJS.
>
> **YÊU CẦU OUTPUT**:
> - `apps/_template-service/` code hoàn chỉnh:
>   - `src/` với `app.module.ts`, `main.ts`, `health.controller.ts`
>   - `src/common/guards`, `src/common/interceptors`, `src/common/filters`
>   - `src/config/` (env validation với `zod`), `src/telemetry/` (OTel init)
>   - `src/example/` (entity + CRUD demo, DTO, controller, service, repo TypeORM)
> - `package.json`, `tsconfig.json`, `jest.config.js`, `.env.example`
> - `Dockerfile`, `docker-compose.override.yml` (chỉ cho dev của service)
> - Test e2e: `test/e2e/app.e2e-spec.ts`
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 4) Auth & RBAC Service (NestJS)
> **Mục tiêu**: Service Auth đầy đủ: đăng ký/đăng nhập, JWT access+refresh, revoke, RBAC, multi-tenant.
>
> **YÊU CẦU OUTPUT**:
> - Thư mục: `apps/auth-service/` với các module: `auth`, `users`, `rbac`, `tokens`, `audit`
> - Endpoints: `/auth/login`, `/auth/register`, `/auth/refresh`, `/auth/logout`, `/users/me`, `/roles`, `/permissions`, `/assign`
> - TypeORM entities: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `AuthToken`, `AuditLog`
> - Guard: `@Permissions('resource:action')`
> - Password: Argon2id; 2FA TOTP (tùy chọn, code sẵn)
> - Test: unit + e2e
> - File config + Dockerfile
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 5) Inventory & Marketplace Service (NestJS + ES + Redis + RabbitMQ)
> **Mục tiêu**: Search sản phẩm, quản lý tồn kho đa kho, đặt hàng, sự kiện đồng bộ.
>
> **YÊU CẦU OUTPUT**:
> - `apps/inventory-service/` modules: `products`, `inventory`, `orders`, `pricing`, `search`, `events`
> - Entities: `Product`, `ProductMedia`, `Warehouse`, `Inventory`, `Order`, `OrderItem`, `PriceRule`
> - Elasticsearch index mapping + indexer (outbox → consumer → ES)
> - Redis cache cho search nóng; Redlock cho cập nhật tồn kho
> - RabbitMQ: publish/consume `product_indexed`, `inventory_changed`, `order_created`
> - API: `/products/search`, `/products/:id`, `/inventory`, `/orders`, `/orders/:id/status`
> - Test: ES query tests + concurrency test trừ tồn kho
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 6) Garage Service — Quy trình sửa chữa (RO)
> **Mục tiêu**: Quy trình RO từ tiếp nhận → báo giá → duyệt → thực hiện → QA → hoàn tất → hóa đơn.
>
> **YÊU CẦU OUTPUT**:
> - `apps/garage-service/` modules: `customers`, `vehicles`, `appointments`, `repair-orders`, `tasks`, `work-logs`, `warranties`
> - Entities: theo overview
> - Trạng thái RO: `DRAFT → QUOTED → APPROVED → IN_PROGRESS → QA → COMPLETED → INVOICED → CLOSED`
> - Rule: ràng buộc tổng giá ≥ parts + labor − discount; lock phụ tùng khi xuất kho
> - Webhook: publish `repair_order_updated`
> - PDF generator: hợp đồng/báo giá (template + i18n)
> - Test e2e full flow
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 7) Finance Service — Invoices, Payments, Reports
> **Mục tiêu**: Hóa đơn, thanh toán, báo cáo doanh thu.
>
> **YÊU CẦU OUTPUT**:
> - `apps/finance-service/` modules: `invoices`, `payments`, `reports`, `tax`
> - Entities: `Invoice`, `Payment`, `Expense`, `CommissionRecord`
> - API: `/invoices`, `/invoices/:id`, `/payments`
> - Webhook: receive `payment_captured` từ mock gateway; verify chữ ký; idempotency
> - Reports: doanh thu theo thời gian/garage/distributor/dòng xe; export CSV
> - Docker compose service: `payment-gateway-mock` (HTTP) để test callback
> - Test: unit + e2e
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 8) Frontend Web (Next.js + Tailwind + shadcn/ui)
> **Mục tiêu**: App web cho Garage & Distributor + Customer Portal.
>
> **YÊU CẦU OUTPUT**:
> - `apps/frontend-web/` cấu trúc Next.js (App Router) + Tailwind + shadcn/ui
> - Pages: `/login`, `/dashboard`, `/marketplace`, `/inventory`, `/appointments`, `/repair-orders/[id]`, `/invoices/[id]`, `/reports`
> - Auth: lưu JWT (httpOnly cookie), refresh flow, RBAC ẩn/hiện menu
> - Data: React Query + axios client, error boundary
> - i18n (vi/en), dark mode
> - Test e2e: Playwright — 1 flow đăng nhập → tìm sản phẩm → tạo order → xem hóa đơn mẫu
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 9) Mobile App (React Native — Expo)
> **Mục tiêu**: App cho Staff (nhận việc, checklist, quét QR, time tracking) & Customer (đặt lịch, theo dõi RO, thanh toán).
>
> **YÊU CẦU OUTPUT**:
> - `apps/mobile-app/` (Expo) với:
>   - Navigation (stack/tab), theming, i18n
>   - Offline storage (MMKV/SQLite)
>   - Push notification (expo-notifications) — mock ở dev
>   - Screens: Staff: Tasks, Scan QR, Work Logs; Customer: Book, Track RO, Invoices
> - API client dùng axios, JWT refresh
> - Test cơ bản (Jest)
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 10) Notification Service (Email/SMS/Push)
> **Mục tiêu**: Gửi thông báo với queue, template, retry, mute preference.
>
> **YÊU CẦU OUTPUT**:
> - `apps/notification-service/` modules: `templates`, `senders`, `queue`, `preferences`
> - Channels: Email (SMTP), SMS (adapter), Push (FCM mock)
> - MJML templates cho: `booking_reminder`, `quotation_ready`, `order_shipped`, `invoice_issued`, `warranty_expiring`
> - Worker tiêu thụ từ RabbitMQ `notification_send`
> - API nhỏ: quản lý preference
> - Test unit cho template rendering
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 11) Security & Compliance
> **Mục tiêu**: Hardening bảo mật, PII encryption, audit.
>
> **YÊU CẦU OUTPUT**:
> - `libs/common/security/` middleware: Helmet, CORS, rate-limit, input validation (zod)
> - PII encryption: TypeORM transformer (AES-256-GCM) cho phone/email trong `User`, `Customer`
> - Audit logger: ghi `who/when/what` (không log secrets/PII), mask dữ liệu
> - Checklists: `.github/SECURITY.md`
> - Tích hợp middleware vào `auth-service`, `garage-service`, `inventory-service`, `finance-service`
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 12) Observability & SRE
> **Mục tiêu**: Telemetry đầy đủ + dashboards + alert.
>
> **YÊU CẦU OUTPUT**:
> - `libs/common/tracing/` cấu hình OpenTelemetry (Node SDK) — auto-instrument http, pg, amqp
> - `infra/otel/otel-collector-config.yaml`
> - `infra/prometheus/prometheus.yml`
> - `infra/grafana/dashboards/*.json` (API latency, error rate, DB slow query, queue lag, cache hit)
> - `infra/grafana/provisioning/*` (datasource + dashboards)
> - Alert rules cơ bản (Prometheus)
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 13) CI/CD & IaC
> **Mục tiêu**: Pipeline build/test/lint → docker build → image scan → deploy Helm. Kèm IaC skeleton.
>
> **YÊU CẦU OUTPUT**:
> - GitHub Actions: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
> - GitLab CI (tùy chọn thêm): `.gitlab-ci.yml`
> - Helm chart skeleton: `infra/helm/<service>/Chart.yaml`, `values.yaml`, `templates/*.yaml`
> - Terraform skeleton: `infra/terraform/modules/*`, `infra/terraform/envs/dev/main.tf` (VPC, EKS stub, RDS stub)
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 14) Data Warehouse & BI
> **Mục tiêu**: Star schema + dbt models stub + ETL tối thiểu.
>
> **YÊU CẦU OUTPUT**:
> - `dw/schema_star.sql`: fact_orders, fact_repair, dim_customer, dim_vehicle, dim_product, dim_time, dim_location
> - `dw/dbt_project/` skeleton với vài model mẫu + `profiles.yml` (comment note)
> - `dw/etl/` — 1 job (Python) đọc từ Postgres → CSV → load vào DW giả lập (Postgres khác) cho demo
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 15) QA — Tests & Quality Gates
> **Mục tiêu**: Thiết lập test đa tầng + quality gates.
>
> **YÊU CẦU OUTPUT**:
> - Jest config chung ở root + per-service
> - E2E backend (supertest) ví dụ cho Auth, Inventory, Garage, Finance
> - Playwright e2e cho `frontend-web` (flow: login → search → order → invoice)
> - Pact contract test demo giữa `frontend-web` (consumer) và `auth-service` (provider)
> - Snyk/trivy config cơ bản cho image scan
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 16) Performance & Load (k6)
> **Mục tiêu**: Kịch bản k6 cho 4 nhóm API theo tỉ lệ lưu lượng (Search 60%, Checkout 10%, View RO 20%, Inventory 10%). Mục tiêu p95 < 300ms với cache hit.
>
> **YÊU CẦU OUTPUT**:
> - `perf/k6/search_marketplace.js`
> - `perf/k6/checkout.js`
> - `perf/k6/view_ro.js`
> - `perf/k6/inventory_api.js`
> - `perf/README.md` hướng dẫn chạy với docker (grafana/k6 extension optional)
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## 17) Documentation & ADR
> **Mục tiêu**: Bộ tài liệu dự án + ADR cho quyết định kiến trúc lớn.
>
> **YÊU CẦU OUTPUT**:
> - `README.md` (root) chi tiết cách chạy toàn hệ thống (docker-compose), URL các service, default accounts
> - `docs/CONTRIBUTING.md`, `docs/CODEOWNERS` (mẫu), `docs/ADR/0001-architecture.md` (microservices, NestJS, ES, RabbitMQ, RBAC, OTel)
> - `docs/RUNBOOK.md` (SRE: cách xử lý sự cố phổ biến)
>
> **FORMAT TRẢ VỀ**: FILE + code.
>
> ---
>
> ## Checklist thực thi (đề xuất)
> 1) Chạy Prompt **0** để tạo monorepo + hạ tầng dev.
> 2) Chạy Prompt **1** để có schema + seed DB (sau đó `psql` apply).
> 3) Chạy Prompt **2** (OpenAPI/GraphQL/AsyncAPI) để ràng buộc API.
> 4) Chạy Prompt **3** (Template) — tham chiếu khi build các service.
> 5) Chạy Prompt **4–7** để sinh code Auth, Inventory, Garage, Finance.
> 6) Chạy Prompt **8–10** để sinh frontend, mobile, notification.
> 7) Chạy Prompt **11–12** để thêm security & observability.
> 8) Chạy Prompt **13–16, 17** để hoàn tất CI/CD, DW/BI, QA, Perf, Docs.
>
> Khi sinh xong, ở root chạy:
> ```bash
> make bootstrap
> docker compose up -d
> make dev
> ```
> Mặc định: Postgres/Redis/RabbitMQ/ES/Kibana/MinIO/Prometheus/Grafana chạy trong docker. Kết nối qua hostname dịch vụ.
