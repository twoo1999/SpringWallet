package kimtaewoo.springwallet.dto.category;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class DeleteCategoryReqDto {
    private Long[] ids;
}
