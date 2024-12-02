import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  logout():void{
    this.auth.logout()
  }
  islogged() : boolean {
    return this.auth.isAuthenticated()
  }
  isowner() : boolean {
    return this.auth.isowner()
  }
  isclient() : boolean {
    return this.auth.isclient()
  }
  getUser() : any {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return  user
  }

}
