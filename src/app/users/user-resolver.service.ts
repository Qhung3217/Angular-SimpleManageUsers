import { UsersService } from './users.service';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    const users = this.usersService.getUsers();
    if (users.length > 0) return users;
    else return this.usersService.fetchUsers();
  }
}
