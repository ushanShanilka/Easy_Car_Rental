package lk.ijse.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Entity;
import org.springframework.data.annotation.Id;


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
