package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.dto.CustomerDTO;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.service.CustomerService;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity saveCustomer( @RequestBody CustomerDTO dto){
        if ( dto.getId ().trim ().length ()<=0 ){
            throw new ValidateException ( "Id Ekak Dapan Collo" );
        }else if (  dto.getName ().trim ().length ()<=0  ){
            throw new ValidateException ( "Name Ekak Dapan Collo" );
        }else if ( dto.getEmail ().trim ().length ()<=0   ){
            throw new ValidateException ( "Email Ekak Dapan Collo" );
        }else if ( dto.getAddress ().trim ().length ()<=0   ){
            throw new ValidateException ( "Address Ekak Dapan Collo" );
        }else if ( dto.getPassword ().trim ().length ()<=0   ){
            throw new ValidateException ( "Password Ekak Dapan Collo" );
        }

        customerService.addCustomer ( dto );
        return new ResponseEntity ( new StandardResponse ( "201", "Done", dto ), HttpStatus.CREATED );
    }
    @DeleteMapping(params = {"id"})
    public ResponseEntity deleteCustomer(@RequestParam String id){
        if ( id.trim ().length ()<=0 ){
            throw new ValidateException ( "Id Ekak Dapan Collo" );
        }
        customerService.deleteCustomer ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Delete Una",null ),HttpStatus.OK );
    }


    @PutMapping
    public ResponseEntity updateCustomer(@RequestBody CustomerDTO dto){
        if ( dto.getId ().trim ().length ()<=0 ){
            throw new ValidateException ( "Ida Ekak Dapan Collo" );
        }
        customerService.updateCustomer ( dto );
        return new ResponseEntity ( new StandardResponse ( "200","Update Una",null ), HttpStatus.OK );
    }

    @GetMapping
    public ResponseEntity getAllCustomer(){
        ArrayList<CustomerDTO> allCustomer = customerService.getAllCustomer ( );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allCustomer ), HttpStatus.OK );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity searchCustomer(@PathVariable String id){
        CustomerDTO dto = customerService.searchCustomer ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",dto ), HttpStatus.OK );
    }

    @GetMapping(path = "/search/{id}/{password}")
    public CustomerDTO findCustomerIdAndPassword( @PathVariable String id, @PathVariable String password){
        return customerService.findCustomer ( id, password );
    }
}
