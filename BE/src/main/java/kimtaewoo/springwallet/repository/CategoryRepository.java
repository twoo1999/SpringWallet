package kimtaewoo.springwallet.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Record;
import kimtaewoo.springwallet.domain.enumClass.ActiveStatus;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
@Transactional
public class CategoryRepository {
    private final EntityManager em;

    public CategoryRepository(EntityManager em) {
        this.em = em;
    }

    public int count(){
        List<Category> categories = em.createQuery("SELECT c from Category c", Category.class).getResultList();
        return categories.size();
    }

    public void deleteAll(){
        List<Category> categories = em.createQuery("SELECT c from Category c", Category.class).getResultList();
        for (Category c : categories) {
            em.remove(c);
        }
    }
    public boolean isContain(Category category){
        return em.contains(category);
    }
    public Category save(Category category) {

        if (em.contains(category)) {
            em.merge(category);
        } else {
            if (category.getId() == null) {
                em.persist(category);
            } else{
                em.merge(category);
            }
        }

        return category;
    }
    public List<Category> saveAll(List<Category> categorys) {
        List<Category> result = new ArrayList<>();
        for(Category c : categorys){
            System.out.println("SDW " + c.getCategory_name());
            em.persist(c);
            result.add(c);
        }
        return result;
//        return category;
    }

    public Optional<Category> findById(Long id) {
        Category re = em.find(Category.class, id);
        return Optional.ofNullable(re);
    }
    public List<Category> findByUserId(UUID id) {
        return em.createQuery("select c from Category c where c.user_id = :id", Category.class)
                .setParameter("id", id)
                .getResultList();
    }

    public Optional<Category> findByUserIdAndCategory(UUID id, String name) {
        List<Category> re = em.createQuery("select c from Category c where c.user_id = :id and c.category_name = :name and c.status = :status", Category.class)
                .setParameter("id", id)
                .setParameter("name", name)
                .setParameter("status", ActiveStatus.INACTIVE)
                .getResultList();

        return re.stream().findAny();
    }

    public List<Category> findByUserIdActive(UUID id) {
        return em.createQuery("select c from Category c where c.user_id = :id and c.status = :status", Category.class)
                .setParameter("id", id)
                .setParameter("status", ActiveStatus.ACTIVE)
                .getResultList();
    }


    public void deleteByUserIdAndName(String name, UUID id) {
        em.createQuery("delete from Category c where c.user_id = :id and c.category_name = :name")
                .setParameter("id", id)
                .setParameter("name", name)
                .executeUpdate();


    }
    public List<Long> deleteByIdAll(Long[] ids, UUID id) {
        List<Long> res = new ArrayList<>();
        for (Long cid : ids) {
            em.createQuery("delete from Category c where c.id = :cid")
                    .setParameter("cid", cid)
                    .executeUpdate();
            res.add(cid);
        }


        return res;
    }

    public Category getOne(Long id){
        return em.getReference(Category.class, id);
    }


    public List<Long> softDeleteAll(Long[] ids, UUID uid) {
        List<Long> res = new ArrayList<>();
        List<Category> categories = em.createQuery("select c from Category c where c.user_id = :id", Category.class)
                .setParameter("id", uid)
                .getResultList();

        for (Long id : ids) {
            for(Category category : categories){
                if (Objects.equals(category.getId(), id)) {
                    category.setStatus(ActiveStatus.INACTIVE);
                }
            }
            res.add(id);
        }
        return res;
    }
}
