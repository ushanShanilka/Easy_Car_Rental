package lk.ijse.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class PlaceOrder {
    @Id
    private String orderID;
    private String monthlyOrDaily;
    private double period;
    private String depositMoney;
    private String totalValueForPeriod;
    private int contactNumber;
    @OneToOne
    @JoinColumn(name="req_ID",referencedColumnName = "reqId")
    private Booking req_ID;
    @ManyToOne
    @JoinColumn(name = "Car_ID",referencedColumnName = "registrationNumber")
    private Car Car_Id;
    @ManyToOne
    @JoinColumn(name = "Driver_ID",referencedColumnName = "driverID")
    private Driver Driver_ID;
}
