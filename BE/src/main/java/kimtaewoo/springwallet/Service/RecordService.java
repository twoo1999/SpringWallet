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

        Record re = recordRepository.save(record);
        return re.getId();
    }
}
