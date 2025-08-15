import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    checkout: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    customer_id: 'customer-id',
    items: [
      { product_id: 'product-id', quantity: 1 },
    ],
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post('http://localhost:3000/api/orders', payload, params);
  check(res, { 'status is 201': (r) => r.status === 201 });
  sleep(1);
}
