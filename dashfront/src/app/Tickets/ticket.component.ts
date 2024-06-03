import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'app/models/ticket';
import { TicketService } from 'app/services/ticket.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  ticketForm: FormGroup;
  isModified: any;
  ticketStats: any;
  @ViewChild('chartCanvasRef') chartCanvasRef!: ElementRef;


  constructor(private ticketService: TicketService, private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      nbrticket: ['', Validators.required],
      type: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      numero: ['', Validators.required],
      datevente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTickets();
    this.calculateStatistics(); // Appel à la méthode pour calculer les statistiques lors de l'initialisation
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.calculateStatistics(); // Calculer les statistiques après le chargement des réservations

    });
  }

  selectTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.ticketForm.patchValue({
      nbrticket: ticket.nbrticket,
      type: ticket.type,
      prix: ticket.prix,
      description: ticket.description,
      numero: ticket.numero,
      datevente: ticket.datevente
    });
  }

  addTicket(): void {
    if (this.ticketForm.valid) {
      const ticket: Ticket = this.ticketForm.value;
      this.ticketService.addTicket(ticket).subscribe(() => {
        this.loadTickets();
        this.calculateStatistics(); // Recalculer les statistiques après l'ajout d'un ticket
        this.resetForm();
      });
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

  updateTicket(): void {
    if (this.selectedTicket && this.ticketForm.valid) {
      const updatedTicket: Ticket = this.ticketForm.value;
      updatedTicket.idticket = this.selectedTicket.idticket; // Assurez-vous que l'identifiant du ticket est conservé
      this.ticketService.updateTicket(updatedTicket).subscribe(() => {
        this.loadTickets();
        this.selectedTicket = null;
        this.calculateStatistics(); // Recalculer les statistiques après la mise à jour d'un ticket
        this.resetForm();
      });
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

  deleteTicket(idTicket: number): void {
    this.ticketService.deleteTicket(idTicket).subscribe(() => {
      this.loadTickets();
      this.selectedTicket = null;
      this.calculateStatistics(); // Recalculer les statistiques après la suppression d'un ticket
    });
  }

  calculateStatistics(): void {
    this.ticketStats = {}; // Réinitialiser les statistiques
    this.tickets.forEach((ticket: Ticket) => {
      if (ticket.type in this.ticketStats) {
        this.ticketStats[ticket.type] += 1; // Incrémenter le nombre de tickets par type
      } else {
        this.ticketStats[ticket.type] = 1; // Initialiser le compteur à 1
      }
    });
    this.renderChart();
  }

  renderChart(): void {
    const ctx = this.chartCanvasRef.nativeElement.getContext('2d');
    
    // Définir un tableau de couleurs pour chaque type de ticket
    const colors = [
      'rgba(255, 99, 132, 0.2)',  // Rouge
      'rgba(54, 162, 235, 0.2)',  // Bleu
      'rgba(255, 206, 86, 0.2)',  // Jaune
      'rgba(75, 192, 192, 0.2)',  // Vert
      'rgba(153, 102, 255, 0.2)'  // Violet
      // Ajoutez d'autres couleurs au besoin
    ];
  
    // Générer un tableau de couleurs pour chaque donnée de ticket
    const backgroundColors = Object.keys(this.ticketStats).map((type, index) => {
      return colors[index % colors.length]; // Répéter les couleurs si nécessaire
    });
  
    // Créer le graphique avec les couleurs définies
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.ticketStats),
        datasets: [{
          label: 'Nombre de tickets',
          data: Object.values(this.ticketStats),
          backgroundColor: backgroundColors, // Utiliser les couleurs définies
          borderColor: 'rgba(255, 255, 255, 1)', // Couleur de bordure blanche
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
  

  resetForm(): void {
    this.ticketForm.reset({
      nbrticket: '',
      type: '',
      prix: '',
      description: '',
      numero: '',
      datevente: ''
    });
  }
}
