import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private credential = {
    email: 'admin@mail.com',
    password: '123',
  };
  localStorageChanged = new Subject<boolean>();
  expirationTimer;

  constructor(private router: Router, private route: ActivatedRoute) {}

  authenticate(email: string, password: string): boolean {
    if (
      this.credential.email === email &&
      this.credential.password === password
    ) {
      const auth = {
        expiresIn: new Date(new Date().getTime() + 3600000),
      };
      localStorage.setItem('credential', JSON.stringify(auth));
      this.autoLogout(3600000); //1 hour
      this.localStorageChanged.next(true);
      let nextUrl = null;
      this.route.queryParamMap.subscribe(
        (params) => (nextUrl = params.get('redirectUrl'))
      );

      if (nextUrl) this.router.navigate([nextUrl]);
      else this.router.navigate(['/users']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('credential');
    console.log('logged out');
    this.router.navigate(['/login']);
    this.localStorageChanged.next(false);
    if (this.expirationTimer) clearTimeout(this.expirationTimer);
    this.expirationTimer = null;
  }
  autoLogin() {
    const credential = JSON.parse(localStorage.getItem('credential'));
    console.log(credential);

    if (!credential) {
      return;
    }
    // console.log(new Date(credential.expiresIn), new Date().getTime());
    const expirationDuration =
      new Date(credential.expiresIn).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    // this.router.navigate(['/users']);
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
