import { LoginService } from './../login/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  loginSub: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLogin = !!localStorage.getItem('credential');
    this.loginSub = this.loginService.localStorageChanged.subscribe(
      (isSignIn) => (this.isLogin = isSignIn)
    );
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
  onLogout() {
    this.loginService.logout();
    this.isLogin = false;
  }
}
