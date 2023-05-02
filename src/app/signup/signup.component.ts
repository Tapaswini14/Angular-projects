import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupData } from './signup.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  signup_form: SignupData = new SignupData();

  form_obj = new FormData();
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      user_name: [""],
      user_email: [""],
      user_password: [""]
    });
  }

  signUp() {
    this.form_obj.append("user_name", this.signupForm.value.user_name);
    this.form_obj.append("user_email", this.signupForm.value.user_email);
    this.form_obj.append("user_password", this.signupForm.value.user_password);

    this.signup_form.user_name = this.signupForm.value.user_name;
    this.signup_form.user_email = this.signupForm.value.user_email;
    this.signup_form.user_password = this.signupForm.value.user_password;

    this.api.signupRestaurant(this.signup_form).subscribe(
      () => {
        alert('Registration Successfully');
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        alert('Something went wrong' + err);
      }
    );
  }
}
