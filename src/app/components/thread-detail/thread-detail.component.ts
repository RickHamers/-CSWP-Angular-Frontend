import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThreadService} from '../../services/thread.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit, OnDestroy {

  private newComments = [];
  private thread;
  private isLoading: boolean = true;
  private getThreadSubscription: Subscription;
  constructor(private activatedroute: ActivatedRoute, private threadservice: ThreadService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(
      (result) => {
        this.getThreadSubscription = this.threadservice.getThread(result.id)
        .subscribe(
          (result) => {
            this.thread = result;
            this.unwindComments(this.thread.comments);
            this.thread.comments = this.newComments;
            this.isLoading = false;
          }
        );
      }
    );
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

}
