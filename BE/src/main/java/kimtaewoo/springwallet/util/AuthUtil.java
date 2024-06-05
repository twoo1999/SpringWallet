package kimtaewoo.springwallet.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Member;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class AuthUtil {


    @Value("${spring.jwt.secret.access}")
    private String SECRET_ACCESS;

    @Value("${spring.jwt.secret.refresh}")
    private String SECRET_REFRESH;

    private int ACCESS_TOKEN_DURATION = 60*60;
    private int REFRESH_TOKEN_DURATION = 60*60*24;
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

    public boolean validateToken(String token, String type){
        try{
            if(type.equals("RefreshToken")){
                Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_REFRESH).parseClaimsJws(token);
            } else if(type.equals("AccessToken")){
                Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_ACCESS).parseClaimsJws(token);
            }
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public String getRefreshToken(){
        String token = Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, SECRET_REFRESH)
                .compact();

        return token;
    }
    public void setAccessTokenToCookie(HttpServletResponse res, String acc){
        setCookie(res, "AccessToken", acc, "/", true, true, ACCESS_TOKEN_DURATION);
    }

    public void setRefreshTokenToCookie(HttpServletResponse res, String ref){
        setCookie(res, "RefreshToken", ref, "/", true, true, REFRESH_TOKEN_DURATION);
    }

    public void setCookie(HttpServletResponse res, String key, String value, String path, boolean httpOnly, boolean secure, int maxAge){
        ResponseCookie ck = ResponseCookie.from(key, value)
                .path(path)
                .httpOnly(httpOnly)
                .secure(secure)
                .maxAge(maxAge)
                .build();
        res.addHeader("Set-Cookie", ck.toString());
    }


}
