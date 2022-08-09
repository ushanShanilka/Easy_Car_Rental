package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.CarDTO;

import java.util.ArrayList;
import java.util.List;

public interface CarService {
    boolean addCar( CarDTO dto );
    boolean deleteCar( String id );
    CarDTO searchCar( String id );
    ArrayList<CarDTO> getAllCar();
    boolean updateCar(CarDTO dto);

    List<CarDTO> searchByBrand( String brand);

    List<CarDTO> searchByType(String type);

    List<CarDTO> searchByDailyRate(double dailyRate);

    List<CarDTO> searchByMonthlyRate(double monthlyRate);

    List<CarDTO> searchByTransType(String transType);

    List<CarDTO> searchByFuelType(String fuelType);
}
