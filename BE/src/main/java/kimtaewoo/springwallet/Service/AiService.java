package kimtaewoo.springwallet.Service;

import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AiService {
    Analysis analysis(AccessTokenPayload ap, AiAnalysisReqDto req);

    List<Analysis> getAnalysisList(AccessTokenPayload ap);

    Optional<SseEmitter> getEmitter(UUID uid);

    SseEmitter createEmitter(AccessTokenPayload ap);

    void sendEvent(UUID uuid);

    Optional<Integer> getToken(UUID uid);
}
