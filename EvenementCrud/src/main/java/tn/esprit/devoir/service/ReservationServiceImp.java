package tn.esprit.devoir.service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.devoir.entite.Evenement;
import tn.esprit.devoir.entite.Reservation;
import tn.esprit.devoir.repository.EvenementRepo;
import tn.esprit.devoir.repository.ReservationRepo;

import java.util.List;


@Slf4j
@Service
@AllArgsConstructor
public class ReservationServiceImp implements IReservationService{
    ReservationRepo reservationRepo;
    EvenementRepo evenementRepo;



    @Override
    public Reservation ajouterReservation(Reservation reservation) {return reservationRepo.save(reservation);}

    @Override
    public Reservation updateReservation(Reservation reservation) {return reservationRepo.save(reservation);}

    @Override
    public Reservation getReservationById(int id) {
        return reservationRepo.findById(id).orElse(null);
    }


    @Override
    public void deleteReservation(int id) {reservationRepo.deleteById(id);}


    @Override
    public List<Reservation> getAllReservations() { return reservationRepo.findAll();
    }

    @Override
    public Reservation AddReservationAndAssign(Reservation reservation,long IdEvent) {
        Evenement event = evenementRepo.findById (IdEvent).get();
        reservation.setEvenement(event);
        return reservationRepo.save(reservation);

    }

}
