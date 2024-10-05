package kimtaewoo.springwallet.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID user_id;
    private LocalDate start_date;
    private LocalDate end_date;
    private String type;
    private String result;

    public static Analysis toEntity(UUID uid, LocalDate start, LocalDate end, String type, String result) {
        return Analysis.builder()
                .user_id(uid)
                .start_date(start)
                .end_date(end)
                .type(type)
                .result(result)
                .build();
    }

}
