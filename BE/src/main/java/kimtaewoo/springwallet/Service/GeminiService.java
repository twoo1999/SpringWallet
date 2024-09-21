package kimtaewoo.springwallet.Service;

import jakarta.servlet.http.HttpServletResponse;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.domain.enumClass.analysisType;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import kimtaewoo.springwallet.dto.ai.AnalysisRecordDto;
import kimtaewoo.springwallet.repository.AnalysisRepository;
import kimtaewoo.springwallet.repository.EmitterRepository;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GeminiService implements AiService {
    private final VertexAiGeminiChatModel chatModel;
    private final RecordRepository recordRepository;
    private final AnalysisRepository analysisRepository;
    private final EmitterRepository emitterRepository;
    @Autowired
    public GeminiService(VertexAiGeminiChatModel chatModel, RecordRepository recordRepository, AnalysisRepository analysisRepository, EmitterRepository emitterRepository) {
        this.chatModel = chatModel;
        this.recordRepository = recordRepository;
        this.analysisRepository = analysisRepository;
        this.emitterRepository = emitterRepository;
    }

    @Override
    public Analysis analysis(AiAnalysisReqDto req){
        UUID uid = UUID.fromString("45dd282a-1922-4104-a3bd-44c8afbbd0d0");
        List<AnalysisRecordDto> records = recordRepository.findByTimestampRangeAndType(uid, req.getStart(), req.getEnd(), req.getType());
        String recordData = records.stream().map(x -> x.toString()).collect(Collectors.joining(","));

        String result = chatModel.call(recordData + "분석해줘");
        Analysis analysis = analysisRepository.save(Analysis.toEntity(uid, req.getStart(), req.getEnd(), result));

        return analysis;
    }

    @Override
    public List<Analysis> getAnalysisList(){
        UUID uid = UUID.fromString("45dd282a-1922-4104-a3bd-44c8afbbd0d0");
        return analysisRepository.findAllByUserId(uid);
    }

    @Override
    public SseEmitter getEmitter(UUID uid){
        return emitterRepository.getEmitterByUserId(uid);
    }

    @Override
    public SseEmitter createEmitter(UUID uid) {
        SseEmitter emitter = new SseEmitter();
        return emitterRepository.save(uid, emitter);
    }

    @Override
    public void sendEvent(UUID uid, String data) {
        SseEmitter emitter = emitterRepository.getEmitterByUserId(uid);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(uid)).name(data));
            } catch (IOException e) {
                emitterRepository.delete(uid);
                emitter.completeWithError(e);
            }
        }
    }






}
