package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public class MethodRepository {
    private final EntityManager em;
    public MethodRepository(EntityManager em){this.em = em;}

    public Method save(Method method){
        em.persist(method);
        return method;
    }

    public List<Method> saveAll(List<Method> methods) {
        List<Method> result = new ArrayList<>();

        for (Method m : methods) {
            em.persist(m);
            result.add(m);
        }

        return methods;
    }

    public Optional<Method> findById(Long id) {
        Method re = em.find(Method.class, id);
        return Optional.ofNullable(re);
    }

    public List<Method> findByUserId(UUID id) {
        return em.createQuery("select m from Method m where m.user_id = :id", Method.class)
                .setParameter("id", id)
                .getResultList();
    }

    public void deleteByUserIdAndName(String name, UUID id) {
        em.createQuery("delete from Method m where m.user_id = :id and m.method_name = :name")
                .setParameter("id", id)
                .setParameter("name", name)
                .executeUpdate();
    }

    public List<Long> deleteByIdAll(Long[] ids, UUID id) {
        List<Long> result = new ArrayList<>();
        for (Long mid : ids) {
            em.createQuery("delete from Method m where m.id = :mid")
                    .setParameter("mid", mid)
                    .executeUpdate();
            result.add(mid);
        }
        return result;
    }

    public Method getOne(Long id){
        return em.getReference(Method.class, id);
    }
}
