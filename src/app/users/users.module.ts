import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsersComponent, UserListComponent, UserEditComponent],
  imports: [
    SharedModule,
    RouterModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
  ],
})
export class UsersModule {}
