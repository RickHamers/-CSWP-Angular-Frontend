import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../services/thread.service';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit, OnDestroy {

  private isLoggedIn$: Observable<boolean>;
  private loggedInUsername: string;
  private commentForm: FormGroup;
  private newComments = [];
  private thread;
  private isLoading: boolean = true;
  private threadAuhorIsLoginName: boolean = false;
  private getThreadSubscription: Subscription;

  constructor(private activatedroute: ActivatedRoute, private threadservice: ThreadService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    this.activatedroute.params.subscribe(
      (result) => {
        this.getThreadSubscription = this.threadservice.getThread(result.id)
        .subscribe(
          (result) => {
            this.thread = result;
            this.unwindComments(this.thread.comments);
            this.thread.comments = this.newComments;
            this.loggedInUsername = this.authservice.returnUsername();
            if (this.authservice.returnUsername() === this.thread.username) {
              this.threadAuhorIsLoginName = true; }
              this.isLoading = false;
          });
      });

    this.commentForm = new FormGroup({});
    this.commentForm.addControl('comment', new FormControl(null, [Validators.required]));
  }

  private unwindComments(comments) {
    this.recursiveUnwind(comments, 0);
  }

  private recursiveUnwind(comments, depth: number) {
    for(let comment of comments){
      comment.depth = depth;
      this.newComments.push(comment);
      this.recursiveUnwind(comment.comments, depth + 1);
    }
  }

  ngOnDestroy(): void {
    if (this.getThreadSubscription !== undefined) {
      this.getThreadSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const comment = this.commentForm.value['comment'];
    this.threadservice.postCommentOnThread(comment, this.thread._id)
      .subscribe(
        () => {
          console.log('comment succeeded');
          this.thread.comments.push({
            content: comment,
            username: this.authservice.returnUsername(),
            depth: 0
          });
        },
        () => {
          console.log('comment failed');
        }
      );
  }

  onDelete() {
    const threadId = this.thread._id;
    this.threadservice.deleteThread(threadId)
      .subscribe(
        () => {
          console.log('delete thread succeeded');
          this.router.navigate(['/index']);
        },
        () => {
          console.log('delete thread failed');
        });
  }
}
