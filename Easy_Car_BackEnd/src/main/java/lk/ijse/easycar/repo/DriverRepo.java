package lk.ijse.easycar.repo;

import lk.ijse.easycar.entity.Admin;
import lk.ijse.easycar.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DriverRepo extends JpaRepository<Driver , String> {
    Optional<Driver> findDriverByDriverIDAndDriverPassword( String driverId, String driverPassword );
}
