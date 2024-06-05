package kimtaewoo.springwallet.oauth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.oauth.CustomOAuth2User;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler{
    private final AuthUtil authUtil;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication authentication) throws IOException, ServletException{
        try{
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            String access = authUtil.getAccessToken(oAuth2User.getEmail(), oAuth2User.getName());
            String refresh = authUtil.getRefreshToken();

            ResponseCookie acc = ResponseCookie.from("AccessToken", access)
                    .path("/")
                    .httpOnly(true)
                    .secure(true)
                    .maxAge(60*60*24)
                    .build();
            ResponseCookie ref = ResponseCookie.from("RefreshToken", refresh)
                    .path("/")
                    .httpOnly(true)
                    .secure(true)
                    .maxAge(60*60*24)
                    .build();
            res.addHeader("Set-Cookie", acc.toString());
            res.addHeader("Set-Cookie", ref.toString());
        } catch (Exception e){
            throw e;
        }
    }
}
