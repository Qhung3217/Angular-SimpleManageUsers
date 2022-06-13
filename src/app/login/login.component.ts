import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hasError: string = null;
  errorMessage: string;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    if (!this.loginService.authenticate(email, password)) {
      this.hasError = 'Error !!';
      this.errorMessage = 'Email or password is incorrect';
    }
  }
}
