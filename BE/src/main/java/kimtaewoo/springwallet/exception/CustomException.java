package kimtaewoo.springwallet.exception;

public class CustomException extends RuntimeException{
    ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
