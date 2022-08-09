package lk.ijse.easycar.dto;

import lk.ijse.easycar.entity.Car;
import lk.ijse.easycar.entity.Customer;
import lk.ijse.easycar.entity.Driver;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private String reqId;
    private String withDriverOrWithOutDriver;
    private String pickupLocation;
    private String pickupDate;
    private String pickupTime;
    private String returnDate;
    private String vehicleType;
    private String acceptOrReject;
    private Car car_ID;
    private Customer cus_ID;
    private Driver driver_ID;
}
