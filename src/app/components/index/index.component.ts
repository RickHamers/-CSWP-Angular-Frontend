import { Component, OnInit } from '@angular/core';
import {ThreadService} from '../../services/thread.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  threads$;
  constructor(private threadservice: ThreadService) { }

  ngOnInit() {
    this.threads$ = this.threadservice.getAllThreads();
  }

}
