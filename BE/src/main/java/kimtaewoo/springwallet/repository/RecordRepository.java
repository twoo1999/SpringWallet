package kimtaewoo.springwallet.repository;

import kimtaewoo.springwallet.domain.Record;

import java.util.List;
import java.util.Optional;

public interface RecordRepository {
    Record save(Record record);

    Optional<Record> findById(Long id);

    List<Record> findAll();


    List<Record> findByEmail(String email);

    void deleteById(Long id);
}
