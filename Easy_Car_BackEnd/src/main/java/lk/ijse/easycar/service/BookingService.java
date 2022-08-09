package lk.ijse.easycar.service;

import lk.ijse.easycar.dto.BookingDTO;
import lk.ijse.easycar.entity.Booking;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public interface BookingService {
    boolean sendBooking( BookingDTO dto);
    boolean updateBooking( BookingDTO dto);
    ArrayList<BookingDTO> getAllBookings();
    boolean delete (String id);
    BookingDTO searchBooking( String id);

    List<Booking> findAllBookingsByCusId ( String id);

    List<Booking> findAllBookingsByDriverId ( String id);

    List<Booking> findAllBookingsByAcceptOrReject  ( String acceptOrReject );
}
