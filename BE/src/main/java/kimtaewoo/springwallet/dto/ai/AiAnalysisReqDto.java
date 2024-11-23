package kimtaewoo.springwallet.dto.ai;

import kimtaewoo.springwallet.domain.enumClass.analysisType;
import lombok.*;
import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class AiAnalysisReqDto {
    private LocalDate start;
    private LocalDate end;
    private String type;
}
