package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.entity.Admin;
import lk.ijse.easycar.repo.AdminRepo;
import lk.ijse.easycar.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addAdmin ( AdminDTO dto ) {
        adminRepo.save ( modelMapper.map ( dto,Admin.class ) );
        return true;
    }

    @Override
    public AdminDTO findAdmin ( String userName, String password ) {
        Optional<Admin> adminByUserNameAndPassword = adminRepo.findAdminByUserNameAndPassword ( userName, password );
        if ( adminByUserNameAndPassword.isPresent () ){
            Admin admin = adminByUserNameAndPassword.get ( );
            return new AdminDTO ( admin.getUserName (),admin.getPassword () );
        }
        return null;
    }
}
