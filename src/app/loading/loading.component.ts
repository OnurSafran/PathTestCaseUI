import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public loading = true;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loadingStatus.subscribe((b) => this.loading = b);
  }

  ngOnInit(): void {
  }

}
