package kimtaewoo.springwallet.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    NOT_VALID_TOKEN(HttpStatus.BAD_REQUEST, "AUTH-001", "유효하지 않는 토큰입니다."),
    ALREADY_EXPRIED_TOKEN(HttpStatus.BAD_REQUEST, "AUTH-002", "유효기간이 지난 토큰입니다."),
    NOT_EXIST_COOKIE(HttpStatus.BAD_REQUEST, "AUTH-003", "해당하는 쿠키가 없습니다.");



    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}




