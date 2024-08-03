package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import kimtaewoo.springwallet.domain.Record;
import org.junit.jupiter.api.BeforeAll;
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
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;



@DataJpaTest
@ExtendWith(MockitoExtension.class)
public class RecordRepositoryTest {

    @Autowired
    private EntityManager em;

    private JpaRecordRepository recordRepository;

    private CategoryRepository categoryRepository;

    private MethodRepository methodRepository;
    @Autowired
    public RecordRepositoryTest(EntityManager em)
    {
        recordRepository = new JpaRecordRepository(em);
        categoryRepository = new CategoryRepository(em);
        methodRepository = new MethodRepository(em);
    }


    static Long cid1;
    static Long cid2;
    static Long mid1;
    static Long mid2;
    static UUID uid;

    static Category category1;
    static Category category2;
    static Method method1;
    static Method method2;

    @BeforeAll
    static void setting(){
        uid = UUID.randomUUID();
        category1 = Category.builder()
                .user_id(uid)
                .category_name("test category1")
                .build();

        category2 = Category.builder()
                .user_id(uid)
                .category_name("test category2")
                .build();

        method1 = Method.builder()
                .user_id(uid)
                .method_name("test method1")
                .build();
        method2 = Method.builder()
                .user_id(uid)
                .method_name("test method2")
                .build();

    }
    @BeforeEach
    void beforeEach(){
        Category c1  = categoryRepository.save(category1);
        cid1 = c1.getId();

        Category c2 = categoryRepository.save(category2);
        cid2 = c2.getId();

        Method m1 = methodRepository.save(method1);
        mid1 = m1.getId();

        Method m2 = methodRepository.save(method2);
        mid2 = m2.getId();

    }



    @Test
    void 저장(){
        // given
        Category c1 = em.getReference(Category.class, cid1);
        Method m1 = em.getReference(Method.class, mid1);
        Record record = Record.builder()
                .user_id(uid)
                .item("test item")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c1)
                .method(m1)
                .build();

        // when

        Record nc = recordRepository.save(record);

        System.out.println(c1.getCategory_name());

        // then
        System.out.println(nc.getItem());

        assertThat(nc.getItem()).isEqualTo("test item");

    }

    @Test
    void 아이디로_찾기() {
        // given
        Category c = em.getReference(Category.class, cid1);
        Method m = em.getReference(Method.class, mid1);
        Record record = Record.builder()
                .user_id(uid)
                .item("test item")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c)
                .method(m)
                .build();


        Record nc = recordRepository.save(record);
        Long rid = nc.getId();

        // when
        Record nr = recordRepository.findById(rid).get();

        //then
        System.out.println(nr.getCategory().getCategory_name());
        assertThat(nr.getItem()).isEqualTo(nc.getItem());
        assertThat(nr.getCategory().getCategory_name()).isEqualTo("test category");
    }


    @Test
    void 유저아이디로_찾기() {
        Category c1 = em.getReference(Category.class, cid1);
        Method m1 = em.getReference(Method.class, mid1);
        Record record1 = Record.builder()
                .user_id(uid)
                .item("test item1")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c1)
                .method(m1)
                .build();


        Record nc1 = recordRepository.save(record1);

        System.out.println(nc1.getCategory().getId());
        Category c2 = em.getReference(Category.class, cid2);
        Method m2 = em.getReference(Method.class, mid2);
        Record record2 = Record.builder()
                .user_id(uid)
                .item("test item2")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c2)
                .method(m2)
                .build();

        Record nc2 = recordRepository.save(record2);
        System.out.println(nc2.getId());

//        // when
//
        List<Record> rs = recordRepository.findByUserId(uid);

        // then

        assertThat(rs.size()).isEqualTo(2);
    }


    @Test
    void 전체_탐색(){
        Category c = em.getReference(Category.class, cid1);
        Method m = em.getReference(Method.class, mid1);
        Record record = Record.builder()
                .user_id(uid)
                .item("test item")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c)
                .method(m)
                .build();


        Record nc = recordRepository.save(record);


        Record record1 = Record.builder()
                .user_id(uid)
                .item("test item1")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c)
                .method(m)
                .build();



        recordRepository.save(record1);


        // when
        List<Record> rs = recordRepository.findAll();

        //then
        assertThat(rs.size()).isEqualTo(2);
    }


    @Test
    void 삭제(){
        // given
        Category c = em.getReference(Category.class, cid1);
        Method m = em.getReference(Method.class, mid1);
        Record record = Record.builder()
                .user_id(uid)
                .item("test item")
                .timestamp(LocalDate.now())
                .amount(1000)
                .memo(null)
                .category(c)
                .method(m)
                .build();


        Record nc = recordRepository.save(record);

        Long id = nc.getId();
        // when

        recordRepository.deleteById(id);


        // then

        assertThat(recordRepository.findAll().size()).isEqualTo(0);

    }


//    @BeforeEach
//    void before(){
//        Record record = Record.builder()
//                .userId()
//                .build();
//
//
//                new Record();
//        record.setEmail("test@email.com");
//        record.setCategory("식비");
//        record.setTimestamp(LocalDate.of(2020, 1, 1));
//        record.setMethod("현금");
//        record.setAmount(1000);
//        record.setMemo(null);
//
//        repository.save(record);
//    }



//    @Test
//    void 불러오기(){
//        // given
//        UUID id = UUID.randomUUID();
//        Record record = Record.builder()
//                .userId(id)
//                .category()
//                .build();
//
//
//        new Record();
//        record.setEmail("test@email.com");
//        record.setCategory("식비");
//        record.setTimestamp(LocalDate.of(2020, 1, 1));
//        record.setMethod("현금");
//        record.setAmount(1000);
//        record.setMemo(null);
//
//        repository.save(record);
//        //then
//        Record result = repository.findById(1L).get();
//        assertThat(result.getId()).isEqualTo(1L);
//    }
//
//    @Test
//    void 저장(){
//        // given
//
//        //then
//        Record result = repository.findById(1L).get();
//        assertThat(result.getId()).isEqualTo(1L);
//    }
//
//
//    @Test
//    void 이메일로_가져오기(){
//        // given
//
//
//        // when
//        List<Record> recordList = repository.findByEmail("test@email.com");
//        Record result = recordList.get(0);
//
//        // then
//        assertThat(result.getCategoryId()).isEqualTo("식비");
//    }
//
//
//    @Test
//    @Transactional
//    void 기록_수정(){
//        // given
//
//
//        // when
//
//        Record newRecord = repository.findById(1L).get();
//        newRecord.setEmail("test2@email.com");
//
//        Record newnewRecord = repository.findById(1L).get();
//        System.out.println(newRecord.getId());
//
//
//
//        // then
//        assertThat(newnewRecord.getEmail()).isEqualTo("test2@email.com");
//
//    }
//
//    @Test
//    @Transactional
//    void 기록_삭제(){
//        // given
//        Record record = new Record();
//        record.setEmail("test@email.com");
//        record.setCategory("식비");
//        record.setTimestamp(LocalDate.of(2020, 1, 1));
//        record.setMethod("현금");
//        record.setAmount(1000);
//        record.setMemo(null);
//
//        repository.save(record);
//
//        // when
//        repository.deleteById(1L);
//        List<Record> newR = repository.findAll();
//
//        // then
//        assertThat(newR.size()).isEqualTo(1);
//    }
}
