package kimtaewoo.springwallet.repository;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Record;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional // 롤백
public class RecordRepositoryTest {

    @Autowired
    private JpaRecordRepository repository;

    @Test
    void insert(){
        // given
        Record record = new Record();
        record.setUser_id(1L);
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setPayment("현금");
        record.setAmount(1000);
        record.setMemo(null);

        // when
        repository.save(record);


        //then
        Record result = repository.findById(record.getId()).get();
        assertThat(result).isEqualTo(record);
    }

}
