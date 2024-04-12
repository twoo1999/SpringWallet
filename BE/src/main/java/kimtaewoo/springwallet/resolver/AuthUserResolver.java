package kimtaewoo.springwallet.resolver;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.AuthUser;
import kimtaewoo.springwallet.domain.GoogleOauthUserInfo;
import kimtaewoo.springwallet.util.AuthUtil;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AuthUserResolver implements HandlerMethodArgumentResolver {

    private AuthUtil authUtil;

    public AuthUserResolver(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(AccessTokenPayload.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory) throws Exception {

        HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        Cookie[] cookies = httpServletRequest.getCookies();
        String token = authUtil.getCookie(cookies, "AccessToken");
        String encodedPayload = token.split("\\.")[1];
        String decodedPayload = authUtil.decodePayload(encodedPayload);
        AccessTokenPayload acp = authUtil.getAccessTokenPayload(decodedPayload);

       return acp;
    }
}
