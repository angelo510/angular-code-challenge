import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LabourStatsAPIService } from './core/services/labourstats.service';
import { LabourStats } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private labourStatsAPIService: LabourStatsAPIService) {}
  public labourStatsChanges: Observable<LabourStats>;

  public ngOnInit() {
    this.labourStatsChanges = this.labourStatsAPIService.getLabourStats();
  }
}
