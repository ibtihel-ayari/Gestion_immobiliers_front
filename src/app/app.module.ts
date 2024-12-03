import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnonceListComponent } from './components/annonce-list/annonce-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { AnnonceDetailsComponent } from './annonce-details/annonce-details.component';
import { FavorisComponent } from './favoris/favoris.component';
import { CommonModule, DatePipe } from '@angular/common';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MesannoncesComponent } from './mesannonces/mesannonces.component';
import { MesdemandesComponent } from './mesdemandes/mesdemandes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    AnnonceListComponent,
    NavbarComponent,    
    AnnonceFormComponent,
    AnnonceDetailsComponent,
    FavorisComponent,
    OccupationListComponent,
    LoginComponent,
    RegisterComponent,
    MesannoncesComponent,
    MesdemandesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
