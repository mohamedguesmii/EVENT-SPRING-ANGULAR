package tn.esprit.devoir.service;


import tn.esprit.devoir.entite.Reservation;
import java.util.List;

public interface IReservationService {


    public Reservation ajouterReservation (Reservation reservation);
    public Reservation updateReservation(Reservation reservation);
    Reservation getReservationById(int id);
    void deleteReservation (int id);
   public List<Reservation> getAllReservations();
    Reservation AddReservationAndAssign(Reservation reservation,long IdEvent);

}
