package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Analysis;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@Transactional
public class AnalysisRepository {
    private final EntityManager em;

    public AnalysisRepository(EntityManager em){
        this.em = em;
    }

    public Analysis save(Analysis analysis) {
        if (em.contains(analysis)) {
            em.merge(analysis);
        } else {
            if (analysis.getId() == null) {
                em.persist(analysis);
            } else {
                em.merge(analysis);
            }
        }

        return analysis;
    }

}
