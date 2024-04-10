package kimtaewoo.springwallet.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kimtaewoo.springwallet.domain.GoogleOauthAccessToken;
import kimtaewoo.springwallet.domain.GoogleOauthUserInfo;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class OauthService {

    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    @Value("${oauth.google.client_id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${oauth.google.client_secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${oauth.google.redirect_url}")
    private String REDIREC_URL;
    @Value("${spring.jwt.secret.access}")
    private String SECRET_ACCESS;
    @Value("${spring.jwt.secret.refresh}")
    private String SECRET_REFRESH;

    private final MemberRepository memberRepository;

    public OauthService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public String[] login(String code) throws JsonProcessingException {
        String response = this.getAccessTokenFromGoogle(code);

        GoogleOauthAccessToken at = this.getToken(response);
        String idToken = at.getId_token();
        String encodedPayload = idToken.split("\\.")[1];
        String idTokenPayload = this.decodePayload(encodedPayload);
        GoogleOauthUserInfo userInfo = this.getUserInfo(idTokenPayload);
        String email = userInfo.getEmail();
        String name = userInfo.getName();
        if (memberRepository.findByEmail(email).isEmpty()) {
            Member newMember = new Member();
            newMember.setEmail(email);
            newMember.setName(name);
            Member m = memberRepository.save(newMember);
        }

        String accessToken = this.getAccessToken(email, name);
        String refreshToken = this.getRefreshToken();
        System.out.println("acc " + accessToken);
        System.out.println("re " + refreshToken);
        String[] tokens = {accessToken, refreshToken};
        return tokens;
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
    public String getRefreshToken(){
        String token = Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, SECRET_REFRESH)
                .compact();

        return token;
    }
    public String getAccessTokenFromGoogle(String code) {
        try {
            RestTemplate rt = new RestTemplate();

            Map<String, String> params = new HashMap<>();

            params.put("code", code);
            params.put("client_id", GOOGLE_CLIENT_ID);
            params.put("client_secret", GOOGLE_CLIENT_SECRET);
            params.put("redirect_uri", REDIREC_URL);
            params.put("grant_type", "authorization_code");

            System.out.println(GOOGLE_CLIENT_ID);
            System.out.println(GOOGLE_CLIENT_SECRET);
            System.out.println(REDIREC_URL);
            System.out.println(code);
            ResponseEntity<String> responseEntity = rt.postForEntity(GOOGLE_TOKEN_URL, params, String.class);
            System.out.println("3");
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                return responseEntity.getBody();
            }
            return null;
        } catch (Exception e) {
            System.out.println("!!!");
            System.out.println(e);
        }
        return null;

    }

    public String decodePayload(String encodedPayload){
        Base64.Decoder decoder = Base64.getDecoder();
        return new String(decoder.decode(encodedPayload));
    }

    public GoogleOauthUserInfo getUserInfo(String jsonString) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        return om.readValue(jsonString, GoogleOauthUserInfo.class);
    }

    public GoogleOauthAccessToken getToken(String jsonString) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        System.out.println("DAWDAWDAWD");
        System.out.println(jsonString);
        return om.readValue(jsonString, GoogleOauthAccessToken.class);
    }

}
