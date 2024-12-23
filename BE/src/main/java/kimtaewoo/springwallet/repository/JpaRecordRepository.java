package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Member;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.dto.ai.AnalysisRecordDto;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class JpaRecordRepository implements RecordRepository {


    private final EntityManager em;

    public JpaRecordRepository(EntityManager em) {
        this.em = em;
    }


    public void deleteAll(){
        List<Record> recordList = em.createQuery("SELECT r from Record r", Record.class).getResultList();
        for (Record r : recordList) {
            em.remove(r);
        }
    }

    @Override
    public List<AnalysisRecordDto> findByTimestampRangeAndType(UUID id, LocalDate start, LocalDate end, String type) {
        if (type.equals("revenue")) {
            return em.createQuery("select r.category, r.method, r.item, r.timestamp, r.amount from Record r where r.member_id = :id and r.timestamp >= :start and r.timestamp <= :end and r.amount > 0", AnalysisRecordDto.class
                    )
                    .setParameter("id", id)
                    .setParameter("start", start)
                    .setParameter("end", end)
                    .getResultList();
        } else if (type.equals("expense")) {
            return em.createQuery("select r.category, r.method, r.item, r.timestamp, r.amount from Record r where r.member_id = :id and r.timestamp >= :start and r.timestamp <= :end and r.amount < 0", AnalysisRecordDto.class)
                    .setParameter("id", id)
                    .setParameter("start", start)
                    .setParameter("end", end)
                    .getResultList();
        }
        return em.createQuery("select r.category, r.method, r.item, r.timestamp, r.amount from Record r where r.member_id = :id and r.timestamp >= :start and r.timestamp <= :end", AnalysisRecordDto.class)
                .setParameter("id", id)
                .setParameter("start", start)
                .setParameter("end", end)
                .getResultList();
    }
    @Override
    public Record save(Record record) {

        if (em.contains(record)) {
            em.merge(record);
        } else {
            if (record.getId() == null) {
                em.persist(record);
            } else{
                em.merge(record);
            }
        }

        return record;
    }

    @Override
    public Optional<Record> findById(Long id) {
        Record re = em.find(Record.class, id);
        return Optional.ofNullable(re);
    }

    @Override
    public List<Record> findByMemberIdFilteredByDate(UUID id, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, 1).plusMonths(1);
        return em.createQuery("select r from Record r where r.member_id = :id and r.timestamp >= :startDate and r.timestamp < :endDate ", Record.class)
                .setParameter("id", id)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }
    @Override
    public List<Record> findAll() {
        return em.createQuery("select r from Record r", Record.class).getResultList();
    }

    @Override
    public List<Record> findByEmail(String email, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, 1).plusMonths(1);
        return em.createQuery("select r from Record r join Member m on r.member_id = m.id where m.email = :email and r.timestamp between :startDate and :endDate", Record.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
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
