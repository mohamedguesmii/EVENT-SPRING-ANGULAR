import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { RemplirreservationComponent } from './frontoffice/remplirreservation/remplirreservation.component';
import { CreateReservComponent } from './frontoffice/create-reserv/create-reserv.component';
import { EvenementfrontComponent } from './frontoffice/evenementfront/evenementfront.component';
export const routes: Routes = [



  {path:'',component:FrontofficeComponent},
  {path: 'reservation',component: RemplirreservationComponent },
  {path:"reserv/:id",component:CreateReservComponent},
  {path:"liste",component:EvenementfrontComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
