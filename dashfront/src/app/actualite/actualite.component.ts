import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActualiteService } from 'app/services/actualiteService/actualite.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  file: File;
  formData: any = new FormData();
  actuality: any;
  actualites: any[];
  notificationMessage: any;
  showNotification: any;

  constructor(private actualteService: ActualiteService, private router: Router) { }

  ngOnInit() {
    this.loadActualites(); // Appel de la fonction load dans le ngOnInit
  }

  loadActualites() {
    this.actualteService.getall().subscribe(
      (result) => {
        console.log(result);
        this.actualites = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fileuploded(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onSubmit() {
    this.formData.append("file", this.file);
    this.formData.append("actuality", this.actuality);
    console.log("jehjzeh");

    this.actualteService.addData(this.file).subscribe(
      (result) => {
        console.log(result.url);
        this.actualteService.add(this.actuality, result.url).subscribe(
          (results) => {
            console.log(results);
            this.loadActualites(); // Recharge les actualités après avoir ajouté une nouvelle actualité
          }
        );

      }, (error) => {
        console.log(error);
      }
    );
  }

  update(id) {
    this.router.navigate([`/update/${id}`]);
  }

  delete(id) {
    this.actualteService.delete(id).subscribe(
      (result) => {
        this.loadActualites(); // Recharge les actualités après avoir supprimé une actualité
      }, (error) => {
        console.log(error);
      }
    );
  }
  private showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
