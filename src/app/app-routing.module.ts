import { AuthGuard } from './login/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserResolverService } from './users/user-resolver.service';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
        resolve: [UserResolverService],
      },
      {
        path: 'new',
        component: UserEditComponent,
        resolve: [UserResolverService],
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: [UserResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
