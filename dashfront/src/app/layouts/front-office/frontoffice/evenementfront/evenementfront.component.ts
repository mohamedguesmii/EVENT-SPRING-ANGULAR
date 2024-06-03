import { Component, OnInit } from '@angular/core';
import { Ticket } from 'app/models/ticket'; // Importez votre modèle de ticket
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/services/ticket.service';

@Component({
  selector: 'app-evenementfront',
  templateUrl: './evenementfront.component.html',
  styleUrls: ['./evenementfront.component.css']
})
export class EvenementfrontComponent implements OnInit {
  tickets: Ticket[] = [];
  eventId!: number;

  constructor(private ticketService: TicketService,
              private fb: FormBuilder,
              private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTickets();
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Le '+' convertit la valeur en nombre
    });
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data;
        console.log('Tickets:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des tickets', error);
      }
    );
  }

  searchFunction() {
    // Votre fonction de recherche, si nécessaire
  }

  sortTable(property: string) {
    this.tickets.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  advancedSort(property: string, order: 'asc' | 'desc') {
    this.tickets.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      
      if (order === 'asc') {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
      } else if (order === 'desc') {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
      }
      
      return 0;
    });
  }

  exportToCSV() {
    const csv = [];
    const rows = document.querySelectorAll("#eventTable tr");
    for (let i = 0; i < rows.length; i++) {
      const row = [];
      const cols = rows[i].querySelectorAll("td, th");
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].textContent);
      }
      csv.push(row.join(","));
    }
    const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
  }

 
  
   

  

 
  
}
