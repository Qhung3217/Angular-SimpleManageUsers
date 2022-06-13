import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private credential = {
    email: 'admin@mail.com',
    password: '123',
  };
  localStorageChanged = new Subject<boolean>();

  constructor(private router: Router) {}

  authenticate(email: string, password: string): boolean {
    if (
      this.credential.email === email &&
      this.credential.password === password
    ) {
      const auth = {
        expiresIn: new Date(new Date().getTime() + 30 * 1000),
      };
      localStorage.setItem('credential', JSON.stringify(auth));
      this.localStorageChanged.next(true);
      this.router.navigate(['/users']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('credential');
    this.router.navigate(['/login']);
  }
}
