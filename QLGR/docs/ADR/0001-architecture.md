# ADR-0001: Architecture Decision Record

## Context

- Microservices architecture for automotive service management.
- Backend: NestJS, PostgreSQL, Redis, RabbitMQ, Elasticsearch, MinIO.
- Frontend: Next.js, Tailwind, shadcn/ui.
- Mobile: React Native (Expo).
- Auth: JWT, RBAC, optional OAuth2.
- Infra: Docker, Kubernetes (Helm), Terraform, GitHub Actions/GitLab CI.
- Observability: OpenTelemetry, Prometheus, Grafana, Loki.
- BI/ETL: dbt, DW star schema, optional Airflow/Singer.

## Decision

- Use NestJS for all backend services for consistency and modularity.
- Each bounded context is a separate service (Auth, Garage, Inventory, Finance, Notification).
- Use PostgreSQL for transactional data, Redis for cache, RabbitMQ for async events.
- Elasticsearch for product search and analytics.
- MinIO for object storage (media, docs).
- RBAC enforced via roles/permissions, JWT for stateless auth.
- OpenTelemetry for distributed tracing, Prometheus/Grafana for metrics and dashboards.
- CI/CD via GitHub Actions and GitLab CI; deploy via Helm charts.
- Data warehouse uses star schema, dbt for modeling, ETL via Python.

## Consequences

- Enables scalable, observable, and secure platform.
- Clear separation of concerns and extensibility.
- Requires orchestration and monitoring for reliability.
