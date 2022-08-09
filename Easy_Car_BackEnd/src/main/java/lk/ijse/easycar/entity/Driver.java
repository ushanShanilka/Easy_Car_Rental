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
public class Driver {
    @Id
    private String driverID;
    private String driverNIC;
    private String driverName;
    private String driverAddress;
    private String driverEmail;
    private int driverContact;
    private String driverPassword;
}
