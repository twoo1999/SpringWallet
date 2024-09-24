package kimtaewoo.springwallet.Service;

import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.UUID;

public interface AiService {
    Analysis analysis(AiAnalysisReqDto req);

    List<Analysis> getAnalysisList();

    SseEmitter getEmitter(UUID uid);

    SseEmitter createEmitter();

    void sendEvent(UUID uuid, String data);
}
