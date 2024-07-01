package kimtaewoo.springwallet.dto.method;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class DeleteMethodReqDto {
    private Long[] ids;
}
