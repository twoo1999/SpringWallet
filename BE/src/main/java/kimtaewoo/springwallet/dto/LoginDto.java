package kimtaewoo.springwallet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LoginDto {
    private UUID uid;
    private String accessToken;
    private String refreshToken;
    
}
