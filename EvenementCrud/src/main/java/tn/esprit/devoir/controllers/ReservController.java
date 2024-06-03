package tn.esprit.devoir.controllers;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devoir.entite.Reservation;
import tn.esprit.devoir.service.IReservationService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@Slf4j
@FieldDefaults(level= AccessLevel.PRIVATE)
@RequestMapping("/api/reservations")
public class ReservController {
    IReservationService iReservationService;

    @PostMapping("/assign/{idEvent}")
    public Reservation addReservationAndAssignEvent(@RequestBody Reservation reservation, @PathVariable("idEvent") long idEvent) {
        return iReservationService.AddReservationAndAssign(reservation, idEvent);
    }

    @GetMapping("/AllReservations")
    public List<Reservation> getAllReservations() {
        return iReservationService.getAllReservations();
    }

    @GetMapping("/ReservationById/{idreserv}")
    public Reservation getReservation(@PathVariable("idreserv") int idreserv) {
        return iReservationService.getReservationById(idreserv);
    }

    @PostMapping("/add-reservation")
    public void addReservation(@RequestBody Reservation r) {
        iReservationService.ajouterReservation(r);
    }

    @PutMapping("/updateReservation")
    public Reservation updateReservation(@RequestBody Reservation r) {
        return iReservationService.updateReservation(r);
    }

    @DeleteMapping("/deleteReservation/{id}")
    public void deleteReservation(@PathVariable("id") int id) {
        iReservationService.deleteReservation(id);
    }
}
