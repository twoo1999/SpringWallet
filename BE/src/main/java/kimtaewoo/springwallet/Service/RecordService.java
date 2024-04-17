package kimtaewoo.springwallet.Service;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.CreateRecordReqDto;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Transactional
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public Long join(AccessTokenPayload ap, CreateRecordReqDto record) {
        Record newRecord = new Record();
        newRecord.setEmail(ap.getEmail());
        newRecord.setCategory(record.getCategory());
        newRecord.setItem(record.getItem());
        newRecord.setTimestamp(record.getTimestamp());
        newRecord.setMethod(record.getMethod());
        newRecord.setAmount(record.getAmount());
        newRecord.setMemo(record.getMemo());
        Record re = recordRepository.save(newRecord);
        return re.getId();
    }
}
