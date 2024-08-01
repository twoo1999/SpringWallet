package kimtaewoo.springwallet.domain;

import jakarta.persistence.Id;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.util.UUID;

public class RefreshToken {

    @Id
    private String token;

//    private Long id;

    private UUID id;
    public RefreshToken(String token, UUID id) {
        this.token = token;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
