package kimtaewoo.springwallet.dto.openai;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompletionDto {
    private String model;
    private String prompt;
    private float temp = 1;
    private int maxTokens = 16;

    @Builder
    public CompletionDto(String model, String prompt, float temp, int maxTokens) {
        this.model = model;
        this.prompt = prompt;
        this.temp = temp;
        this.maxTokens = maxTokens;
    }
}
