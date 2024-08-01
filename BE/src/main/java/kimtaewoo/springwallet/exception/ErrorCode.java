package kimtaewoo.springwallet.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    NOT_VALID_TOKEN(HttpStatus.BAD_REQUEST, "AUTH-001", "no valid token."),
    EXPIRED_ACCEESS_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH-002", "expired access token."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH-003", "expired refresh token.");
//    NOT_EXIST_COOKIE(HttpStatus.BAD_REQUEST, "AUTH-003", "no matching cookie value"),



    private final HttpStatus httpStatus;
    private final String code;
    private final String message;


}




