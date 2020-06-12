import { Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-percentage-display',
  templateUrl: './percentage-display.component.html',
  styleUrls: ['./percentage-display.component.scss'],
})
export class PercentageDisplayComponent {
  @Input() public set value(value: number) {
    if (value) {
      this.percentageValueSubject.next(value);
    } else {
      this.percentageValueSubject.next(0);
    }
  }
  private readonly percentageValueSubject = new ReplaySubject<number>(1);
  public readonly percentageValueChanges = this.percentageValueSubject.asObservable();
  @Input() public isEmphasis = false;
  @Input() public hasFloat = false;
}
