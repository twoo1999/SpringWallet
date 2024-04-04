package kimtaewoo.springwallet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class OauthController {

    @GetMapping("/auth/google")
    public void googleOauth(@RequestParam("code") String code) {
        System.out.println(code);
    }
}
