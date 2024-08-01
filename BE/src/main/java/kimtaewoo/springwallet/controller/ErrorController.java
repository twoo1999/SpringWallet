package kimtaewoo.springwallet.controller;

import jakarta.servlet.http.HttpServletRequest;
import kimtaewoo.springwallet.exception.CustomException;
import kimtaewoo.springwallet.exception.ErrorCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ErrorController {

    @GetMapping("/error")
    @ResponseBody
    public String errorHandler(HttpServletRequest req) {
        String errorCode = (String) req.getAttribute("errorcode");
        return errorCode;
    }
}
