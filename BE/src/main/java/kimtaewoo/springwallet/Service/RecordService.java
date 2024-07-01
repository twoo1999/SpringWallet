package kimtaewoo.springwallet.Service;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.record.CreateRecordReqDto;
import kimtaewoo.springwallet.dto.record.CreateRecordResDto;
import kimtaewoo.springwallet.repository.CategoryRepository;
import kimtaewoo.springwallet.repository.MethodRepository;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class RecordService {
    private final RecordRepository recordRepository;
    private final CategoryRepository categoryRepository;
    private final MethodRepository methodRepository;
    public RecordService(RecordRepository recordRepository, CategoryRepository categoryRepository, MethodRepository methodRepository) {
        this.recordRepository = recordRepository;
        this.categoryRepository = categoryRepository;
        this.methodRepository = methodRepository;
    }

    public CreateRecordResDto save(AccessTokenPayload atp, CreateRecordReqDto record) {

        Category category = categoryRepository.getOne(record.getCategoryId());
        Method method = methodRepository.getOne(record.getMethodId());

        Record newRecord = Record.toEntity(atp, record, category, method);
        Record re = recordRepository.save(newRecord);

        return CreateRecordResDto.build(re);
    }

    public List<Record> findByUserId(AccessTokenPayload ap){
        UUID id = ap.getId();
        return recordRepository.findByUserId(id);
    }


    public CreateRecordResDto updateRecord(CreateRecordReqDto record, Long id){
        Record re = recordRepository.findById(id).get();

        if(record.getAmount() != null){
            re.setAmount(record.getAmount());
        }
        if(record.getCategoryId() != null){
            Category category = categoryRepository.getOne(record.getCategoryId());
            re.setCategory(category);
//            re.setCategoryId(record.getCategoryId());
        }
        if (record.getMemo() != null) {
            re.setMemo(record.getMemo());
        }
        if (record.getMethodId() != null) {
            Method method = methodRepository.getOne(record.getMethodId());
            re.setMethod(method);
        }
        if (record.getItem() != null) {
            re.setItem(record.getItem());
        }
        if (record.getTimestamp() != null) {
            re.setTimestamp(record.getTimestamp());
        }


        return CreateRecordResDto.build(re);
    }


    public ResponseEntity deleteRecord(Long id){
        recordRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
