package org.green.hr.exception;

import java.util.Objects;
import org.green.core.model.response.CoreResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandle {

  @ExceptionHandler(value = AppException.class)
  ResponseEntity<CoreResponse> handleDepartmentException(AppException exception) {
    ErrorCode errorCode = exception.getErrorCode();
    CoreResponse coreResponse = new CoreResponse();
    coreResponse.setCode(errorCode.getCode());
    coreResponse.setMessage(errorCode.getMessage());
    return ResponseEntity.status(errorCode.getHttpStatus()).body(coreResponse);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  ResponseEntity<CoreResponse> handleDepartmentValidation(
      MethodArgumentNotValidException exception) {
    String enumkey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
    ErrorCode errorCode = ErrorCode.valueOf(enumkey);

    CoreResponse coreResponse = new CoreResponse();
    coreResponse.setCode(errorCode.getCode());
    coreResponse.setMessage(errorCode.getMessage());
    return ResponseEntity.status(errorCode.getHttpStatus()).body(coreResponse);
  }
  @ExceptionHandler(value = IllegalArgumentException.class)
  ResponseEntity<CoreResponse> handleIllegalArgumentException(IllegalArgumentException exception) {
    String message = exception.getMessage();
    ErrorCode errorCode = ErrorCode.valueOf(message);

    CoreResponse coreResponse = new CoreResponse();
    coreResponse.setCode(errorCode.getCode());
    coreResponse.setMessage(errorCode.getMessage());
    return ResponseEntity.status(errorCode.getHttpStatus()).body(coreResponse);
  }

}
