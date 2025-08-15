# Automotive Service Management Platform

## Quick Start

```bash
make bootstrap
docker compose up -d
make dev
```

## How to run locally

1. **Install dependencies**
   ```bash
   make bootstrap
   ```

2. **Start all infrastructure and backend/frontend services**
   ```bash
   docker compose up -d
   ```

3. **Start development servers**
   ```bash
   make dev
   ```

4. **Run tests**
   ```bash
   make test
   ```

5. **Stop all services**
   ```bash
   make down
   ```

6. **View logs**
   ```bash
   make logs
   ```

## Service URLs

- Auth: http://localhost:3001
- Garage: http://localhost:3002
- Inventory: http://localhost:3003
- Finance: http://localhost:3004
- Frontend: http://localhost:3000
- Notification: http://localhost:3006
- Grafana: http://localhost:3005
- Prometheus: http://localhost:9090
- Kibana: http://localhost:5601

## Default Accounts

- admin: admin@example.com / admin123
- technician: tech@example.com / tech123

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [ADR](docs/ADR/0001-architecture.md)
- [Runbook](docs/RUNBOOK.md)
- [Contributing](docs/CONTRIBUTING.md)

## Notes

- All services connect via docker-compose hostnames.
- See `.env.example` for environment configuration.
- For troubleshooting, see [docs/RUNBOOK.md](docs/RUNBOOK.md).
