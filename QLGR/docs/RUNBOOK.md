# SRE Runbook

## Common Issues

### 1. Service Down

- Check logs: `make logs`
- Restart service: `docker compose restart <service>`
- Check health endpoint: `/health`

### 2. Database Connection Error

- Ensure `postgres` is running: `docker compose ps`
- Check env variables in `.env.example`
- Check network connectivity

### 3. High Latency

- Check Grafana dashboard for p95 latency
- Inspect Redis cache hit rate
- Scale service via Helm values

### 4. Queue Lag

- Check RabbitMQ management UI (`localhost:15672`)
- Inspect queue metrics in Grafana

### 5. Authentication Issues

- Check JWT secret in `.env.example`
- Inspect Auth service logs

### 6. Data Sync/ETL Failure

- Check ETL job logs
- Validate source/destination DB connectivity

## Emergency Contacts

- SRE: sre@automotive-platform.local
- Security: security@automotive-platform.local
