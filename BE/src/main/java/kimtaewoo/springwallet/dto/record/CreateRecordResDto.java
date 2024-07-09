package kimtaewoo.springwallet.dto.record;

import kimtaewoo.springwallet.domain.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRecordResDto {
    private Long id;
    private UUID user_id;
    private String item;
    private LocalDate timestamp;
    private Integer amount;
    private String memo;
    private Long categoryId;
    private Long methodId;


    public static CreateRecordResDto build(Record r) {
        CreateRecordResDto res = CreateRecordResDto.builder()
                .id(r.getId())
                .user_id(r.getUser_id())
                .item(r.getItem())
                .timestamp(r.getTimestamp())
                .amount(r.getAmount())
                .memo(r.getMemo())
                .categoryId(r.getCategory().getId())
                .methodId(r.getMethod().getId())
                .build();

        return res;
    }
}


