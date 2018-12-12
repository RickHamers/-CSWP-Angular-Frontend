import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private userID;

  isLoggedIn$: Observable<boolean>;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    this.userID = this.authservice.returnUserID();
  }

  onLogout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

}
