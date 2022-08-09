package lk.ijse.easycar.repo;

import javafx.stage.Stage;
import lk.ijse.easycar.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking,String> {

    @Query(value = "select * from  booking where cus_ID =?1",nativeQuery=true)
    List<Booking> getAllBookingForCusId( String id );

    @Query(value = "select * from  booking where driver_ID =?1",nativeQuery=true)
    List<Booking> getAllBookingForDriverId( String id );

    @Query(value = "select * from  booking where acceptOrReject =?1",nativeQuery=true)
    List<Booking> getAllBookingForAcceptOrReject ( String acceptOrReject  );
}
