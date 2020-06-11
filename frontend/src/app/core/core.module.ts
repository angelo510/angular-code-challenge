import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LabourStatsAPIService } from './services/labourstats.service';
import { DigitsDisplayComponent } from './components/digits-display/digits-display.component';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { PercentageDisplayComponent } from './components/percentage-display/percentage-display.component';

@NgModule({
    declarations: [ DigitsDisplayComponent, TextDisplayComponent, PercentageDisplayComponent ],
    imports: [ CommonModule, HttpClientModule ],
    exports: [ DigitsDisplayComponent, TextDisplayComponent, PercentageDisplayComponent ],
    providers: [ LabourStatsAPIService, DecimalPipe ],
})
export class CoreModule {}
