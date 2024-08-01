package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.Record;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class JpaRecordRepository implements RecordRepository {


    private final EntityManager em;

    public JpaRecordRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Record save(Record record) {
        em.persist(record);
        return record;
    }

    @Override
    public Optional<Record> findById(Long id) {
        Record re = em.find(Record.class, id);
        return Optional.ofNullable(re);
    }

    @Override
    public List<Record> findByUserId(UUID id) {
        return em.createQuery("select r from Record r where r.user_id = :id", Record.class)
                .setParameter("id", id)
                .getResultList();
    }
    @Override
    public List<Record> findAll() {
        return em.createQuery("select r from Record r", Record.class).getResultList();
    }

    @Override
    public List<Record> findByEmail(String email) {
        return em.createQuery("select r from Record r where r.email = :email", Record.class)
                .setParameter("email", email)
                .getResultList();
    }

    @Override
    public void deleteById(Long id) {
        em.createQuery("delete from Record r where r.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
