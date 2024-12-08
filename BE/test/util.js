import encoding from "k6/encoding"
import crypto from 'k6/crypto'
const sign = (data, alg, secret)=>{
    const hasher = crypto.createHMAC(alg, secret);
    hasher.update(data);

    return hasher.digest("base64").replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}

export const encode = (payloadData, secret) =>{
    const headerData = {
        "alg": "HS256",
        "typ": "JWT"
    }
    
    const header = encoding.b64encode(JSON.stringify(headerData), "rawurl");
    
    const payload = encoding.b64encode(JSON.stringify(payloadData), "rawurl");
    
    const sig = sign(header+"."+payload, "sha256", secret);

    return [header, payload, sig].join(".");
}




