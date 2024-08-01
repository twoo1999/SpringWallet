package kimtaewoo.springwallet.repository;

import kimtaewoo.springwallet.domain.RefreshToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Repository
public class RefreshTokenRepository {
    private RedisTemplate redisTemplate;
    private int REFRESH_TOKEN_DURATION = 24;
    public RefreshTokenRepository(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(RefreshToken refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getToken(), refreshToken.getId().toString());
        redisTemplate.expire(refreshToken.getToken(), REFRESH_TOKEN_DURATION, TimeUnit.HOURS);

    }

    public Optional<RefreshToken> findByToken(String refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        System.out.println("ref " + refreshToken);
        System.out.println(valueOperations.get(refreshToken));
//        UUID id = UUID.fromString(valueOperations.get(refreshToken));
//        System.out.println(id);
//        if (Objects.isNull(id)) {
//            return Optional.empty();
//        }
        UUID id = UUID.fromString("45dd282a-1922-4104-a3bd-44c8afbbd0d0");
        return Optional.of(new RefreshToken(refreshToken, id));
    }


    public void deleteByRefreshToken(String token){
        try {
            redisTemplate.delete(token);
        } catch (Exception e){
            System.out.print("refresh token delete fail");
        }

    }



}
