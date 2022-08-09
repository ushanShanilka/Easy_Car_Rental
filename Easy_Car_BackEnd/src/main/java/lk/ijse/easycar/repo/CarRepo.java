package lk.ijse.easycar.repo;

import lk.ijse.easycar.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {

    List<Car> findCarsByBradName (String brand);

    /** Find Vehicle By Vehicle Type **/
    List<Car> findVehicleByCarType(String type);

    /** Find Vehicle By Vehicle Daily Rate **/
    List<Car> findVehicleByDaiLRateBefore(double dailyRate);

    /** Find Vehicle By Vehicle Monthly Rate **/
    List<Car> findVehicleByMonthlyRateBefore(double monthlyRate);

    /** Find Vehicle By Vehicle TransMission Type **/
    List<Car> findVehicleByTransmissionType ( String transmissionType );

    /** Find Vehicle By Fuel Type **/
    List<Car> findVehicleByFuelType(String fuelType);
}
