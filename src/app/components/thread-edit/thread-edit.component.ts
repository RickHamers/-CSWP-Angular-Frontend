import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../services/thread.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrls: ['./thread-edit.component.css']
})
export class ThreadEditComponent implements OnInit {

  private editThreadForm: FormGroup;
  private thread;
  isLoading: boolean = true;
  private getThreadSubscription: Subscription;

  constructor(private activatedroute: ActivatedRoute, private threadservice: ThreadService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(
      (result) => {
        this.getThreadSubscription = this.threadservice.getThread(result.id)
          .subscribe(
            (result) => {
              this.thread = result;
              this.isLoading = false;
            });
      });

    this.editThreadForm = new FormGroup({});
    this.editThreadForm.addControl('title', new FormControl(null, [Validators.required]));
    this.editThreadForm.addControl('content', new FormControl(null, [Validators.required]));
  }

  onSubmit() {
    const title = this.editThreadForm.value['title'];
    const content = this.editThreadForm.value['content'];
    const threadId = this.thread._id;
    this.threadservice.updateThread(title, content, threadId)
      .subscribe(
        () => {
          console.log('update thread succeeded');
          this.router.navigate(['/threadDetail/' + threadId]);
        },
        () => {
          console.log('update thread failed');
        }
      );
  }

}
