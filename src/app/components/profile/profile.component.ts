import { Component, OnInit } from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  username: string;
  passwordForm: FormGroup;
  constructor(private threadservice: ThreadService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.userId = this.authservice.returnUserID();
    this.username = this.authservice.returnUsername();
    this.passwordForm = new FormGroup({});
    this.passwordForm.addControl('oldPassword', new FormControl(null, [Validators.required]));
    this.passwordForm.addControl('newPassword', new FormControl(null, [Validators.required]));
  }

  onSubmit() {
    const username = this.username;
    const oldPassword = this.passwordForm.value['oldPassword'];
    const newPassword = this.passwordForm.value['newPassword'];
    this.authservice.changePassword(username, oldPassword, newPassword)
      .subscribe(
        () => {
          console.log('password change succeeded');
          this.router.navigate(['/index']);
        },
        () => {
          console.log('password change failed');
        }
      );
  }
}
