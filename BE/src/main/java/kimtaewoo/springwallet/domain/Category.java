package kimtaewoo.springwallet.domain;

import jakarta.persistence.*;
import kimtaewoo.springwallet.domain.enumClass.ActiveStatus;
import kimtaewoo.springwallet.domain.enumClass.CategoryType;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID member_id;
    private String category_name;

    @Enumerated(EnumType.STRING)
    private CategoryType type;

    @Enumerated(EnumType.STRING)
    private ActiveStatus status;

    public static Category toEntity(UUID uid, String name, CategoryType type, ActiveStatus status) {
        return Category.builder()
                .category_name(name)
                .type(type)
                .member_id(uid)
                .status(ActiveStatus.ACTIVE)
                .build();
    }
}
