package kimtaewoo.springwallet.controller;

import kimtaewoo.springwallet.Service.CategoryService;
import kimtaewoo.springwallet.domain.AccessTokenPayload;
import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.dto.category.CreateCategoryReqDto;
import kimtaewoo.springwallet.dto.category.DeleteCategoryReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/category")
    @ResponseBody
    public List<Category> getCategory(AccessTokenPayload atp) {
        return categoryService.getCategoryByMemberId(atp);
    }

    @GetMapping("/api/category/active")
    @ResponseBody
    public List<Category> getCategoryActive(AccessTokenPayload atp) {
        return categoryService.getCategoryByMemberIdActive(atp);
    }

//    @PostMapping("/category")
//    @ResponseBody
//    public ResponseEntity createCategory(AccessTokenPayload atp, @RequestBody CreateCategoryReqDto category) {
//        List<Category> result = categoryService.saveAll(atp, category);
//        return ResponseEntity.ok(result);
//    }

    @PostMapping("/api/category")
    @ResponseBody
    public ResponseEntity createCategory(AccessTokenPayload atp, @RequestBody CreateCategoryReqDto category) {
        List<Category> result = categoryService.saveAllCategory(atp, category);
        return ResponseEntity.ok(result);
    }

//    @DeleteMapping("/category")
//    @ResponseBody
//    public ResponseEntity deleteCategory(AccessTokenPayload atp, @RequestBody DeleteCategoryReqDto category) {
//        System.out.println("카테고리 삭제");
////        List<Long> res = categoryService.deleteAll(atp, category);
//        List<Long> res = categoryService.softDeleteAll(atp, category);
//        return ResponseEntity.ok(res);
//    }

    @DeleteMapping("/api/category")
    @ResponseBody
    public ResponseEntity deleteCategory(AccessTokenPayload atp, @RequestBody DeleteCategoryReqDto category) {
        System.out.println("카테고리 삭제");




//        List<Long> res = categoryService.deleteAll(atp, category);
        List<Long> res = categoryService.softDeleteAll(atp, category);

        return ResponseEntity.ok(res);
    }
}
