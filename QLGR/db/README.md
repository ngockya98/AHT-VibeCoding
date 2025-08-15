# DB Schema & Seed

## Apply schema & seed using docker-compose

```bash
# Enter postgres container
docker compose exec postgres bash

# Inside container, run:
psql -U postgres -d automotive -f /db/schema.sql
psql -U postgres -d automotive -f /db/seed.sql
```

## Migrations

```bash
psql -U postgres -d automotive -f /db/migrations/001_init_up.sql
psql -U postgres -d automotive -f /db/migrations/001_init_down.sql
```
