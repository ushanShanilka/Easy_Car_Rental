package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.PlaceOrderDTO;

import java.util.ArrayList;

public interface PlaceOrderService {
    boolean addPlaceOrder( PlaceOrderDTO dto );
    boolean deletePlaceOrder( String id );
    PlaceOrderDTO searchPlaceOrder( String OrderID );
    ArrayList<PlaceOrderDTO> getAllPlaceOrders();
    boolean updatePlaceOrder(PlaceOrderDTO dto);
}
