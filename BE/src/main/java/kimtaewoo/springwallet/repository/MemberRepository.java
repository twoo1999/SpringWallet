package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.Record;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public class MemberRepository {

    private final EntityManager em;

    public MemberRepository(EntityManager em) {
        this.em = em;
    }



    public Member save(Member member) {
        em.persist(member);
        return member;
    }
    public Optional<Member> findById(UUID id){
        try {
            Member member = em.createQuery("select m from Member m where m.id = :id", Member.class)
                    .setParameter("id", id)
                    .getSingleResult();
            return Optional.ofNullable(member);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
    public Optional<Member> findByEmail(String email) {
        try {
            Member member = em.createQuery("select m from Member m where m.email = :email", Member.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return Optional.ofNullable(member);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public Optional<Integer> findTokenByUserId(UUID uid){
        try {
            int remainToken = em.createQuery("select m.analysis_token from Member m where m.id = :uid", Integer.class)
                    .setParameter("uid", uid)
                    .getSingleResult();
            return Optional.ofNullable(remainToken);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

}
