import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    view_ro: {
      executor: 'constant-arrival-rate',
      rate: 20,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/repair-orders/1');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
