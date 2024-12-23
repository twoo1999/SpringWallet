import http from 'k6/http';
import { check, sleep } from 'k6';
import {encode} from './util.js'
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 1000,
  duration: '10s',
};

export function setup(){
  const tokens = Array(1000).fill().map((v, i)=>{
    const data = {
      "id": `${uuidv4()}`,
      "email" : `test${i}@test.com`,
      "name": `test${i}`,
      "role": "GUEST"
    }
    return encode(data, "testaccess");

  });
  return {tokens};
}


export default function({tokens}) {
  const token = tokens[__VU-1];

  const data = {
    item : "item",
    amount : 1,
    categoryId: 1,
    methodId: 1,
    timestamp: '2024-12-20',
    memo: "memo1"
  }
  const rand = randomIntBetween(1, 10);

  const n = 0
  if(rand <= n){
    const response = http.get("http://localhost:8080/test/api/record?year=2024&month=10", {
      headers: {
        'Cookie' : `AccessToken=${token};`
      }
    });
    check(response, {
      "is status 200" :(r) => r.status === 200,``
    })
  } else{

    const response = http.post("http://localhost:8080/api/record", JSON.stringify(data),{
      headers: {
        'Cookie' : `AccessToken=${token};`,
        'Content-Type': 'application/json'
      }
    });
    check(response, {
      "is status 200" :(r) => r.status === 200,
    })
  }

  sleep(1);
  

}
