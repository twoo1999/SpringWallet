package kimtaewoo.springwallet.dto.record;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;


@Getter
@Builder
public class CreateRecordReqDto {
    private String item;
    private Integer amount;
    private Long categoryId;
    private Long methodId;
    private LocalDate timestamp;
    private String memo;


}
