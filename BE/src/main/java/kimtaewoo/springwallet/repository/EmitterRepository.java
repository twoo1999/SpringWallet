package kimtaewoo.springwallet.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class EmitterRepository {
    static Map<UUID, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public SseEmitter save(UUID uid, SseEmitter emitter) {
        emitterMap.put(uid, emitter);
        return emitter;
    }

    public void delete(UUID uuid) {
        emitterMap.remove(uuid);
    }

    public SseEmitter getEmitterByUserId(UUID uid) {
        return emitterMap.get(uid);
    }
}
