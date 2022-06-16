import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HideEmailPipe } from './shared/hide-email.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { FilterStatusPipe } from './shared/filter-status.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { CountPipe } from './shared/count.pipe';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DropDownDirectiveDirective } from './shared/directives/drop-down-directive.directive';
import { TriggerClickOnChangeDirective } from './shared/directives/trigger-click-on-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    HeaderComponent,
    AlertComponent,
    UserEditComponent,
    UserListComponent,
    HideEmailPipe,
    FilterStatusPipe,
    FilterPipe,
    CountPipe,
    LoadingSpinnerComponent,
    DropDownDirectiveDirective,
    TriggerClickOnChangeDirective,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    OrderModule,
    NgxPaginationModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
