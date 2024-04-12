package kimtaewoo.springwallet.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class AuthUtil {


    @Value("${spring.jwt.secret.access}")
    private String SECRET_ACCESS;
    public String getCookie(Cookie[] cookis, String name) {
        for (Cookie c : cookis) {
            if (c.getName().equals(name)) {
                return c.getValue();
            }
        }
        return null;
    }

    public String getAccessToken(String email, String name){
        Claims claims = Jwts.claims();
        claims.put("email", email);
        claims.put("name", name);
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, SECRET_ACCESS)
                .compact();

        return token;
    }

    public String decodePayload(String encodedPayload){
        Base64.Decoder decoder = Base64.getDecoder();
        return new String(decoder.decode(encodedPayload));
    }

    public AccessTokenPayload getAccessTokenPayload(String payloadString) throws Exception {
        ObjectMapper om = new ObjectMapper();
        return om.readValue(payloadString, AccessTokenPayload.class);
    }
}
