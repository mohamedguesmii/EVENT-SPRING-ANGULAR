import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RemplirreservationComponent } from './frontoffice/remplirreservation/remplirreservation.component';
import { routes } from './front-office-routing.module';
import { CreateReservComponent } from './frontoffice/create-reserv/create-reserv.component';
import { ComponentsModule } from "../../components/components.module";
import { EvenementfrontComponent } from './frontoffice/evenementfront/evenementfront.component';


@NgModule({
    declarations: [
        FrontofficeComponent,
        RemplirreservationComponent,
        CreateReservComponent,
        EvenementfrontComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        FrontOfficeRoutingModule,
        RouterModule.forChild(routes),
        RouterModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        ComponentsModule
    ]
})
export class FrontOfficeModule { }
