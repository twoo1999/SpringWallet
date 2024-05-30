package kimtaewoo.springwallet.Service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.CreateRecordReqDto;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
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

    public List<Record> getRecord(AccessTokenPayload ap){
        String email = ap.getEmail();
        return recordRepository.findByEmail(email);
    }


    public ResponseEntity modifyRecord(CreateRecordReqDto record, Long id){
        Record re = recordRepository.findById(id).get();

        if(record.getAmount() != null){
            re.setAmount(record.getAmount());
        }
        if(record.getCategory() != null){
            re.setCategory(record.getCategory());
        }
        if (record.getMemo() != null) {
            re.setMemo(record.getMemo());
        }
        if (record.getMethod() != null) {
            re.setMethod(record.getMethod());
        }
        if (record.getItem() != null) {
            re.setItem(record.getItem());
        }
        if (record.getTimestamp() != null) {
            re.setTimestamp(record.getTimestamp());
        }


        return new ResponseEntity(HttpStatus.OK);
    }


    public ResponseEntity deleteRecord(Long id){
        recordRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
