import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-digits-display',
  templateUrl: './digits-display.component.html',
  styleUrls: ['./digits-display.component.scss'],
})
export class DigitsDisplayComponent {
  constructor(private decimalPipe: DecimalPipe) {}
  @Input() public set value(value: number) {
    if (value === 0) {
      this.digitsValueSubject.next('-');
    } else {
      const formatedValue = this.decimalPipe.transform(value);
      this.digitsValueSubject.next(formatedValue);
    }
  }
  private readonly digitsValueSubject = new ReplaySubject<number | string>(1);
  public readonly digitsValueChanges = this.digitsValueSubject.asObservable();
  @Input() public isEmphasis = false;
}
