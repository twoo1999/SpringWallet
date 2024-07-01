package kimtaewoo.springwallet.dto.category;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CreateCategoryReqDto {
    private String[] name;

    private String type;
//    List<String> name;
}
