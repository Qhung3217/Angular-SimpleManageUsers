import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http
      .get<User[]>(environment.urlApi + 'users')
      .pipe(tap((users) => this.setUsers(users)));
  }
  getUsers() {
    return this.users.slice();
  }
  setUsers(users: User[]) {
    this.users = users.slice();
    this.usersChanged.next(this.users);
  }
  getUser(id: number) {
    return this.users.find((user) => +user.id === id);
  }
}
