package tn.esprit.devoir.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.devoir.entite.Reservation;

public interface ReservationRepo extends JpaRepository<Reservation,Integer> {
}
