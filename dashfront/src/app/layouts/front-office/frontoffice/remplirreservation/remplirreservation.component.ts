import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importer le FormBuilder et FormGroup
import { Reservation } from 'app/models/reservation';
import { ReservationService } from 'app/services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remplirreservation',
  templateUrl: './remplirreservation.component.html',
  styleUrls: ['./remplirreservation.component.css']
})
export class RemplirreservationComponent {
  reservationForm: FormGroup; // Déclarer le formulaire comme un FormGroup
  reservation: Reservation = {
    idreserv: 1,
    nomreserv: '',
    nbrplace: 1,
    type: '',
    description: '',
    datereserv: new Date(),
    value: undefined,
    valid: undefined
  };

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {
    this.createForm(); // Appeler la méthode pour créer le formulaire
  }

  createForm() {
    this.reservationForm = this.formBuilder.group({
      nomreserv: ['', Validators.required], // Définir les validateurs requis
      nbrplace: [1, Validators.min(1)], // Valider que le nombre de places est supérieur ou égal à 1
      type: ['', Validators.required],
      description: [''],
      datereserv: [new Date(), Validators.required],
    });
  }

  addReservation(): void {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(reservation).subscribe(
        () => {
          this.loadReservations();
          this.resetForm();
        },
        (error) => {
          console.error('Une erreur est survenue lors de l\'ajout de la réservation :', error);
          // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
        }
      );
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }
  
  

  resetForm() {
    this.reservationForm.reset(); // Réinitialiser le formulaire
  }

  loadReservations() {
    // Implémenter le chargement des réservations
  }

  onSubmit() {
    console.log('Formulaire soumis :', this.reservationForm.value); // Utiliser la valeur du formulaire
    // Vous pouvez ajouter ici le code pour traiter la soumission du formulaire
  }


  
}
