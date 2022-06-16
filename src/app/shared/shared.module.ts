import { CommonModule } from '@angular/common';
import { HideEmailPipe } from './pipes/hide-email.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CountPipe } from './pipes/count.pipe';
import { DropDownDirectiveDirective } from './directives/drop-down-directive.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { FilterStatusPipe } from './pipes/filter-status.pipe';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropDownDirectiveDirective,
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
    CountPipe,
    FilterPipe,
    FilterStatusPipe,
    HideEmailPipe,
    AlertComponent,
    CommonModule,
  ],
})
export class SharedModule {}
