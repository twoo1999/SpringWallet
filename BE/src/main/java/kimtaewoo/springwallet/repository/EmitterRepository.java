package kimtaewoo.springwallet.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class EmitterRepository {
    static Map<UUID, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public void save(UUID uid, SseEmitter emitter) {
        emitterMap.put(uid, emitter);
    }

    public void delete(UUID uuid) {
        emitterMap.remove(uuid);
    }

}
