import http from 'k6/http';
import { check, sleep } from 'k6';
import {encode} from './util.js'
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  vus: 10,
  duration: '5s',
};

export function setup(){
  const tokens = Array(10).fill().map((v, i)=>{
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


  const response = http.get("http://localhost:8080/test/api/record", {
    headers: {
      'Cookie' : `AccessToken=${token};`
    }
  });
  check(response, {
    "is status 200" :(r) => r.status === 200,
  })

}
