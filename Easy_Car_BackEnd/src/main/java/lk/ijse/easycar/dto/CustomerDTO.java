package lk.ijse.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
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
