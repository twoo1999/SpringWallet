package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Record;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;



@DataJpaTest
@ExtendWith(MockitoExtension.class)
public class RecordRepositoryTest {

    @Autowired
    private EntityManager em;

    private JpaRecordRepository repository;

    @Autowired
    public RecordRepositoryTest(EntityManager em){
        repository = new JpaRecordRepository(em);
    }



    @Test
    void 저장(){
        // given
        Record record = new Record();
        record.setEmail("test@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(1000);
        record.setMemo(null);

        // when
        repository.save(record);


        //then
        Record result = repository.findById(record.getId()).get();
        assertThat(result).isEqualTo(record);
    }


    @Test
    void 이메일로_가져오기(){
        // given
        Record record = new Record();
        record.setEmail("test@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(1000);
        record.setMemo(null);

        repository.save(record);

        // when
        List<Record> recordList = repository.findByEmail("test@email.com");
        Record result = recordList.get(0);

        // then
        assertThat(result.getCategory()).isEqualTo("식비");
    }
}
