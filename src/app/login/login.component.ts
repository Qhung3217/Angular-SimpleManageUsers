import { Router, ActivatedRoute } from '@angular/router';
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
  nextURL: string = null;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nextURL = params['redirectUrl'];
    });
  }

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    if (!this.loginService.authenticate(email, password)) {
      this.hasError = 'Error !!';
      this.errorMessage = 'Email or password is incorrect';
    } else {
      // console.log(this.nextURL);
    }
  }
}
