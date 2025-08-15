import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    search: {
      executor: 'constant-arrival-rate',
      rate: 60,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/products/search?q=oil');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
