import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({});
    this.loginForm.addControl('username', new FormControl(null, [Validators.required]));
    this.loginForm.addControl('password', new FormControl(null, [Validators.required]));
  }
  onSubmit() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    this.authService.login(username, password)
      .subscribe(
        () => {
        console.log('login succeeded');
        this.router.navigate(['/index']);
        },
        () => {
          console.log('login failed');
        }
      );
  }
}
