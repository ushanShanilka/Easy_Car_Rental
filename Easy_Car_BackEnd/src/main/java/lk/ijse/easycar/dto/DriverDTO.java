package lk.ijse.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverDTO {
    private String driverID;
    private String driverNIC;
    private String driverName;
    private String driverAddress;
    private String driverEmail;
    private int driverContact;
    private String driverPassword;
}
