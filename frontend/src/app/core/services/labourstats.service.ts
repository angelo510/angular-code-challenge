import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabourStats } from 'src/app/app.model';

@Injectable()
export class LabourStatsAPIService {
  constructor(private http: HttpClient) {}

  public getLabourStats(): Observable<LabourStats> {
    return this.http
      .get<LabourStats[]>('http://localhost:6502/application/labourstats')
      .pipe(map((labourstatsArray) => labourstatsArray[0]));
  }
}
