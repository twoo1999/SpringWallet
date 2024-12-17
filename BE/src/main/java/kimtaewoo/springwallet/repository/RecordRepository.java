package kimtaewoo.springwallet.repository;

import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.ai.AnalysisRecordDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecordRepository {
    Record save(Record record);

    Optional<Record> findById(Long id);

    List<Record> findByMemberIdFilteredByDate(UUID id, int year, int month);

    List<Record> findAll();


    List<Record> findByEmail(String email, int year, int month);

    List<AnalysisRecordDto> findByTimestampRangeAndType(UUID id, LocalDate start, LocalDate end, String types);
    void deleteById(Long id);
}
