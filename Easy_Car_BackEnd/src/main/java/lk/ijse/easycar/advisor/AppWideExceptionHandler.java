package lk.ijse.easycar.advisor;

import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class  AppWideExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity handelException(Exception e){
        return new ResponseEntity ( new StandardResponse ( "500","ERROR",e.getMessage () ), HttpStatus.INTERNAL_SERVER_ERROR );
    }
    @ExceptionHandler(lk.ijse.easycar.exception.NotFoundException.class)
    public ResponseEntity handelNotFoundException( lk.ijse.easycar.exception.NotFoundException e ){
        return new ResponseEntity ( new StandardResponse ( "404","ERROR",e.getMessage () ),HttpStatus.NOT_FOUND );
    }
    @ExceptionHandler(ValidateException.class)
    public ResponseEntity handelValidateException( ValidateException e ){
        return new ResponseEntity ( new StandardResponse ( "400","ERROR",e.getMessage () ), HttpStatus.BAD_REQUEST );
    }
}
