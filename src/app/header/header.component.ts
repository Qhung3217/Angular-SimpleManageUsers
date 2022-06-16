import { LoginService } from './../login/login.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./scss/header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  loginSub: Subscription;
  isOpenMobileMenu: boolean = false;

  constructor(
    private loginService: LoginService,
    private renderer: Renderer2
  ) {}

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
  toggleMenu() {
    this.isOpenMobileMenu = !this.isOpenMobileMenu;
    if (this.isOpenMobileMenu)
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    else this.renderer.removeStyle(document.body, 'overflow');
  }
}
