package kimtaewoo.springwallet.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import kimtaewoo.springwallet.util.AuthUtil;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtAuthFilter extends GenericFilterBean {
    private AuthUtil authUtil;

    public JwtAuthFilter(AuthUtil authUtil){
        this.authUtil = authUtil;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpReq = (HttpServletRequest) req;

        String[] url = httpReq.getRequestURI().split("/");
        if(url[1].equals("auth")){
            filterChain.doFilter(req, res);
            return;
        }

        String token = authUtil.getCookie(httpReq.getCookies(), "AccessToken");
        if(token == null || !authUtil.validateToken(token, "AceessToken")){
            throw new IOException("없음");
        }

        filterChain.doFilter(req, res);

    }
}
