import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceListComponent } from './components/annonce-list/annonce-list.component';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { AnnonceDetailsComponent } from './annonce-details/annonce-details.component';
import { FavorisComponent } from './favoris/favoris.component';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'annonces', component: AnnonceListComponent },
  { path: 'create-annonce', component: AnnonceFormComponent },
  { path: 'favoris', component: FavorisComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'details/:id', component: AnnonceDetailsComponent }, // Route for details
  { path: 'occupations/:annonceId', component: OccupationListComponent }, //route demande

  { path: '', redirectTo: '/annonces', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}