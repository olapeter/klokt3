import { sleep} from 'k6';

export const options = {
  scenarios: {
    ein: {
      exec: 's1',
      executor: 'per-vu-iterations',
      vus: 2,
      iterations: 2
    },
    zwei: {
      exec: 's2',
      executor: 'shared-iterations',
      vus: 1,
      iterations: 2
    }
  }
};

export function s1(){
  console.log('s1', "vu:", __VU, "iter:", __ITER)
  sleep(1)
}

export function s2(){
  console.log('s2', "vu:", __VU, "iter:", __ITER)
  sleep(2)
}


