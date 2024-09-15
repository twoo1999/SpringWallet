package kimtaewoo.springwallet.controller;

import kimtaewoo.springwallet.Service.AiService;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AiController {
    private final AiService aiService;
    @Autowired
    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/api/ai/gemini")
    @ResponseBody
    public Analysis gemini(@RequestBody AiAnalysisReqDto req){
        Analysis re = aiService.analysis(req);
        return re;
    }
}
