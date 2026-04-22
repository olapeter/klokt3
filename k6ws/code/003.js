import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1
};

export function setup(){
  /** Dette er et ekstra steg spesifikt for dette APIet */
  const csrfres = http.post(`https://quickpizza.grafana.com/api/csrf-token`, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  check(csrfres, { "csrf-token status is 200": (res) => res.status === 200 });

  const loginData = {
    username: "default",
    password: "12345678",
    csrf: csrfres.cookies.csrf_token[0].value,
  };
  const loginres = http.post(
    `https://quickpizza.grafana.com/api/users/token/login`,
    JSON.stringify(loginData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  check(loginres, { "login status is 200": (res) => res.status === 200 });

  /** This is the magic - det som returners her kommer automatisk inn i default-funksjonen */
  return {access_token: loginres.json().token}

}

export default function(data) {

  console.log(data.access_token)
  sleep(1)
  
  /*
    let res = http.get('https://quickpizza.grafana.com/api/ratings', 
      {
        headers: {
          Authorizaton: data.access_token
        }
      });
    check(res, { "status is 200": (res) => res.status === 200 });
  */
}


