package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.dto.DriverDTO;
import lk.ijse.easycar.entity.Driver;
import lk.ijse.easycar.exception.ValidateException;
import lk.ijse.easycar.repo.DriverRepo;
import lk.ijse.easycar.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addDriver ( DriverDTO dto ) {
        if ( driverRepo.existsById ( dto.getDriverID () ) ){
            throw new ValidateException ( "Echema Collec innwa" );
        }
        driverRepo.save ( modelMapper.map ( dto,Driver.class ) );
        return true;
    }

    @Override
    public boolean deleteDriver ( String id ) {
        if ( driverRepo.existsById ( id ) ){
            DriverDTO driverDTO = searchDriver ( id );
            driverRepo.delete ( modelMapper.map ( driverDTO,Driver.class ) );
            return true;
        }
        throw new ValidateException ( "No Customer For Delete" );
    }

    public DriverDTO searchDriver ( String Id ) {
        if ( driverRepo.existsById ( Id ) ){
            Optional<Driver> driver = driverRepo.findById ( Id );
            if ( driver.isPresent () ){
                Driver d = driver.get ( );
                return new DriverDTO ( d.getDriverID (),d.getDriverNIC (),d.getDriverName (),d.getDriverAddress (),d.getDriverEmail (),d.getDriverContact (),d.getDriverPassword () );
            }
            return null;
        }
        throw new ValidateException ( "No Driver" );
    }

    @Override
    public ArrayList<DriverDTO> getAllDrivers ( ) {
        List<Driver> all = driverRepo.findAll ( );
        return modelMapper.map ( all,new TypeToken<ArrayList<DriverDTO>> (){}.getType () );
    }

    @Override
    public boolean updateDriver ( DriverDTO dto ) {
        if ( driverRepo.existsById ( dto.getDriverID () ) ){
            Driver driver = new Driver ( dto.getDriverID (),dto.getDriverNIC (),dto.getDriverName (),dto.getDriverAddress (),dto.getDriverEmail (),dto.getDriverContact (),dto.getDriverPassword () );
            driverRepo.save ( driver );
            return true;
        }
        throw new ValidateException ( "No Driver" );
    }

    @Override
    public DriverDTO findDriver ( String driverId, String driverPassword ) {
        Optional<Driver> driverByDriver_idAndDriver_password = driverRepo.findDriverByDriverIDAndDriverPassword ( driverId, driverPassword );
        if (driverByDriver_idAndDriver_password.isPresent () ){
            Driver driver = driverByDriver_idAndDriver_password.get ( );
            return new DriverDTO ( driver.getDriverID (),driver.getDriverNIC (),driver.getDriverName (),driver.getDriverAddress (),driver.getDriverEmail (),driver.getDriverContact (),driver.getDriverPassword () );
        }else {
            throw new ValidateException ( "No Driver" );
        }

    }


}
