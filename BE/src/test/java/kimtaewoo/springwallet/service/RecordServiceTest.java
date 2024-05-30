package kimtaewoo.springwallet.service;


import kimtaewoo.springwallet.Service.RecordService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.repository.RecordRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.LinkedList;
import java.util.List;
import java.time.LocalDate;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
@ExtendWith(MockitoExtension.class)
public class RecordServiceTest {

    @InjectMocks
    private RecordService service;

    @Mock
    private RecordRepository recordRepository;

    @Test
    public void 기록_가져오기() throws Exception{

        //given
        AccessTokenPayload acp = new AccessTokenPayload();
        acp.setName("test");
        acp.setEmail("test@email.com");
        acp.setIat(1);


        Record record = new Record();
        record.setEmail("test@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(1000);
        record.setMemo(null);
        List<Record> l = new LinkedList<>();
        l.add(record);


        // mocking
        given(recordRepository.findByEmail(acp.getEmail())).willReturn(l);

        // when
        List<Record> result = service.getRecord(acp);
        Record re = result.get(0);

        // then
        assertThat(re.getEmail()).isEqualTo(record.getEmail());

    }


    @Test
    public void 기록_수정() throws Exception{
        //given
        Record record = new Record();
        record.setEmail("test@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(null);
        record.setMemo(null);


        // mocking

        Record newRecord = new Record();
        record.setEmail("test2@email.com");
        record.setCategory("식비");
        record.setTimestamp(LocalDate.of(2020, 1, 1));
        record.setMethod("현금");
        record.setAmount(1000);
        record.setMemo(null);


        // when
        int a = 1;
        System.out.println((Integer)a);
        // then

    }


}
