import { LoginService } from './login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.loginService.autoLogin();
  }
}
