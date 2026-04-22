import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    'default': {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      preAllocatedVUs: 10,
      stages: [
        { target: 6, duration: '10s' },

        { target: 6, duration: '40s' },

        { target: 0, duration: '10s' },
      ],
    }
  }
};

export default function() {
  let res = http.get('https://quickpizza.grafana.com');
  check(res, { "status is 200": (res) => res.status === 200 });
}


