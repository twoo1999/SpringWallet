package kimtaewoo.springwallet.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.*;
import kimtaewoo.springwallet.domain.enumClass.Role;
import kimtaewoo.springwallet.domain.enumClass.SocialType;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.repository.RefreshTokenRepository;
import kimtaewoo.springwallet.util.AuthUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthUtil authUtil;

    public OauthService(MemberRepository memberRepository, RefreshTokenRepository refreshTokenRepository, AuthUtil authUtil) {
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authUtil = authUtil;
    }


    public void reissueAccessToken(HttpServletRequest req, HttpServletResponse res){
        Cookie[] cookies = req.getCookies();
        String ref = authUtil.getCookie(cookies, "RefreshToken");
        System.out.println(ref);
        RefreshToken newRef = refreshTokenRepository.findByToken(ref).get();
        UUID id = newRef.getId();
        Member m = memberRepository.findById(id).get();
        authUtil.setAccessTokenToCookie(res, authUtil.getAccessToken(id, m.getEmail(), m.getName()));
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
        UUID id;
        Optional<Member> m = memberRepository.findByEmail(email);
        if (m.isEmpty()) {
            Member member = Member.builder()
                    .email(email)
                    .name(name)
                    .role(Role.USER)
                    .socialtype(SocialType.GOOGLE)
                    .build();

//            Member member = new Member();
//            member.setEmail(email);
//            member.setName(name);
            Member newMember = memberRepository.save(member);
            id = newMember.getId();
        } else{
            id = m.get().getId();
        }
        String accessToken = this.getAccessToken(email, name, id);
        String refreshToken = this.getRefreshToken();
        RefreshToken ref = new RefreshToken(refreshToken, id);
        refreshTokenRepository.save(ref);
        String[] tokens = {accessToken, refreshToken};
        return tokens;
    }

    public String getAccessToken(String email, String name, UUID id){
        Claims claims = Jwts.claims();
        claims.put("email", email);
        claims.put("name", name);
        claims.put("id", id);
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

            ResponseEntity<String> responseEntity = rt.postForEntity(GOOGLE_TOKEN_URL, params, String.class);
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                return responseEntity.getBody();
            }
            return null;
        } catch (Exception e) {
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
        return om.readValue(jsonString, GoogleOauthAccessToken.class);
    }


    public void deleteRefreshToken(String token){
        refreshTokenRepository.deleteByRefreshToken(token);
    }
}
