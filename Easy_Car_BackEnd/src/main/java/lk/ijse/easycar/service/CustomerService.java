package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.dto.CustomerDTO;

import java.util.ArrayList;

public interface CustomerService {
    boolean addCustomer( CustomerDTO dto );
    boolean deleteCustomer( String id );
    CustomerDTO searchCustomer( String id );
    ArrayList<CustomerDTO> getAllCustomer();
    boolean updateCustomer(CustomerDTO dto);

    CustomerDTO findCustomer( String id,String password);

}
