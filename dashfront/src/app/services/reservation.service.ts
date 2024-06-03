import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'app/models/reservation'; // Assurez-vous de fournir le bon chemin vers votre modèle de réservation

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8089/api/reservations';

  constructor(private http: HttpClient) { }
  
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/AllReservations`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/ReservationById/${id}`);
  }

  addReservation(reservation: Reservation): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-reservation`, reservation);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/updateReservation`, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteReservation/${id}`);
  }

  
}
