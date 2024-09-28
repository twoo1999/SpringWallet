package kimtaewoo.springwallet.dto.ai;


import kimtaewoo.springwallet.domain.Category;
import kimtaewoo.springwallet.domain.Method;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AnalysisRecordDto {
    private Category category;
    private Method method;
    private String item;
    private LocalDate timestamp;
    private Integer amount;

    public String toString(){
        return "{" + "category:"+category.getCategory_name()+",method:"+method.getMethod_name()+",item:"+item+",timestamp:"+timestamp+",amount:"+amount+"}";
    }
}

