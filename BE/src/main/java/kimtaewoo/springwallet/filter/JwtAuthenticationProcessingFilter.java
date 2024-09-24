package kimtaewoo.springwallet.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.RefreshToken;
import kimtaewoo.springwallet.exception.ErrorCode;
import kimtaewoo.springwallet.exception.ErrorResponseEntity;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.repository.RefreshTokenRepository;
import kimtaewoo.springwallet.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
ㄲ    private static final String[] NO_CHECK_URL = {"/api/auth/google", "/api/auth/accessToken", "/api/ai/gemini", "/api/ai/generateStream", "/api/ai", "/api/ai/emitter"};

    private final AuthUtil authUtil;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException{
        for(String url : NO_CHECK_URL){
            if(req.getRequestURI().equals(url)){
                filterChain.doFilter(req, res);
                return;
            }
        }
        String acc = authUtil.getCookie(req.getCookies(), "AccessToken");
        String ref = authUtil.getCookie(req.getCookies(), "RefreshToken");
        if(acc != null){
            if(authUtil.validateToken(acc, "AccessToken")){
                filterChain.doFilter(req, res);
                return;
            } else{
                ErrorCode e = ErrorCode.NOT_VALID_TOKEN;
                ResponseEntity<ErrorResponseEntity> err = ErrorResponseEntity.toResposeEntity(e);
                setResponse(res, e);
                return;
            }
        }
        // 재발급
        if (acc == null && ref != null) {
            // acc 재발급
            ErrorCode e = ErrorCode.EXPIRED_ACCEESS_TOKEN;
            setResponse(res, e);
            return;
        }

        if(ref == null){
            ErrorCode e = ErrorCode.EXPIRED_REFRESH_TOKEN;
            setResponse(res, e);
        }
    }

    public void setResponse(HttpServletResponse res, ErrorCode e) throws IOException{
        res.setStatus(e.getHttpStatus().value());
        res.setContentType("application/json");
        res.getWriter().write(ErrorResponseEntity.toSerializedString(e));
    }
}
