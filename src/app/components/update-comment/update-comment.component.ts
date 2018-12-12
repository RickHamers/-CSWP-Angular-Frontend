import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../services/thread.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

  private commentForm: FormGroup;
  private comment;
  private isLoading: boolean = true;
  private getThreadSubscription: Subscription;

  constructor(private activatedroute: ActivatedRoute, private threadservice: ThreadService, private authservice: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.commentForm = new FormGroup({});
    this.activatedroute.params.subscribe(
      (result) => {
        this.getThreadSubscription = this.threadservice.getComment(result.id)
          .subscribe(
            (result) => {
              this.comment = result;
              this.commentForm.addControl('content', new FormControl(this.comment.content, [Validators.required]));
              this.isLoading = false;
            });
      });
  }

  onDelete() {
    const commentId = this.comment._id;
    this.threadservice.deleteComment(commentId)
      .subscribe(
        () => {
          console.log('delete comment succeeded');
          this.router.navigate(['/threadDetail/' + this.comment.threadId]);
        },
        () => {
          console.log('delete comment failed');
        });
  }

  onUpdate() {
    const commentId = this.comment._id;
    const commentContent = this.commentForm.value['content'];
    this.threadservice.updateComment(commentId, commentContent)
      .subscribe(
        () => {
          console.log('update comment succeeded');
          this.router.navigate(['/threadDetail/' + this.comment.threadId]);
        },
        () => {
          console.log('update comment failed');
        });
  }
}
