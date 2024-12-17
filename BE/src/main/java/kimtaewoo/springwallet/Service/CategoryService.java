package kimtaewoo.springwallet.Service;

import jakarta.transaction.Transactional;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.enumClass.ActiveStatus;
import kimtaewoo.springwallet.domain.enumClass.CategoryType;
import kimtaewoo.springwallet.dto.category.CreateCategoryReqDto;
import kimtaewoo.springwallet.dto.category.DeleteCategoryReqDto;
import kimtaewoo.springwallet.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategoryByMemberId(AccessTokenPayload atp){
        System.out.println("카테고리 조회");
        UUID id = atp.getId();
        return categoryRepository.findByMemberId(id);
    }

    public List<Category> getCategoryByMemberIdActive(AccessTokenPayload atp) {
        System.out.println("카테고리 조회(활성)");
        UUID id = atp.getId();
        return categoryRepository.findByMemberIdActive(id);
    }

    public Category save(AccessTokenPayload atp, String name){
        UUID id = atp.getId();
        Category newCategory = Category.builder()
                .category_name(name)
                .member_id(id)
                .build();

        return categoryRepository.save(newCategory);
    }



    public List<Category> saveAll(AccessTokenPayload atp, CreateCategoryReqDto category){
        String[] name = category.getName();
        CategoryType type = category.getType().equals("revenue") ? CategoryType.REVENUE : CategoryType.EXPENSE;

        UUID id = atp.getId();
        List<Category> categories = new LinkedList<>();
        for (String n : name) {
            Category newCategory = Category.builder()
                    .category_name(n)
                    .type(type)
                    .member_id(id)
                    .status(ActiveStatus.ACTIVE)
                    .build();

            categories.add(newCategory);
        }
        return categoryRepository.saveAll(categories);
    }

    public Optional<Category> getCategoryByMemberIdAndCategory(UUID uid, String name){
        return categoryRepository.findByMemberIdAndCategory(uid, name);
    }

    public List<Category> createCategoryList(String[] name, UUID uid, CategoryType type){
        List<Category> categories = new ArrayList<>();

        for (String n : name) {
            Category newCategory = Category.builder()
                    .category_name(n)
                    .type(type)
                    .member_id(uid)
                    .status(ActiveStatus.ACTIVE)
                    .build();

            categories.add(newCategory);
        }

        return categories;
    }
    public List<Category> saveAllCategory(AccessTokenPayload atp, CreateCategoryReqDto categoryReqDto) {
        System.out.println("카테고리 저장");
        List<Category> newC = new ArrayList<>();
        List<Category> existC = new ArrayList<>();
        CategoryType type = categoryReqDto.getType().equals("revenue") ? CategoryType.REVENUE : CategoryType.EXPENSE;
        UUID uid = atp.getId();

        // 비활성화 데이터

        // 없는 데이터
        for (String cname : categoryReqDto.getName()) {
            Optional<Category> category = getCategoryByMemberIdAndCategory(uid, cname);
            if(category.isEmpty()){
                newC.add(Category.toEntity(uid, cname, type, ActiveStatus.ACTIVE));
            } else{
                Category c = category.get();
                c.setStatus(ActiveStatus.ACTIVE);
                existC.add(c);
            }
        }

        List<Category> savedCategory = categoryRepository.saveAll(newC);

        savedCategory.addAll(existC);
        for (Category c : savedCategory) {
            System.out.println(c.getCategory_name());
        }
        return savedCategory;









    }


    public List<Long> deleteAll(AccessTokenPayload atp, DeleteCategoryReqDto categoryReqDto) {
        UUID id = atp.getId();
        return categoryRepository.deleteByIdAll(categoryReqDto.getIds(), id);
    }


    public List<Long> softDeleteAll(AccessTokenPayload atp, DeleteCategoryReqDto categoryReqDto) {
        UUID id = atp.getId();
        return categoryRepository.softDeleteAll(categoryReqDto.getIds(), id);

    }
}
