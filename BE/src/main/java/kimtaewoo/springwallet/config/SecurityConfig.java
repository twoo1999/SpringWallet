package kimtaewoo.springwallet.config;


import kimtaewoo.springwallet.filter.JwtAuthFilter;
import kimtaewoo.springwallet.filter.JwtAuthenticationProcessingFilter;
import kimtaewoo.springwallet.filter.LoggingFilter;
import kimtaewoo.springwallet.oauth.CustomOAuth2UserService;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.repository.RefreshTokenRepository;
import kimtaewoo.springwallet.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {
//    private final CustomOAuth2UserService customOAuth2UserService;
//    private final AuthenticationFailureHandler oAuth2LoginFaliHandler;
//    private final AuthenticationSuccessHandler oAuth2LoginSuccessHandler;
    private final AuthUtil authUtil;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
//    public SecurityConfig(AuthenticationSuccessHandler oAuth2LoginSuccessHandler,
//                          AuthenticationFailureHandler oAuth2LoginFailureHandler,
//                          CustomOAuth2UserService customOAuth2UserService,
//                          JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter){
//        this.oAuth2LoginFaliHandler = oAuth2LoginFailureHandler;
//        this.oAuth2LoginSuccessHandler = oAuth2LoginSuccessHandler;
//        this.customOAuth2UserService = customOAuth2UserService;
//        thi
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .formLogin(login->login.disable())
                .httpBasic(basic->basic.disable())
                .csrf(csrf->csrf.disable())
                .sessionManagement(s->s.sessionCreationPolicy((SessionCreationPolicy.STATELESS)));
//                .authorizeHttpRequests(authrize->authrize
//                        .requestMatchers("/signin", "/login", "/auth/**").permitAll()
//                        .anyRequest().hasRole("USER")
//                );
//                .oauth2Login(o->o
//                        .successHandler(oAuth2LoginSuccessHandler)
//                        .failureHandler(oAuth2LoginFaliHandler)
//                        .userInfoEndpoint(userInfo->userInfo.userService(customOAuth2UserService))
//                );
        http.addFilterAfter(jwtAuthenticationProcessingFilter(), LogoutFilter.class);
        http.addFilterAfter(loggingFilter(), JwtAuthenticationProcessingFilter.class);


//                .csrf(csrf->csrf.disable())
//                .httpBasic(basic->basic.disable())
//                .authorizeHttpRequests(authrize->authrize
//                        .requestMatchers("/signin", "/login", "/auth/**").permitAll()
//                        .anyRequest().hasRole("USER")
//                )
//                .addFilterBefore(new JwtAuthFilter(authUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter(){
        JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter = new JwtAuthenticationProcessingFilter(authUtil, memberRepository, refreshTokenRepository);
        return jwtAuthenticationProcessingFilter;
    }

    @Bean
    public LoggingFilter loggingFilter(){
        LoggingFilter loggingFilter = new LoggingFilter();
        return loggingFilter;
    }

}
