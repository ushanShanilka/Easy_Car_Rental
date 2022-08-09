package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.CustomerDTO;
import lk.ijse.easycar.dto.PlaceOrderDTO;
import lk.ijse.easycar.entity.PlaceOrder;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.repo.PlaceOrderRepo;
import lk.ijse.easycar.service.PlaceOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {

    @Autowired
    private PlaceOrderRepo placeorderRepo;

    @Autowired
    private ModelMapper modelMapper;


    public boolean addPlaceOrder(PlaceOrderDTO dto) {
        if ( placeorderRepo.existsById ( dto.getOrderID () ) ){
            throw new ValidateException ( "Echema Ordeer Ecac Thynwa !" );
        }
        placeorderRepo.save ( modelMapper.map ( dto, PlaceOrder.class ) );
        return true;
    }

    public boolean deletePlaceOrder(String id) {
        return false;
    }

    public PlaceOrderDTO searchPlaceOrder(String OrderID) {
        return null;
    }

    public ArrayList<PlaceOrderDTO> getAllPlaceOrders() {
        List<PlaceOrder> all = placeorderRepo.findAll ( );
        return modelMapper.map(all,new TypeToken<ArrayList<PlaceOrderDTO>>(){}.getType());
    }

    public boolean updatePlaceOrder(PlaceOrderDTO dto) {
        return false;
    }

}
