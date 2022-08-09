package lk.ijse.easycar.repo;

import lk.ijse.easycar.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, String> {
    Optional<Customer> getCustomerByIdAndPassword ( String id,String password);
}
