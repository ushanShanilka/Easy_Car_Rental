package lk.ijse.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {
    @Id
    private String id;
    private String name;
    private String email;
    private int contactNumber;
    private String address;
    private int drivingLicenseNumber;
    private String drivingLicenseImg;
    private int nicNumber;
    private String nicImg;
    private String password;
}
