package kimtaewoo.springwallet.controller;

import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.Service.AiService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Controller
public class AiController {
    private final AiService aiService;


    @Autowired
    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/api/ai/gemini")
    @ResponseBody
    public Analysis gemini(AccessTokenPayload ap, @RequestBody AiAnalysisReqDto req) {
        System.out.println("분석 시작");
        Analysis re = aiService.analysis(ap, req);
        return re;
    }

    @GetMapping("/api/ai")
    @ResponseBody
    public List<Analysis> getAnalysisList(AccessTokenPayload ap) {
        return aiService.getAnalysisList(ap);
    }


    @GetMapping(value = "/api/ai/emitter", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter create() {
        System.out.println("sse 생성");
        return aiService.createEmitter();
    }
//
//    @PostMapping(value = "/api/ai/emitter", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public SseEmitter getEmitter() {
////        return aiService.getEmitter(uid);
//    }

//    private final VertexAiGeminiChatModel chatModel;
//
//    @Autowired
//    public AiController(VertexAiGeminiChatModel chatModel){
//        this.chatModel = chatModel;
//    }
//
//
//    @GetMapping("/api/ai/generateStream")
//    @ResponseBody
//    public Flux<String> generateStream(@RequestParam(value = "message", defaultValue = "한국에 사는 김태우씨에 대해서 설명해줘?") String message) {
////        System.out.println("분석");
//        Prompt prompt = new Prompt(new UserMessage(message));
////        Prompt prompt = getPr
//        return chatModel.stream("Who are you")
//                .filter(chatReponse->chatReponse);
////        return chatModel.stream(prompt);
//    }

}
