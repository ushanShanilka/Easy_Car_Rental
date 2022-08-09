package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.DriverDTO;
import lk.ijse.easycar.exception.NotFoundException;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.service.DriverService;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/Driver")
@CrossOrigin
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    public ResponseEntity saveDriver( @RequestBody DriverDTO dto){

        if ( dto.getDriverID ().trim ().length ()<=0 ){
            throw new NotFoundException ( "Customer Id CanNot be empty" );
        }else if ( dto.getDriverNIC ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver NIC CanNot be empty" );
        }else if ( dto.getDriverName ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver Name CanNot be empty" );
        }else if ( dto.getDriverAddress ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver Address CanNot be empty" );
        }else if ( dto.getDriverEmail ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver Email CanNot be empty" );
        }else if ( dto.getDriverContact ()<=0   ){
            throw new ValidateException ( "Driver Contact Number CanNot be empty" );
        }else if ( dto.getDriverPassword ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver Password CanNot be empty" );
        }


        driverService.addDriver ( dto );
        return new ResponseEntity ( new StandardResponse ( "201","Done",dto ), HttpStatus.CREATED );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity SearchDriver( @PathVariable String id){
        DriverDTO driverDTO = driverService.searchDriver ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",driverDTO ), HttpStatus.OK );
    }

    @GetMapping
    public ResponseEntity getAlDrivers(){

        ArrayList<DriverDTO> allDrivers = driverService.getAllDrivers ( );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allDrivers ), HttpStatus.OK );
    }

    @DeleteMapping(params = {"id"})
    public ResponseEntity deleteDriver(@RequestParam String id){
        driverService.deleteDriver ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",null ), HttpStatus.OK );
    }

    @PutMapping
    public ResponseEntity updateDriver(@RequestBody DriverDTO dto){

        if ( dto.getDriverID ().trim ().length ()<=0 ){
            throw new NotFoundException ( "Id Eka Dapan" );
        }
        driverService.updateDriver ( dto );
        return new ResponseEntity ( new StandardResponse ( "200","Done",null ), HttpStatus.NO_CONTENT );
    }
    @GetMapping(path = "/find/{driverId}/{driverPassword}")
    public ResponseEntity findDriverIdAndPassword(@PathVariable String driverId,@PathVariable String driverPassword){
        DriverDTO driver = driverService.findDriver ( driverId, driverPassword );
        return new ResponseEntity ( new StandardResponse ( "200","Done",driver ), HttpStatus.OK );
    }
}
