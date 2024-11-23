package kimtaewoo.springwallet.domain;


import kimtaewoo.springwallet.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponseEntity {
    private int status;
    private String name;
    private String code;
    private String message;


    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e) {
        ErrorResponseEntity er = new ErrorResponseEntity(e.getHttpStatus().value(), e.name(), e.getCode(), e.getMessage());

        return ResponseEntity.status(e.getHttpStatus())
                .body(er);
    }

}
