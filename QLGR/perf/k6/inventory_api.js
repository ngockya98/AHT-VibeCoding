import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    inventory: {
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
  const res = http.get('http://localhost:3000/api/inventory');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
