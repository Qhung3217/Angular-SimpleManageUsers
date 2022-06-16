import { CommonModule } from '@angular/common';
import { HideEmailPipe } from './hide-email.pipe';
import { FilterPipe } from './filter.pipe';
import { CountPipe } from './count.pipe';
import { TriggerClickOnChangeDirective } from './directives/trigger-click-on-change.directive';
import { DropDownDirectiveDirective } from './directives/drop-down-directive.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { FilterStatusPipe } from './filter-status.pipe';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropDownDirectiveDirective,
    TriggerClickOnChangeDirective,
    CountPipe,
    FilterPipe,
    FilterStatusPipe,
    HideEmailPipe,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropDownDirectiveDirective,
    TriggerClickOnChangeDirective,
    CountPipe,
    FilterPipe,
    FilterStatusPipe,
    HideEmailPipe,
    AlertComponent,
    CommonModule,
  ],
})
export class SharedModule {}
