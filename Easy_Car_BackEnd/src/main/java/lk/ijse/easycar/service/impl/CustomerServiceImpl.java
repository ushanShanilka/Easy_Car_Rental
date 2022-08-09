package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.dto.CustomerDTO;
import lk.ijse.easycar.entity.Admin;
import lk.ijse.easycar.entity.Customer;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.repo.CustomerRepo;
import lk.ijse.easycar.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;


    public boolean addCustomer ( CustomerDTO dto ) {
        if ( customerRepo.existsById ( dto.getId () ) ){
            throw  new ValidateException ( "Ehema Customer Kenek Innwa !" );
        }

        customerRepo.save ( modelMapper.map ( dto, Customer.class ) );
        return true;
    }


    public boolean deleteCustomer ( String id ) {
        if ( customerRepo.existsById ( id ) ){
            CustomerDTO dto = searchCustomer ( id );
            Customer customer = modelMapper.map ( dto, Customer.class );
            customerRepo.delete ( customer );
            return true;
        }
        throw  new ValidateException ( "Ehema Customer Kenek ne !" );
    }

    public CustomerDTO searchCustomer ( String id ) {
        if ( customerRepo.existsById ( id ) ){
            Optional<Customer> customer = customerRepo.findById ( id );
            if ( customer.isPresent () ){
                return modelMapper.map ( customer.get ( ), CustomerDTO.class );
            }
        }
        throw  new ValidateException ( "Ehema Customer Kenek ne !" );
    }

    public ArrayList<CustomerDTO> getAllCustomer ( ) {
        List<Customer> all = customerRepo.findAll ( );
        return modelMapper.map ( all, new TypeToken<ArrayList<CustomerDTO>> (){}.getType () );
    }

    public boolean updateCustomer ( CustomerDTO dto ) {
        if ( customerRepo.existsById ( dto.getId () ) ){
            customerRepo.save ( modelMapper.map ( dto, Customer.class ) );
            return  true;
        }
        throw  new ValidateException ( "Aulk thynw !" );
    }

    public CustomerDTO findCustomer ( String id, String password) {
        Optional<Customer> customerByIdAndPassword = customerRepo.getCustomerByIdAndPassword ( id, password );
        if ( customerByIdAndPassword.isPresent () ){
            Customer customer = customerByIdAndPassword.get ( );
            return  modelMapper.map ( customer,CustomerDTO.class);
        }
        return null;
    }

}
