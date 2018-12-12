import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(
    private router: Router,
    private httpclient: HttpClient,
    private authservice: AuthService
  ) { }

   getAllThreads() {
    return this.httpclient.get(`${environment.apiUrl}/api/threads`, {headers: this.authservice.createHeader()});
  }

  getThread(id: string) {
    return this.httpclient.get(`${environment.apiUrl}/api/thread?id=` + id, {headers: this.authservice.createHeader()});
  }

  postThread(title: string, content: string) {
    return this.httpclient.post(`${environment.apiUrl}/api/thread`, {username: this.authservice.returnUsername(), title: title, content: content}, {headers: this.authservice.createHeader()});
  }

  updateThread(title: string, content: string, threadId: string) {
    return this.httpclient.put(`${environment.apiUrl}/api/thread?id=` + threadId, {title: title, content: content}, {headers: this.authservice.createHeader()});
  }

  postCommentOnThread(content: string, threadId: string) {
    return this.httpclient.post(`${environment.apiUrl}/api/thread/comment`, {content: content, username: this.authservice.returnUsername(), threadId: threadId}, {headers: this.authservice.createHeader()});
  }

  deleteThread(threadId: string) {
    return this.httpclient.delete(`${environment.apiUrl}/api/thread?id=` + threadId, {headers: this.authservice.createHeader()});
  }

  getComment(id: string) {
    return this.httpclient.get(`${environment.apiUrl}/api/comment?id=` + id, {headers: this.authservice.createHeader()});
  }

  postCommentOnComment(content: string, threadId: string, commentId: string) {
    return this.httpclient.post(`${environment.apiUrl}/api/thread/comments?id=` + commentId, {content: content, username: this.authservice.returnUsername(), threadId: threadId}, {headers: this.authservice.createHeader()});
  }

  updateComment(commentId: string, content: string) {
    return this.httpclient.put(`${environment.apiUrl}/api/comment?id=` + commentId, {content: content}, {headers: this.authservice.createHeader()});
  }

  deleteComment(commentId: string) {
    return this.httpclient.delete(`${environment.apiUrl}/api/comment?id=` + commentId, {headers: this.authservice.createHeader()});
  }
}
