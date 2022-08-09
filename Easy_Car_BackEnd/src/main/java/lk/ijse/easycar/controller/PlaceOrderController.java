package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.PlaceOrderDTO;
import lk.ijse.easycar.exception.NotFoundException;
import lk.ijse.easycar.service.PlaceOrderService;
import lk.ijse.easycar.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/placeOrder")
@CrossOrigin
public class PlaceOrderController {

    @Autowired
    private PlaceOrderService placeOrderService;

    @PostMapping
    public ResponseEntity saveOrder(@RequestBody PlaceOrderDTO dto ){
        if ( dto.getOrderID ().trim ().length ()<=0 ){
            throw new NotFoundException ( "Order Id CanNot be empty. please try again" );
        }
        placeOrderService.addPlaceOrder ( dto );
        return new ResponseEntity ( new StandardResponse ( "201", "Done", dto ), HttpStatus.CREATED );
    }

    @GetMapping
    private ResponseEntity getAllPlaceOrder(){
        ArrayList<PlaceOrderDTO> all = placeOrderService.getAllPlaceOrders();
        return new ResponseEntity ( new StandardResponse ( "200","Done",all ),HttpStatus.OK );

    }
}
