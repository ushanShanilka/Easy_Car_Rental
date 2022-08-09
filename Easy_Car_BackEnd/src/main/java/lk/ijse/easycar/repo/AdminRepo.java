package lk.ijse.easycar.repo;

import lk.ijse.easycar.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,String> {
    Optional<Admin> findAdminByUserNameAndPassword( String userName, String password );
}
