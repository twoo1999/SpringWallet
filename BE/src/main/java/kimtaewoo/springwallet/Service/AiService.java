package kimtaewoo.springwallet.Service;

import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;

public interface AiService {
    Analysis analysis(AiAnalysisReqDto req);
}
