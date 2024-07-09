package kimtaewoo.springwallet.domain;

import jakarta.persistence.*;
import kimtaewoo.springwallet.domain.enumClass.ActiveStatus;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Method {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID user_id;
    private String method_name;

    @Enumerated(EnumType.STRING)
    private ActiveStatus status;
}
