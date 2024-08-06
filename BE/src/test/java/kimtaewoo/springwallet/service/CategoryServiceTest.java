package kimtaewoo.springwallet.service;

import kimtaewoo.springwallet.Service.CategoryService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.dto.category.CreateCategoryReqDto;
import kimtaewoo.springwallet.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @InjectMocks
    private CategoryService categoryService;

    @Mock
    private CategoryRepository categoryRepository;

//    static UUID uid;
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
    void 카테고리_생성(){
        // given
        String name = "test";

        Category category = Category.builder()
                .user_id(atp.getId())
                .category_name("test")
                .build();

        Long fakeId = 1L;
        ReflectionTestUtils.setField(category, "id", fakeId);


        // mocking
        given(categoryRepository.save(any())).willReturn(category);


        // when
        Category newC = categoryService.save(atp, name);
//        Category newC =  categoryRepository.save(category);

        // then
        assertThat(newC.getCategory_name()).isEqualTo("test");


    }

    @Test
    void 전쳬_저장(){
        // given
        String[] names = new String[]{"test1", "test2", "test3"};

        CreateCategoryReqDto req  = CreateCategoryReqDto.builder()
                .name(names)
                .type("expense")
                .build();
        List<Category> expected = new ArrayList<>();
        for (int i = 0; i < names.length; i++) {
            Category c = Category.builder()
                    .category_name(names[i])
                    .user_id(atp.getId())
                    .build();

            ReflectionTestUtils.setField(c, "id", i*1L);

            expected.add(c);
        }

        // mock
        given(categoryRepository.saveAll(any())).willReturn(expected);


        // when
        List<Category> result = categoryService.saveAll(atp, req);

        // then

        assertThat(result.size()).isEqualTo(3);


    }




}
