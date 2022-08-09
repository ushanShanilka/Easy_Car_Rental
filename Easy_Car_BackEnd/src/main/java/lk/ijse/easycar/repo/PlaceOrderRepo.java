package lk.ijse.easycar.repo;

import lk.ijse.easycar.entity.PlaceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceOrderRepo extends JpaRepository<PlaceOrder,String> {
}
