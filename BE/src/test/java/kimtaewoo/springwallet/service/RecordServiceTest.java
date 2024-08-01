package kimtaewoo.springwallet.service;


import kimtaewoo.springwallet.Service.RecordService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.record.CreateRecordReqDto;
import kimtaewoo.springwallet.repository.CategoryRepository;
import kimtaewoo.springwallet.repository.JpaRecordRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
@ExtendWith(MockitoExtension.class)
public class RecordServiceTest {

    @InjectMocks
    private RecordService recordService;

    @Mock
    private JpaRecordRepository jpaRecordRepository;
    @Mock
    private CategoryRepository categoryRepository;

    static AccessTokenPayload atp;
    @BeforeAll
    static void setting(){
        UUID uid = UUID.randomUUID();
        atp = AccessTokenPayload.builder()
                .name("test")
                .id(uid)
                .iat(0)
                .email("test email")
                .build();

    }

    @Test
    void 저장(){
        // given
        CreateRecordReqDto record = CreateRecordReqDto.builder()
                .item("test")
                .amount(100)
                .categoryId(1L)
                .methodId(1L)
                .timestamp(LocalDate.now())
                .memo(null)
                .build();
        Category category = Category.builder()
                .user_id(atp.getId())
                .category_name("test")
                .build();

        Method method = Method.builder()
                .user_id(atp.getId())
                .method_name("test")
                .build();

        ReflectionTestUtils.setField(category, "id", 1L);
        Record r = Record.toEntity(atp, record, category, method);
        ReflectionTestUtils.setField(r, "id", 1L);
        // mock

        given(jpaRecordRepository.save(any())).willReturn(r);
        given(categoryRepository.getOne(any())).willReturn(category);


        // when
        Long id = recordService.save(atp, record);

        // then
        assertThat(id).isEqualTo(1L);

    }


    @Test
    void 가져오기(){
        // given
        Category c = Category.builder()
                .user_id(atp.getId())
                .category_name("test")
                .build();

        Method m = Method.builder()
                .user_id(atp.getId())
                .method_name("test")
                .build();
        ReflectionTestUtils.setField(c, "id", 1L);
        Record r = Record.builder()
                .user_id(atp.getId())
                .item("test")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c)
                .method(m)
                .build();
        ReflectionTestUtils.setField(r, "id", 1L);
        List<Record> list = new ArrayList<>();
        list.add(r);
        // mocking
        given(jpaRecordRepository.findByUserId(atp.getId())).willReturn(list);

        // when
        List<Record> result = recordService.findByUserId(atp);

        // the

        assertThat(result.size()).isEqualTo(1);




    }





}


