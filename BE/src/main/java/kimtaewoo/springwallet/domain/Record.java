package kimtaewoo.springwallet.domain;

import jakarta.persistence.*;
import kimtaewoo.springwallet.dto.record.CreateRecordReqDto;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor()
@AllArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID user_id;

    private String item;
    private LocalDate timestamp;

    private Integer amount;
    private String memo;


    @OneToOne
    @JoinColumn(name="category_id")
    private Category category;


   @OneToOne
   @JoinColumn(name="method_id")
   private Method method;


    public static Record toEntity(AccessTokenPayload atp, CreateRecordReqDto record, Category category, Method method){
        Record newR = Record.builder()
                .user_id(atp.getId())
                .item(record.getItem())
                .timestamp(record.getTimestamp())
                .amount(record.getAmount())
                .memo(record.getMemo())
                .category(category)
                .method(method)
                .build();

        return newR;

    }
}

