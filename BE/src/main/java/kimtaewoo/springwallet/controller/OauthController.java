package kimtaewoo.springwallet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import kimtaewoo.springwallet.Service.OauthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class OauthController {

    private OauthService oauthService;

    @Autowired
    public OauthController(OauthService oauthService) {
        this.oauthService = oauthService;
    }

    @GetMapping("/auth/google")
    public void login(@RequestParam("code") String code) throws JsonProcessingException {
        oauthService.login(code);
    }

}
