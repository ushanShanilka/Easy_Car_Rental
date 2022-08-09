package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.BookingDTO;
import lk.ijse.easycar.entity.Booking;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.service.BookingService;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity sendBooking( @RequestBody BookingDTO dto ){
        System.out.println ("jhbjhvjhv" );
        if ( dto.getReqId ().trim ().length ()<=0 ){
            throw new ValidateException ( "Request Id Wenas Karanna epa !" );
        }else if ( dto.getWithDriverOrWithOutDriver ().trim ().length ()<=0   ){
            throw new ValidateException ( "Driver Onathe nethethe?" );
        }else if ( dto.getPickupLocation ().trim ().length ()<=0   ){
            throw new ValidateException ( "PickUp Location Danna" );
        }else if ( dto.getPickupDate ().trim ().length ()<=0   ){
            throw new ValidateException ( "PickUp Date Danna" );
        }else if ( dto.getPickupTime ().trim ().length ()<=0   ){
            throw new ValidateException ( "PickUp Time Danna" );
        }
        bookingService.sendBooking ( dto );
        return new ResponseEntity ( new StandardResponse ( "201","Done",dto ), HttpStatus.CREATED );
    }

    @GetMapping("/bookingId/{id}")
    public ResponseEntity searchBooking(@PathVariable String id){
        BookingDTO dto = bookingService.searchBooking ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",dto ), HttpStatus.OK );
    }

    @DeleteMapping(path = "deleteBooking/{id}")
    public ResponseEntity deleteBooking(@PathVariable String id){
        if ( id.trim ().length ()<=0 ){
            throw new ValidateException ( "Delete aranna oona Id Eka danna !" );
        }
        bookingService.delete ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",null ), HttpStatus.OK );
    }

    @GetMapping
    public ResponseEntity getAllBookings(){
        ArrayList<BookingDTO> allBookings = bookingService.getAllBookings ( );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allBookings ), HttpStatus.OK );
    }

    @GetMapping(path = "/find/{id}/")
    public ResponseEntity getAllBookingsByCusId ( @PathVariable String id ){
        List<Booking> allBookingsByCusId = bookingService.findAllBookingsByCusId ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allBookingsByCusId ), HttpStatus.OK );
    }

    @GetMapping(path = "getDrivers/{id}")
    public ResponseEntity getAllBookingByDriverId(@PathVariable String id){
        List<Booking> allBookingsByDriverId = bookingService.findAllBookingsByDriverId ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allBookingsByDriverId ),HttpStatus.OK );
    }

    @GetMapping(path = "Pending/{acceptOrReject}")
    public ResponseEntity getAllBookingAcceptOrReject(@PathVariable String acceptOrReject ){
        List<Booking> allBookingsByAcceptOrReject = bookingService.findAllBookingsByAcceptOrReject ( acceptOrReject );
        return new ResponseEntity ( new StandardResponse ( "200","DOne",allBookingsByAcceptOrReject ),HttpStatus.OK );
    }

    @PutMapping
    public ResponseEntity updateBooking(@RequestBody BookingDTO dto){
        if ( dto.getReqId ().trim ().length ()<=0 ){
            throw new ValidateException ( "Request Id Denna !" );
        }
        bookingService.updateBooking ( dto);
        return new ResponseEntity ( new StandardResponse ( "200","Done",null ), HttpStatus.NO_CONTENT );
    }

}
