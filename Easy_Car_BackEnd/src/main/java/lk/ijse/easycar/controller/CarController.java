package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.CarDTO;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.service.CarService;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/Car")
@CrossOrigin
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public ResponseEntity saveCar( @RequestBody CarDTO dto ){
        if ( dto.getRegistrationNumber ().trim ().length ()<=0 ){
            throw new ValidateException ( "Car Id Ekak Danna" );
        }else if ( dto.getBradName ().trim ().length ()<=0   ){
            throw new ValidateException ( "Brand Name Danna" );
        }else if ( dto.getCarType ().trim ().length ()<=0   ){
            throw new ValidateException ( "Car Type Name Danna" );
        }else if ( dto.getTransmissionType ().trim ().length ()<=0   ){
            throw new ValidateException ( "TransmissionType Danna " );
        }else if ( dto.getFuelType ().trim ().length ()<=0   ){
            throw new ValidateException ( "FuelType Danna" );
        }else if ( dto.getFreeMileageForThePriceAndDuration ().trim ().length ()<=0   ){
            throw new ValidateException ( "FreeMileageForThePriceAndDuration Danna" );
        }else if ( dto.getPriceOfExtraKm ()<=0   ){
            throw new ValidateException ( "PriceOfExtraKm Danna" );
        }else if ( dto.getColor ().trim ().length ()<=0   ){
            throw new ValidateException ( "Color Danna" );
        }


        boolean b = carService.addCar ( dto );
        return new ResponseEntity ( new StandardResponse ( "201", "Done", b ), HttpStatus.CREATED );
    }
    @GetMapping
    public ResponseEntity getAllCar(){
        ArrayList<CarDTO> allCar = carService.getAllCar ( );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", allCar ), HttpStatus.OK );
    }

    @GetMapping(path = "/{registrationNumber}")
    public ResponseEntity searchCar(@PathVariable String registrationNumber){
        if ( registrationNumber.trim ().length ()<=0 ){
            throw new ValidateException ( "CarID Id Ekak Danna" );
        }
        CarDTO carDTO = carService.searchCar ( registrationNumber );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", carDTO ), HttpStatus.OK );
    }

    @PutMapping
    public ResponseEntity updateCar(@RequestBody CarDTO dto){
        if ( dto.getRegistrationNumber ().trim ().length ()<=0 ){
            throw new ValidateException ( "Car Id Ekak Danna" );
        }
        carService.updateCar ( dto );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", null ), HttpStatus.OK );
    }

    @DeleteMapping(path = "/{registrationNumber}")
    public ResponseEntity deleteCar(@PathVariable String registrationNumber){
        if ( registrationNumber.trim ().length ()<=0 ){
            throw new ValidateException ( "CarID Id Ekak Danna" );
        }
        carService.deleteCar ( registrationNumber );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", null ), HttpStatus.OK );
    }

    @GetMapping(path = "brand/{brand}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByBrand(@PathVariable String brand) {
        List<CarDTO> carDTO = carService.searchByBrand( brand);
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }


    @GetMapping(path = "type/{type}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByType(@PathVariable String type) {
        List<CarDTO> carDTO = carService.searchByType(type);
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }


    @GetMapping(path = "dailyRate/{dailyRate}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByDailyRate(@PathVariable double dailyRate) {
        List<CarDTO> carDTO = carService.searchByDailyRate ( dailyRate );
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }


    @GetMapping(path = "monthlyRate/{monthlyRate}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByMonthlyRate(@PathVariable double monthlyRate) {
        List<CarDTO> carDTO = carService.searchByMonthlyRate(monthlyRate);
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }


    @GetMapping(path = "transType/{transType}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByTransType(@PathVariable String transType) {
        List<CarDTO> carDTO = carService.searchByTransType(transType);
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }


    @GetMapping(path = "fuelType/{fuelType}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchByFuelType(@PathVariable String fuelType) {
        List<CarDTO> carDTO = carService.searchByFuelType(fuelType);
        return new ResponseEntity(new StandardResponse("200", "Done", carDTO), HttpStatus.OK);
    }

}
