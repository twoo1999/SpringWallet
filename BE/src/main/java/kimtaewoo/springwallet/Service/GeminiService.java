package kimtaewoo.springwallet.Service;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Analysis;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.dto.ai.AiAnalysisReqDto;
import kimtaewoo.springwallet.dto.ai.AnalysisRecordDto;
import kimtaewoo.springwallet.exception.CustomException;
import kimtaewoo.springwallet.exception.ErrorCode;
import kimtaewoo.springwallet.repository.AnalysisRepository;
import kimtaewoo.springwallet.repository.EmitterRepository;
import kimtaewoo.springwallet.repository.MemberRepository;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@Transactional
public class GeminiService implements AiService {
    private final VertexAiGeminiChatModel chatModel;
    private final RecordRepository recordRepository;
    private final AnalysisRepository analysisRepository;
    private final EmitterRepository emitterRepository;
    private final MemberRepository memberRepository;
    @Autowired
    public GeminiService(VertexAiGeminiChatModel chatModel, RecordRepository recordRepository, AnalysisRepository analysisRepository, EmitterRepository emitterRepository, MemberRepository memberRepository) {
        this.chatModel = chatModel;
        this.recordRepository = recordRepository;
        this.analysisRepository = analysisRepository;
        this.emitterRepository = emitterRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public Analysis analysis(AccessTokenPayload ap, AiAnalysisReqDto req){
        List<AnalysisRecordDto> records = recordRepository.findByTimestampRangeAndType(ap.getId(), req.getStart(), req.getEnd(), req.getType());
        String recordData = records.stream().map(x -> x.toString()).collect(Collectors.joining(","));
        String result = chatModel.call(recordData + "분석해줘");
        Analysis analysis = analysisRepository.save(Analysis.toEntity(ap.getId(), req.getStart(), req.getEnd(), req.getType(), result));
        Member member = memberRepository.findById(ap.getId()).get();
        if(member.getAnalysis_token() == 0){
            emitterRepository.deleteById(ap.getId());
            throw new CustomException(ErrorCode.NO_REMAIN_TOKEN);
        }
        this.sendEvent(ap.getId());
        emitterRepository.deleteById(ap.getId());
        member.setAnalysis_token(member.getAnalysis_token()-1);

        return analysis;
    }

    public void completeEmitter(UUID uid) {
        SseEmitter e = emitterRepository.getEmitterByUserId(uid);
        e.complete();

    }
    @Override
    public List<Analysis> getAnalysisList(AccessTokenPayload ap){
//        UUID uid = UUID.fromString("45dd282a-192-4104-a3bd-44c8afbbd0d0");
        return analysisRepository.findAllByUserId(ap.getId());
    }

    @Override
    public Optional<SseEmitter> getEmitter(UUID uid){
        SseEmitter e = emitterRepository.getEmitterByUserId(uid);
        if (e == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(e);
    }

    @Override
    public SseEmitter createEmitter(AccessTokenPayload ap) {
//        UUID uid = UUID.fromString("45dd282a-1922-4104-a3bd-44c8afbbd0d0");
        UUID uid = ap.getId();
        Optional<SseEmitter> e = this.getEmitter(uid);
        if(e.isEmpty()){
            SseEmitter emitter = new SseEmitter();
            emitter.onCompletion(() -> emitterRepository.deleteById(uid));
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(uid))
                        .data("연결"));
            } catch (IOException exception) {
                emitterRepository.deleteById(uid);
                emitter.completeWithError(exception);
            }
            return emitterRepository.save(uid, emitter);
        } else{
            return e.get();
        }

    }




    @Override
    public void sendEvent(UUID uid) {
        SseEmitter emitter = emitterRepository.getEmitterByUserId(uid);

        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(uid))
                        .name("data")
                        .data("analysis success"));
            } catch (IOException e) {

                emitterRepository.deleteById(uid);
                emitter.completeWithError(e);
            }
        } else{
            System.out.println("Emitter 없음");
        }
    }

    @Override
    public Integer getToken(UUID uid){
        Member m = memberRepository.findById(uid).get();
        int remainToken = m.getAnalysis_token();
        if(remainToken == 5){
            return remainToken;
        }


        LocalDate lastDate = m.getLast_analysis_date();
        int lastTime = lastDate.getYear() * 12 + lastDate.getMonthValue();
        LocalDate now = LocalDate.now();
        int nowTime = now.getYear() * 12 + now.getMonthValue();
        if(nowTime > lastTime){
            m.setLast_analysis_date(now);
            m.setAnalysis_token(5);
            return 5;
        }
        return memberRepository.findTokenByUserId(uid);
    }






}
