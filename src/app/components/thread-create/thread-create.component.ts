import { Component, OnInit } from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thread-create',
  templateUrl: './thread-create.component.html',
  styleUrls: ['./thread-create.component.css']
})
export class ThreadCreateComponent implements OnInit {

  threadForm: FormGroup;
  constructor(private threadservice: ThreadService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.threadForm = new FormGroup({});
    this.threadForm.addControl('title', new FormControl(null, [Validators.required]));
    this.threadForm.addControl('content', new FormControl(null, [Validators.required]));
  }

  onSubmit() {
    const title = this.threadForm.value['title'];
    const content = this.threadForm.value['content'];
    this.threadservice.postThread(title, content)
      .subscribe(
        () => {
          console.log('post thread succeeded');
          this.router.navigate(['/index']);
        },
        () => {
          console.log('post thread failed');
        }
      );
  }

}
