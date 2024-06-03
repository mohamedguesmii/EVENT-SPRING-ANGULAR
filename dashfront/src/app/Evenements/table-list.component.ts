import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evenement } from 'app/models/evenement';
import { EventService } from 'app/services/evenement.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  showNotification: boolean = false;
  notificationMessage: string = '';
  selectedFile: any;
  evenements: Evenement[] = [];
  selectedEvenement: Evenement | null = null;
  evenementForm: FormGroup;

  constructor(private evenementService: EventService, private fb: FormBuilder) {
    this.evenementForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      status: [''],
      datedebut: [new Date(), Validators.required],
      datefin: [new Date(), Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getAllEvenements().subscribe((evenements: Evenement[]) => {
      this.evenements = evenements;
    });
  }

  selectEvenement(evenement: Evenement): void {
    this.selectedEvenement = { ...evenement };
    this.evenementForm.patchValue({
      title: evenement.title,
      description: evenement.description,
      capacity: evenement.capacity,
      status: evenement.status,
      datedebut: evenement.datedebut,
      datefin: evenement.datefin,
      adresse: evenement.adresse
    });
  }

  addEvenement(): void {
    if (this.evenementForm.valid) {
      const evenement: Evenement = this.evenementForm.value;
      this.evenementService.addEvenement(evenement).subscribe(() => {
        this.loadEvenements();
        this.resetForm();
        this.notificationMessage = 'Événement ajouté avec succès!';
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      });
    } else {
      this.evenementForm.markAllAsTouched();
    }
  }
  
  updateEvenement(): void {
    if (this.selectedEvenement && this.evenementForm.valid) {
      const updatedEvenement: Evenement = this.evenementForm.value;
      this.selectedEvenement.title = updatedEvenement.title;
      this.selectedEvenement.description = updatedEvenement.description;
      this.selectedEvenement.capacity = updatedEvenement.capacity;
      this.selectedEvenement.status = updatedEvenement.status;
      this.selectedEvenement.datedebut = updatedEvenement.datedebut;
      this.selectedEvenement.datefin = updatedEvenement.datefin;
      this.selectedEvenement.adresse = updatedEvenement.adresse;
  
      this.evenementService.updateEvenement(this.selectedEvenement).subscribe(() => {
        this.loadEvenements();
        this.selectedEvenement = null;
        this.resetForm();
        this.notificationMessage = 'Événement modifié avec succès!';
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      });
    } else {
      this.evenementForm.markAllAsTouched();
    }
  }
  
  deleteEvenement(idEvenement: number): void {
    this.evenementService.deleteEvenement(idEvenement).subscribe(() => {
      this.loadEvenements();
      this.selectedEvenement = null;
      this.notificationMessage = 'Événement supprimé avec succès!';
      setTimeout(() => {
        this.notificationMessage = '';
      }, 3000);
    });
  }
  

  resetForm(): void {
    this.evenementForm.reset({
      title: '',
      description: '',
      capacity: 0,
      status: '',
      datedebut: new Date(),
      datefin: new Date(),
      adresse: ''
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  updateRating(id: number, newRating: number) {
    this.evenementService.updateRating(id, newRating)
      .subscribe(response => {
        console.log('Rating updated successfully:', response);
        this.loadEvenements();
      }, error => {
        console.error('Error updating rating:', error);
      });
  }

  private showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
