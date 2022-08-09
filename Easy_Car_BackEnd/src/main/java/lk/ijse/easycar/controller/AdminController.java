package lk.ijse.easycar.controller;

import lk.ijse.easycar.dto.AdminDTO;
import lk.ijse.easycar.entity.Admin;
import lk.ijse.easycar.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public String saveAdmin(@RequestBody AdminDTO dto ){
        adminService.addAdmin ( dto );
        return "Ocay";
    }

    @GetMapping(path = "/search/{userName}/{password}")
    public AdminDTO findAdminUsrNameAndPassword(@PathVariable String userName,@PathVariable String password){
        return adminService.findAdmin ( userName, password );
    }
}
