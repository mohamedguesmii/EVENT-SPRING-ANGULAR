import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontOfficeModule } from './layouts/front-office/front-office.module';
import { ReservationComponent } from './Reservations/reservation.component';
import { FileComponent } from './file/file.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FrontOfficeModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FileComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
