package kimtaewoo.springwallet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.Service.OauthService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.UUID;

@Controller
public class OauthController {

    private OauthService oauthService;

    @Autowired
    public OauthController(OauthService oauthService) {
        this.oauthService = oauthService;
    }


    @GetMapping("/api/auth/accessToken")
    @ResponseBody
    public ResponseEntity reissueAccessToken(HttpServletRequest req, HttpServletResponse res){
        oauthService.reissueAccessToken(req, res);
        return ResponseEntity.ok("ok");
    }
    @GetMapping("/api/auth/google")
    @ResponseBody
    public UUID login(HttpServletResponse res, @RequestParam("code") String code) throws JsonProcessingException {
        UUID uid = oauthService.login(res, code);
        return uid;
    }


    @DeleteMapping("/api/auth")
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
