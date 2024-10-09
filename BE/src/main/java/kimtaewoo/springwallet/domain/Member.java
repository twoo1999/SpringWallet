package kimtaewoo.springwallet.domain;

import jakarta.persistence.*;
import kimtaewoo.springwallet.domain.enumClass.Role;
import kimtaewoo.springwallet.domain.enumClass.SocialType;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;


@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor()
@AllArgsConstructor
public class Member {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @UuidGenerator
    private UUID id;

    private String email;
    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialtype;

    private int analysis_count;

}
