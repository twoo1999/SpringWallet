package kimtaewoo.springwallet.exception;

import kimtaewoo.springwallet.domain.ErrorResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice
//public class CustomExceptionHandler {
//    @ExceptionHandler(CustomException.class)
//    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e) {
//        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
//    }
//}
