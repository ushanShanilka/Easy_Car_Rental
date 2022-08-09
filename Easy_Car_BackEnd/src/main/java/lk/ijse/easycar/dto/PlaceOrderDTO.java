package lk.ijse.easycar.dto;

import lk.ijse.easycar.entity.Booking;
import lk.ijse.easycar.entity.Car;
import lk.ijse.easycar.entity.Driver;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlaceOrderDTO {
    private String orderID;
    private String monthlyOrDaily;
    private double period;
    private String depositMoney;
    private String totalValueForPeriod;
    private int contactNumber;
    private Booking req_ID;
    private Car Car_Id;
    private Driver Driver_ID;
}
