package kimtaewoo.springwallet.controller;


import kimtaewoo.springwallet.Service.MethodService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Method;
import kimtaewoo.springwallet.dto.method.CreateMethodReqDto;
import kimtaewoo.springwallet.dto.method.DeleteMethodReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MethodController {
    private final MethodService methodService;

    @Autowired
    public MethodController(MethodService methodService) {
        this.methodService = methodService;
    }

    @GetMapping("/api/method")
    @ResponseBody
    public List<Method> getMethod(AccessTokenPayload atp) {
        return methodService.getCategoryByMemberId(atp);
    }

    @PostMapping("/api/method")
    @ResponseBody
    public ResponseEntity createMethod(AccessTokenPayload atp, @RequestBody CreateMethodReqDto method) {
        List<Method> result = methodService.saveAll(atp, method);
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/api/method")
    @ResponseBody
    public ResponseEntity deleteMethod(AccessTokenPayload atp, @RequestBody DeleteMethodReqDto deleteMethodReqDto){
        List<Long> result = methodService.deleteByIdAll(atp, deleteMethodReqDto);
        return ResponseEntity.ok(result);
    }
}
