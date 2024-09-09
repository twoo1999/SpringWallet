package kimtaewoo.springwallet.controller;

import kimtaewoo.springwallet.Service.CategoryService;
import kimtaewoo.springwallet.Service.ChatgptService;
import kimtaewoo.springwallet.dto.openai.CompletionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Controller
public class ChatgptController {
    private final ChatgptService chatgptService;

    @Autowired
    public ChatgptController(ChatgptService chatgptService) {
        this.chatgptService = chatgptService;
    }

    @PostMapping("/api/legacyPrompt")
    public ResponseEntity<Map<String, Object>> selectLegacyPrompt(@RequestBody CompletionDto completionDto) {
        Map<String, Object> result = chatgptService.legacyPrompt(completionDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
