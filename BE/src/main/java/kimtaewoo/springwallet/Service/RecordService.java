package kimtaewoo.springwallet.Service;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Record;
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

    public Long join(Record record) {
        Record re = new Record();
        re.setUser_id(1L);
        re.setCategory("식비");
        re.setTimestamp(LocalDate.of(2020, 1, 1));
        re.setPayment("현금");
        re.setAmount(1000);
        re.setMemo(null);

        recordRepository.save(re);
        return record.getId();
    }
}
