package kimtaewoo.springwallet.controller;

import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.Service.AiService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@Slf4j
public class AiController {
    private final AiService aiService;


    @Autowired
    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/api/ai/gemini")
    @ResponseBody
    public Analysis gemini(AccessTokenPayload ap, @RequestBody AiAnalysisReqDto req) {
        log.info("Info : 분석 요청 ");
        Analysis re = aiService.analysis(ap, req);
        return re;
    }

    @GetMapping("/api/ai")
    @ResponseBody
    public List<Analysis> getAnalysisList(AccessTokenPayload ap) {
        return aiService.getAnalysisList(ap);
    }


    @GetMapping(value = "/api/ai/emitter", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter create(AccessTokenPayload ap) {
        return aiService.createEmitter(ap);
    }

    @GetMapping(value = "/api/ai/emitter/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter isExist(@PathVariable("id") UUID id, AccessTokenPayload ap) {
        Optional<SseEmitter> e = aiService.getEmitter(id);
        if (e.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        } else{
            return aiService.createEmitter(ap);
        }

    }

    @GetMapping("/api/member/token")
    public ResponseEntity<Integer> getAnalysisToken(AccessTokenPayload ap){
        int remainToken = aiService.getToken(ap.getId()).get();
        return ResponseEntity.ok(remainToken);
    }



}
