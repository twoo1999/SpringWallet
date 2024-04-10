package kimtaewoo.springwallet.repository;

import kimtaewoo.springwallet.domain.RefreshToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class RefreshTokenRepository {
    private RedisTemplate redisTemplate;

    public RefreshTokenRepository(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(RefreshToken refreshToken) {
        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getToken(), refreshToken.getId());
        redisTemplate.expire(refreshToken.getToken(), 24, TimeUnit.HOURS);

    }

    public Optional<RefreshToken> findByToken(String refreshToken) {
        ValueOperations<String, Long> valueOperations = redisTemplate.opsForValue();
        Long id = valueOperations.get(refreshToken);

        if (Objects.isNull(id)) {
            return Optional.empty();
        }

        return Optional.of(new RefreshToken(refreshToken, id));
    }



}
