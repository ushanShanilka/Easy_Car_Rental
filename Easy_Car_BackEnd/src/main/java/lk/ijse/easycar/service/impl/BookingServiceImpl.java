package lk.ijse.easycar.service.impl;

import lk.ijse.easycar.dto.BookingDTO;
import lk.ijse.easycar.entity.Booking;
import lk.ijse.easycar.repo.BookingRepo;
import lk.ijse.easycar.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean sendBooking ( BookingDTO dto ) {
        if ( bookingRepo.existsById ( dto.getReqId () ) ){
            throw new RuntimeException ( "Ehema Booking Ekka thynwa" );
        }
        Booking map = modelMapper.map ( dto, Booking.class );
        bookingRepo.save (map);
        return true;
    }

    @Override
    public boolean updateBooking ( BookingDTO dto ) {
        if ( bookingRepo.existsById ( dto.getReqId () ) ){
            Booking map = modelMapper.map ( dto, Booking.class );
            bookingRepo.save ( map );
            return true;
        }
        throw new RuntimeException ( "Check You Id" );
    }

    @Override
    public ArrayList<BookingDTO> getAllBookings ( ) {
        List<Booking> all = bookingRepo.findAll ( );
        return modelMapper.map ( all , new TypeToken<ArrayList<BookingDTO>> (){}.getType () );
    }

    @Override
    public boolean delete ( String id ) {
        if ( bookingRepo.existsById ( id ) ){
            BookingDTO dto = searchBooking ( id );
            Booking booking = modelMapper.map ( dto, Booking.class );
            bookingRepo.delete ( booking );
            return true;

        }
        throw  new RuntimeException ( "Ehema eke ne" );
    }

    @Override
    public BookingDTO searchBooking ( String id ) {
        Optional<Booking> byId = bookingRepo.findById ( id );
        return modelMapper.map ( byId, BookingDTO.class );
    }

    @Override
    public List<Booking> findAllBookingsByCusId ( String id ) {
        List<Booking> allBookingForCusId = bookingRepo.getAllBookingForCusId ( id );
        return modelMapper.map ( allBookingForCusId,new TypeToken<List<Booking>> (){}.getType () );
    }

    @Override
    public List<Booking> findAllBookingsByDriverId ( String id ) {
        List<Booking> allBookingForDriverId = bookingRepo.getAllBookingForDriverId ( id );
        return modelMapper.map ( allBookingForDriverId,new TypeToken<List<Booking>> (){}.getType () );
    }

    @Override
    public List<Booking> findAllBookingsByAcceptOrReject ( String acceptOrReject ) {
        List<Booking> allBookingForAcceptOrReject = bookingRepo.getAllBookingForAcceptOrReject ( acceptOrReject );
        return modelMapper.map ( allBookingForAcceptOrReject,new TypeToken<List<Booking>> (){}.getType () );
    }

}
