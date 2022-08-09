package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.entity.Admin;

import java.util.Optional;

public interface AdminService {
    boolean addAdmin( AdminDTO dto );

    AdminDTO findAdmin(String userName, String password);
}
