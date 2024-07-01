package kimtaewoo.springwallet.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Getter
@NoArgsConstructor()
@AllArgsConstructor
@Builder
public class AccessTokenPayload {
    private UUID id;
    private String email;
    private String name;
    private int iat;

//    public AccessTokenPayload(){}

//    public AccessTokenPayload(String email, String name, int iat) {
//        this.email = email;
//        this.name = name;
//        this.iat = iat;
//    }

}
