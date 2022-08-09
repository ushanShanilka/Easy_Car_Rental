package lk.ijse.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
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
