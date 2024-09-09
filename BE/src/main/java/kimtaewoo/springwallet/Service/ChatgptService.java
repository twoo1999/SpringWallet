package kimtaewoo.springwallet.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kimtaewoo.springwallet.config.ChatgptConfig;
import kimtaewoo.springwallet.dto.openai.CompletionDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatgptService {
    private final ChatgptConfig chatgptConfig;

    public ChatgptService(ChatgptConfig chatgptConfig) {
        this.chatgptConfig = chatgptConfig;
    }

    @Value("${openai.url.legacy_prompt}")
    private String promptUrl;

    public Map<String, Object> legacyPrompt(CompletionDto completionDto) {
        HttpHeaders headers = chatgptConfig.httpHeaders();

        HttpEntity<CompletionDto> reqestEntity = new HttpEntity<>(completionDto, headers);
        ResponseEntity<String> response = chatgptConfig.restTemplate().exchange(promptUrl, HttpMethod.POST, reqestEntity, String.class);

        Map<String, Object> resultMap = new HashMap<>();

        try{
            ObjectMapper om = new ObjectMapper();
            resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
        } catch (JsonProcessingException e){
            System.out.println("JsonMappingException :: " + e.getMessage());
        }catch (RuntimeException e) {
            System.out.println("RuntimeException :: " + e.getMessage());
        }

        return resultMap;
    }

}
