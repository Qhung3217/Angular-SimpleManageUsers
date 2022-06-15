import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  constructor(private http: HttpClient, private router: Router) {}

  fetchUsers() {
    return this.http
      .get<User[]>(environment.urlApi + 'users')
      .pipe(tap((users) => this.setUsers(users)));
  }
  updateUser(id: number, newUser: User) {
    return this.http
      .put<User>(environment.urlApi + 'users/' + id, newUser)
      .pipe(
        catchError(this.handleError),
        tap(() => this.fetchUsers().subscribe())
      );
  }
  createUser(newUser: User) {
    return this.http.post<User>(environment.urlApi + 'users', newUser).pipe(
      catchError(this.handleError),
      tap(() => this.fetchUsers().subscribe())
    );
  }
  deleteUser(id: number) {
    return this.http.delete(environment.urlApi + 'users/' + id).pipe(
      catchError(this.handleError),
      tap(() => this.fetchUsers().subscribe())
    );
  }
  getUsers() {
    return this.users.slice();
  }
  setUsers(users: User[]) {
    this.users = users.slice();
    this.usersChanged.next(this.users.slice());
  }
  getUser(id: number) {
    return this.users.find((user) => +user.id === id);
  }

  private handleError(errRes: HttpErrorResponse) {
    let errorMessage: string = 'An unknow error occured!';

    if (!errRes.error && !errRes.error.error)
      return throwError(() => errorMessage);
    console.log('catch error: ', errRes);

    switch (errRes.error) {
      case 'Not Found':
        errorMessage = 'User not found !';
        break;
    }

    return throwError(() => errorMessage);
  }
}
