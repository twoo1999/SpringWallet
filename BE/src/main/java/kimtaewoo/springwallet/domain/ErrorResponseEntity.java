package kimtaewoo.springwallet.domain;


import kimtaewoo.springwallet.exception.ErrorCode;
import org.springframework.http.ResponseEntity;

public class ErrorResponseEntity {
    private int status;
    private String name;
    private String code;
    private String message;

    public ErrorResponseEntity(int status, String name, String code, String message) {
        this.status = status;
        this.name = name;
        this.code = code;
        this.message = message;
    }

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e) {
        ErrorResponseEntity er = new ErrorResponseEntity(e.getHttpStatus().value(), e.name(), e.getCode(), e.getMessage());

        return ResponseEntity.status(e.getHttpStatus())
                .body(er);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
