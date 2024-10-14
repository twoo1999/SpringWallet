package kimtaewoo.springwallet.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Builder
public class ErrorResponseEntity {
    private HttpStatus status;
    private String code;
    private String message;

    public static ErrorResponseEntity toEntity(ErrorCode e){
        return ErrorResponseEntity.builder()
                .status(e.getHttpStatus())
                .code(e.getCode())
                .message(e.getMessage())
                .build();

    }

    public static String toSerializedString(ErrorCode e) throws JsonProcessingException {
        Map<String, String> res = new HashMap<>();
        res.put("status", Integer.toString(e.getHttpStatus().value()));
        res.put("code", e.getCode());
        res.put("message", e.getMessage());
        return new ObjectMapper().writeValueAsString(res);

    }
}

