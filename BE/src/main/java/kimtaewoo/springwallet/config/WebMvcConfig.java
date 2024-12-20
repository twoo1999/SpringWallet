package kimtaewoo.springwallet.config;

import kimtaewoo.springwallet.intercepter.AuthIntercepter;
import kimtaewoo.springwallet.resolver.AuthUserResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.*;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    private AuthIntercepter authIntercepter;
    private AuthUserResolver authUserResolver;
    @Value("${spring.base_url}")
    String BASE_URL;
    public WebMvcConfig(AuthIntercepter authIntercepter, AuthUserResolver authUserResolver ) {
        this.authIntercepter = authIntercepter;
        this.authUserResolver = authUserResolver;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(BASE_URL)
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .allowCredentials(true);
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(authIntercepter).excludePathPatterns("/auth/google");
//    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authUserResolver);
    }
}
