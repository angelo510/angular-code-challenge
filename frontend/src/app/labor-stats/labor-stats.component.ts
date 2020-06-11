import { Component, Input } from '@angular/core';
import { ReplaySubject, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { sortBy } from 'lodash';
import { LabourStats } from '../app.model';

interface SortOption {
  columnName: string;
  acending: boolean;
}

const defaultOption: SortOption = {
  columnName: 'name',
  acending: true
};

@Component({
  selector: 'app-labor-stats',
  templateUrl: './labor-stats.component.html',
  styleUrls: ['./labor-stats.component.scss']
})
export class LaborStatsComponent {
  @Input() public set labourStatsData(value: LabourStats | null) {
    if (value) {
      this.labourStatsSubject.next(value);
    }
  }

  private readonly labourStatsSubject = new ReplaySubject<LabourStats>(1);
  private readonly sortColumnSubject = new BehaviorSubject<SortOption>(defaultOption);

  public readonly directContractorChanges = this.labourStatsSubject.pipe(
    map(labourStats => labourStats.directContractors)
  );

  public readonly providersChanges = this.labourStatsSubject.pipe(
    map(labourStats => labourStats.providers)
  );

  public readonly totalChanges = this.labourStatsSubject.pipe(
    map(labourStats => labourStats.total[0])
  );

  public readonly tableDataChanges = this.sortColumnSubject.pipe(
    switchMap(sortOption =>
      combineLatest([this.directContractorChanges, this.providersChanges]).pipe(
        map(([directContractors, providers]) => {
          if (sortOption.columnName === 'name') {
            const sortedProviders = sortOption.acending ?
              sortBy(providers, sortOption.columnName) : sortBy(providers, sortOption.columnName).reverse();
            return [...directContractors, ...sortedProviders];
          }
          const mergedProviders = sortBy([...directContractors, ...providers], sortOption.columnName);
          return sortOption.acending ? mergedProviders : mergedProviders.reverse();
        }),
      )),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public previousOption: SortOption = defaultOption;

  public onSortTable(colName: string): void {
    if (this.previousOption && this.previousOption.columnName === colName) {
      this.sortColumnSubject.next({columnName: colName, acending: !this.previousOption.acending });
      this.previousOption = {
        columnName: colName,
        acending: !this.previousOption.acending,
      };
    } else {
      this.sortColumnSubject.next({columnName: colName, acending: true });
      this.previousOption = {
        columnName: colName,
        acending: true,
      };
    }
  }
}
