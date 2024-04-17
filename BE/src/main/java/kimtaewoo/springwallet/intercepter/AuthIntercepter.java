package kimtaewoo.springwallet.intercepter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.ErrorResponseEntity;
import kimtaewoo.springwallet.exception.CustomException;
import kimtaewoo.springwallet.exception.ErrorCode;
import kimtaewoo.springwallet.util.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthIntercepter implements HandlerInterceptor {


    private AuthUtil authUtil;

    public AuthIntercepter(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception{
        if (req.getMethod().equals("OPTIONS")) {
            return true;
        }

        Cookie[] cookies = req.getCookies();
        if (cookies == null) {
            ErrorResponseEntity er = new ErrorResponseEntity(HttpStatus.BAD_REQUEST.value(),HttpStatus.BAD_REQUEST.name() ,"AUTH-001", "유효하지 않는 토큰입니다.");
            String c = new ObjectMapper().writeValueAsString(er);
            res.setStatus(HttpStatus.BAD_REQUEST.value());
            res.setContentType("application/json");
            res.setContentLength(c.length());
            res.getOutputStream().write(c.getBytes());
            return false;
        }
        if (authUtil.getCookie(cookies, "AccessToken") == null) {
            ErrorResponseEntity er = new ErrorResponseEntity(HttpStatus.BAD_REQUEST.value(),HttpStatus.BAD_REQUEST.name() ,"0002", "만료된 토큰입니다.");
            String c = new ObjectMapper().writeValueAsString(er);
            res.setStatus(HttpStatus.BAD_REQUEST.value());
            res.setContentType("application/json");
            res.setContentLength(c.length());
            res.getOutputStream().write(c.getBytes());
            return false;
        }
        System.out.println(authUtil.getCookie(cookies, "AccessToken"));
        return true;
    }
}
