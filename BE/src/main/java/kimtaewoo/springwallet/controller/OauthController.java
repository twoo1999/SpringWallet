package kimtaewoo.springwallet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.Service.OauthService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.dto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OauthController {

    private OauthService oauthService;

    @Autowired
    public OauthController(OauthService oauthService) {
        this.oauthService = oauthService;
    }


    @GetMapping("/auth/accessToken")
    @ResponseBody
    public ResponseEntity reissueAccessToken(HttpServletRequest req, HttpServletResponse res){
        oauthService.reissueAccessToken(req, res);
        return ResponseEntity.ok("ok");
    }
    @GetMapping("/auth/google")
    @ResponseBody
    public LoginDto login(HttpServletResponse res, @RequestParam("code") String code) throws JsonProcessingException {
        String[] tokens = oauthService.login(code);
        ResponseCookie acc = ResponseCookie.from("AccessToken", tokens[0])
                .path("/")
                .httpOnly(true)
                .secure(true)
                .maxAge(60*60)
                .build();
        ResponseCookie ref = ResponseCookie.from("RefreshToken", tokens[1])
                .path("/")
                .httpOnly(true)
                .secure(true)
                .maxAge(60*60*24)
                .build();
        res.addHeader("Set-Cookie", acc.toString());
        res.addHeader("Set-Cookie", ref.toString());
        LoginDto response = new LoginDto();
        return response;
    }


    @DeleteMapping("/auth")
    @ResponseBody
    public ResponseEntity logout(HttpServletRequest req, HttpServletResponse res, AccessTokenPayload ap){
        Cookie[] token =  req.getCookies();
        for(Cookie val : token){
            if(val.getName().equals("RefreshToken")){
                oauthService.deleteRefreshToken(val.getValue());

                ResponseCookie acc = ResponseCookie.from("AccessToken", "")
                        .path("/")
                        .httpOnly(true)
                        .secure(true)
                        .maxAge(0)
                        .build();
                ResponseCookie ref = ResponseCookie.from("RefreshToken", "")
                        .path("/")
                        .httpOnly(true)
                        .secure(true)
                        .maxAge(0)
                        .build();
                res.addHeader("Set-Cookie", acc.toString());
                res.addHeader("Set-Cookie", ref.toString());
                return ResponseEntity.ok("ok");
            }
        }
        return ResponseEntity.ok("ok");

    }





}
