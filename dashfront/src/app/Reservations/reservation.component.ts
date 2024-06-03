import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'app/models/reservation';
import { ReservationService } from 'app/services/reservation.service';
import { Chart } from 'chart.js/auto';
import  emailjs from '@emailjs/browser';
import { EmailRequest } from 'app/models/EmailRequest';
import { EmailService } from 'app/services/EmailService';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  
  reservations: Reservation[] = [];
  selectedReservation: Reservation | null = null;
  reservationForm: FormGroup;
  isModified: boolean = false;
  reservationStats: any = {}; // Ajout d'un objet pour stocker les statistiques

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  constructor( private emailService: EmailService,private reservationService: ReservationService, private fb: FormBuilder, private http: HttpClient) {
    this.reservationForm = this.fb.group({
      idreserv: [''],
      nomreserv: ['', Validators.required],
      nbrplace: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      description: ['', Validators.required],
      datereserv: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReservations();
    this.calculateStatistics(); // Calculer les statistiques après le chargement des réservations

  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      this.calculateStatistics(); // Calculer les statistiques après le chargement des réservations
    });
  }

  calculateStatistics(): void {
    this.reservationStats = {}; // Réinitialiser les statistiques
    this.reservations.forEach((reservation: Reservation) => {
      if (reservation.type in this.reservationStats) {
        this.reservationStats[reservation.type] += 1; // Incrémenter le nombre de réservations par type
      } else {
        this.reservationStats[reservation.type] = 1; // Initialiser le compteur à 1
      }
    });
    this.renderChart();
  }

  renderChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const labels = Object.keys(this.reservationStats);
    const data = Object.values(this.reservationStats);
    const backgroundColors = this.getBackgroundColors(labels); // Obtenir les couleurs de fond en fonction des types
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de réservations',
          data: data,
          backgroundColor: backgroundColors, // Utiliser les couleurs de fond obtenues
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  getBackgroundColors(labels: string[]): string[] {
    // Définir des couleurs différentes pour chaque type
    const colorsMap: { [key: string]: string } = {
      'vip': 'rgba(0, 255, 0, 0.2)', // Vert pour le type VIP
      'etudiant': 'rgba(255, 255, 0, 0.2)', // Jaune pour le type Etudiant
      'normal': 'rgba(0, 0, 255, 0.2)'  // Bleu pour le type Normal
      // Ajoutez autant de types et de couleurs que nécessaire
    };
  
    // Créer un tableau de couleurs de fond en utilisant les types comme clés pour obtenir les couleurs correspondantes
    return labels.map(label => colorsMap[label]);
  }

  selectReservation(reservation: Reservation): void {
    this.selectedReservation = { ...reservation };
    this.reservationForm.patchValue({
      idreserv: reservation.idreserv,
      nomreserv: reservation.nomreserv,
      nbrplace: reservation.nbrplace,
      type: reservation.type,
      description: reservation.description,
      datereserv: reservation.datereserv
    });
  }

  addReservation(): void {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(reservation).subscribe(() => {
        this.loadReservations();
        this.resetForm();
      });
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }

  updateReservation(): void {
    if (this.selectedReservation && this.reservationForm.valid) {
      const updatedReservation: Reservation = this.reservationForm.value;
      this.selectedReservation.nomreserv = updatedReservation.nomreserv;
      this.selectedReservation.nbrplace = updatedReservation.nbrplace;
      this.selectedReservation.type = updatedReservation.type;
      this.selectedReservation.description = updatedReservation.description;
      this.selectedReservation.datereserv = updatedReservation.datereserv;

      this.reservationService.updateReservation(this.selectedReservation).subscribe(() => {
        this.loadReservations();
        this.selectedReservation = null;
        this.resetForm();
      });
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }

  deleteReservation(idReservation: number): void {
    this.reservationService.deleteReservation(idReservation).subscribe(() => {
      this.loadReservations();
      this.selectedReservation = null;
    });
  }

  resetForm(): void {
    this.reservationForm.reset({
      idreserv: '',
      nomreserv: '',
      nbrplace: '',
      type: '',
      description: '',
      datereserv: ''
    });
  } 

 // emailjs.send("service_l6jjvsp","template_ifjhrxa",{
   // from_name: "mohamedguesmi",
    //to_name: "test",
    //from_email: "mohamed@esprit.tn",
    //message: "hello",
    //});


  sendReservationEmail(reservation: Reservation): void {
    const emailParams = {
      to_email: 'recipient@example.com', // Replace with the recipient's email address
      // Include other reservation details in the email
      nomreserv: reservation.nomreserv,
      nbrplace: reservation.nbrplace,
      type: reservation.type,
      description: reservation.description,
      datereserv: reservation.datereserv
    };
  
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully!', response);
        // Optionally, display a success message to the user
      }, (error) => {
        console.error('Error sending email:', error);
        // Optionally, display an error message to the user
      });
  }

  
emailRequest: EmailRequest = { to: '', subject: '', body: '' };

sendEmail() {
  this.emailService.sendEmail(this.emailRequest).subscribe(
    response => {
      console.log(response); // Handle success response
    },
    error => {
      console.error(error); // Handle error response
    }
  );
}
}
