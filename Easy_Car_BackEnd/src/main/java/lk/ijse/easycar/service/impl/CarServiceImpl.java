package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.CarDTO;
import lk.ijse.easycar.entity.Car;
import lk.ijse.easycar.repo.CarRepo;
import lk.ijse.easycar.service.CarService;
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
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addCar ( CarDTO dto ) {
        if ( carRepo.existsById ( dto.getRegistrationNumber () ) ){
            throw new RuntimeException ( "Ehema Car Ekak Thiyanawaa" );
        }
        carRepo.save ( modelMapper.map ( dto,Car.class ) );
        return true;
    }

    @Override
    public boolean deleteCar ( String id ) {
        if ( carRepo.existsById ( id ) ){
            CarDTO carDTO = searchCar ( id );
            carRepo.delete ( modelMapper.map ( carDTO,Car.class ) );
            return true;
        }
        throw new RuntimeException ( "Id Chek Karanna" );
    }


    @Override
    public CarDTO searchCar ( String registrationNumber ) {
        Optional<Car> car = carRepo.findById ( registrationNumber );
        if ( carRepo.existsById ( registrationNumber ) ){
            if ( car.isPresent () ){
                Car c = car.get ( );
                return new CarDTO ( c.getRegistrationNumber (),c.getBradName (),c.getCarType (),c.getImg1 (),c.getImg2 (),c.getImg3 (),c.getImg4 (),c.getNumberOfPassenger (),c.getTransmissionType (),c.getFuelType (),c.getDaiLRate (),c.getMonthlyRate (),c.getFreeMileageForThePriceAndDuration (),c.getPriceOfExtraKm (),c.getColor () );
            }
            return null;
        }
        throw new RuntimeException ( "Id Chek Karanna" );
    }

    @Override
    public ArrayList<CarDTO> getAllCar ( ) {
        List<Car> all = carRepo.findAll ( );
        return modelMapper.map ( all, new TypeToken<ArrayList<CarDTO>> (){}.getType () );
    }

    @Override
    public boolean updateCar ( CarDTO dto ) {
        if ( carRepo.existsById ( dto.getRegistrationNumber () ) ){
            carRepo.save ( modelMapper.map ( dto,Car.class ) );
            return true;

        }
        throw new RuntimeException ( "Id Chek Karanna" );
    }

    @Override
    public List<CarDTO> searchByBrand ( String brand ) {
        List<Car> all = carRepo.findCarsByBradName (brand);
        return modelMapper.map(all,new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> searchByType ( String type ) {
        List<Car> vehicle = carRepo.findVehicleByCarType (type);
        return modelMapper.map(vehicle,new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> searchByDailyRate ( double dailyRate ) {
        List<Car> vehicleByDaiLRateBefore = carRepo.findVehicleByDaiLRateBefore ( dailyRate );
        return modelMapper.map ( vehicleByDaiLRateBefore,new TypeToken<List<CarDTO>> (){}.getType () );
    }

    @Override
    public List<CarDTO> searchByMonthlyRate ( double monthlyRate ) {
        List<Car> vehicleByMonthlyRateBefore = carRepo.findVehicleByMonthlyRateBefore ( monthlyRate );
        return modelMapper.map ( vehicleByMonthlyRateBefore,new TypeToken<List<CarDTO>> (){}.getType () );
    }

    @Override
    public List<CarDTO> searchByTransType ( String transType ) {
        List<Car> vehicleByTransmissionType = carRepo.findVehicleByTransmissionType ( transType );
        return modelMapper.map ( vehicleByTransmissionType,new TypeToken<List<CarDTO>> (){}.getType () );
    }

    @Override
    public List<CarDTO> searchByFuelType ( String fuelType ) {
        List<Car> vehicleByFuelType = carRepo.findVehicleByFuelType ( fuelType );
        return modelMapper.map ( vehicleByFuelType,new TypeToken<List<CarDTO>> (){}.getType () );
    }
}
