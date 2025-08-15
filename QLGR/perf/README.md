# Performance Testing with k6

## How to run

```bash
docker run -i --rm -v $PWD:/scripts grafana/k6 run /scripts/perf/k6/search_marketplace.js
docker run -i --rm -v $PWD:/scripts grafana/k6 run /scripts/perf/k6/checkout.js
docker run -i --rm -v $PWD:/scripts grafana/k6 run /scripts/perf/k6/view_ro.js
docker run -i --rm -v $PWD:/scripts grafana/k6 run /scripts/perf/k6/inventory_api.js
```

## Scenario ratios

- Search Marketplace: 60%
- Checkout: 10%
- View Repair Order: 20%
- Inventory API: 10%

## Target

- p95 latency < 300ms (with cache hit)
- Use Grafana for dashboard (optional: k6 extension)
