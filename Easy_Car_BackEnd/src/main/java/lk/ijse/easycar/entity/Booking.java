package lk.ijse.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Booking {
    @Id
    private String reqId;
    private String withDriverOrWithOutDriver;
    private String pickupLocation;
    private String pickupDate;
    private String pickupTime;
    private String returnDate;
    private String vehicleType;
    private String acceptOrReject;
    @ManyToOne
    @JoinColumn(name = "car_ID",referencedColumnName = "registrationNumber")
    private Car car_ID;
    @ManyToOne
    @JoinColumn(name = "cus_ID",referencedColumnName = "id")
    private Customer cus_ID;
    @ManyToOne
    @JoinColumn(name = "driver_ID",referencedColumnName = "driverID")
    private Driver driver_ID;

}
