package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.dto.DriverDTO;

import java.util.ArrayList;

public interface DriverService {
    boolean addDriver( DriverDTO dto );
    boolean deleteDriver( String id );
    DriverDTO searchDriver( String registrationNumber );
    ArrayList<DriverDTO> getAllDrivers();
    boolean updateDriver(DriverDTO dto);

    DriverDTO findDriver(String driverId, String driverPassword);
    /*DriverDTO findDriver (String driverId, String driverPassword);*/
}
