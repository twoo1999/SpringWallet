package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Record;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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


    @BeforeEach
    void before(){
        Record record = new Record();
        record.setEmail("test@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(1000);
        record.setMemo(null);

        repository.save(record);
    }

    @Test
    void 저장(){
        // given

        //then
        Record result = repository.findById(1L).get();
        assertThat(result.getId()).isEqualTo(1L);
    }


    @Test
    void 이메일로_가져오기(){
        // given


        // when
        List<Record> recordList = repository.findByEmail("test@email.com");
        Record result = recordList.get(0);

        // then
        assertThat(result.getCategory()).isEqualTo("식비");
    }


    @Test
    @Transactional
    void 기록_수정(){
        // given


        // when

        Record newRecord = repository.findById(1L).get();
        newRecord.setEmail("test2@email.com");

        Record newnewRecord = repository.findById(1L).get();
        System.out.println(newRecord.getId());



        // then
        assertThat(newnewRecord.getEmail()).isEqualTo("test2@email.com");

    }
}
