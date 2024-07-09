package kimtaewoo.springwallet.repository;


import jakarta.persistence.EntityManager;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.enumClass.Role;
import kimtaewoo.springwallet.domain.enumClass.SocialType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
@ExtendWith(MockitoExtension.class)
public class MemberRepositoryTest {
    @Autowired
    private EntityManager em;

    private MemberRepository repository;

    @Autowired
    public MemberRepositoryTest(EntityManager em){
        repository = new MemberRepository(em);
    }


    @BeforeEach
    void before(){
        Member m = Member.builder().name("test")
                .role(Role.USER)
                .email("test@test.com")
                .socialtype(SocialType.GOOGLE)
                .build();



        repository.save(m);
    }

    @Test
    void 저장_테스트(){

        // given

        // when
        Member m = repository.findByEmail("test@test.com").get();

        // then
        System.out.println(m.getId());


        assertThat(m.getName()).isEqualTo("test");
    }

}
