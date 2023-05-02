import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { LoginData } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  login_form: LoginData = new LoginData();

  form_new_obj = new FormData();
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_email: [''],
      user_password: [''],
    });
  }

  login() {
    this.form_new_obj.append('user_email', this.loginForm.value.user_email);
    this.form_new_obj.append(
      'user_password',
      this.loginForm.value.user_password
    );

    this.login_form.user_email = this.loginForm.value.user_email;
    this.login_form.user_password = this.loginForm.value.user_password;

    this.api.loginRestaurant(this.login_form).subscribe(
      () => {
        alert('Login Successfully');
        this.loginForm.reset();
        this.router.navigate(['restaurant']);
      },
      (err) => {
        alert('Wrong User' + err);
      }
    );
  }
}
