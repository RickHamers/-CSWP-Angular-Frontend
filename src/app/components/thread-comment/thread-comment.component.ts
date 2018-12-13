import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../services/thread.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-thread-comment',
  templateUrl: './thread-comment.component.html',
  styleUrls: ['./thread-comment.component.css']
})
export class ThreadCommentComponent implements OnInit {

  private isLoggedIn$: Observable<boolean>;
  commentForm: FormGroup;
  private newComments = [];
  private comment;
  private isLoading: boolean = true;
  private getThreadSubscription: Subscription;

  constructor(private activatedroute: ActivatedRoute, private threadservice: ThreadService, private authservice: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    this.activatedroute.params.subscribe(
      (result) => {
        this.getThreadSubscription = this.threadservice.getComment(result.id)
          .subscribe(
            (result) => {
              this.comment = result;
              this.isLoading = false;
            });
      });

    this.commentForm = new FormGroup({});
    this.commentForm.addControl('comment', new FormControl(null, [Validators.required]));
  }

  onSubmit() {
    const content = this.commentForm.value['comment'];
    this.threadservice.postCommentOnComment(content, this.comment.threadId, this.comment._id)
      .subscribe(
        () => {
          console.log('comment succeeded');
          this.router.navigate(['/threadDetail/' + this.comment.threadId]);
        },
        () => {
          console.log('comment failed');
        }
      );
  }
}
