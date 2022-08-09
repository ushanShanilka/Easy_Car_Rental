package lk.ijse.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    private String registrationNumber;
    private String bradName;
    private String carType;
    private String img1;
    private String img2;
    private String img3;
    private String img4;
    private int numberOfPassenger;
    private String transmissionType ;
    private String fuelType ;
    private double daiLRate;
    private double monthlyRate;
    private String freeMileageForThePriceAndDuration;
    private double priceOfExtraKm;
    private String color;

}
