package kimtaewoo.springwallet.Service;

import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;

import java.util.List;
import java.util.UUID;

public interface AiService {
    Analysis analysis(AiAnalysisReqDto req);

    List<Analysis> getAnalysisList();
}
