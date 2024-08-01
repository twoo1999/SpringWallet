package kimtaewoo.springwallet.repository;


import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Record;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@DataJpaTest
@ExtendWith(MockitoExtension.class)
public class CategortRepositoryTest {

    @Autowired
    private EntityManager em;

    private CategoryRepository repository;

    @Autowired
    public CategortRepositoryTest(EntityManager em){
        this.em = em;
        this.repository = new CategoryRepository(this.em);
    }

    @Test
    void 한개_저장(){
        // given
//        EntityTransaction ts = em.getTransaction();
//        ts.begin();

        String name = "test";
        UUID id = UUID.randomUUID();
        Category c = Category.builder()
                .user_id(id)
                .category_name(name)
                .build();

        // when
        Category newC = repository.save(c);

//        ts.commit();/**/
        // then
        assertThat(newC.getCategory_name()).isEqualTo(name);
    }


    @Test
    void 여러개_저장(){
         //given
        String[] names = {"test1", "test2", "test3"};
        List<Category> categories = new ArrayList<>();
        UUID id = UUID.randomUUID();
        for (String n : names) {
            Category newCategory = Category.builder()
                    .category_name(n)
                    .user_id(id)
                    .build();

            categories.add(newCategory);
        }
         //when

        repository.saveAll(categories);

        List<Category> newCs = repository.findByUserId(id);
        // then

        System.out.println(newCs.size());

        assertThat(newCs.size()).isEqualTo(3);

    }

    @Test
    void 삭제(){
        String[] names = {"test1", "test2", "test3"};
        List<Category> categories = new ArrayList<>();
        UUID id = UUID.randomUUID();
        for (String n : names) {
            Category newCategory = Category.builder()
                    .category_name(n)
                    .user_id(id)
                    .build();

            categories.add(newCategory);
        }

        repository.saveAll(categories);
        repository.deleteByUserIdAndName("test1", id);
        List<Category> newCs = repository.findByUserId(id);
        assertThat(newCs.size()).isEqualTo(2);
    }

    @Test
    void 전부_삭제(){
        String[] names = {"test1", "test2", "test3"};
        List<Category> categories = new ArrayList<>();
        UUID id = UUID.randomUUID();
        for (String n : names) {
            Category newCategory = Category.builder()
                    .category_name(n)
                    .user_id(id)
                    .build();

            categories.add(newCategory);
        }

        repository.saveAll(categories);
        repository.deleteByUserIdAndNameAll(new String[]{"test1", "test2"}, id);
        List<Category> newCs = repository.findByUserId(id);
        assertThat(newCs.size()).isEqualTo(1);
    }


    @Test
    void 늦은_탐색(){
       // given
        String name = "test";
        UUID id = UUID.randomUUID();
        Category c = Category.builder()
                .user_id(id)
                .category_name(name)
                .build();

        // when
        Category newC = repository.save(c);
        // when
        Category cc = repository.getOne(newC.getId());

        // then
        assertThat(newC.getCategory_name()).isEqualTo(cc.getCategory_name());
    }
}

// given


// when

// then