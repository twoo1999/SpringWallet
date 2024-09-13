package kimtaewoo.springwallet.controller;

import kimtaewoo.springwallet.Service.CategoryService;
import kimtaewoo.springwallet.Service.ChatgptService;
import kimtaewoo.springwallet.dto.openai.CompletionDto;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Map;

@Controller
public class ChatgptController {
//    private final ChatgptService chatgptService;

//    @Autowired
//    public ChatgptController(ChatgptService chatgptService) {
//        this.chatgptService = chatgptService;
//    }

//    private final OpenAiChatModel openAiChatModel;
    private final VertexAiGeminiChatModel chatModel;
    @Autowired

    public ChatgptController(VertexAiGeminiChatModel chatModel) {
        this.chatModel = chatModel;
    }

//    @PostMapping("/api/ai/legacyPrompt")
//    public ResponseEntity<Map<String, Object>> selectLegacyPrompt(@RequestBody CompletionDto completionDto) {
//        Map<String, Object> result = chatgptService.legacyPrompt(completionDto);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

    @GetMapping("/api/ai/gemini")
    public void gemini(){
        System.out.println("ai 시작");
        String asnwer = chatModel.call("넌 누구야?");
        System.out.println("ai 끝");
//        return Map.of("generation", chatModel.call(message));
    }
}
