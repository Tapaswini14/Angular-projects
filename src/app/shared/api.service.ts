import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  baseUrl = 'http://127.0.0.1:5000';
  registerUrl = 'http://192.168.1.8:3012/api/v2';
  listUrl = `${this.baseUrl}/api/restaurant/add`; //post
  createUrl = `${this.baseUrl}/api/restaurant/get_all`; //get
  deleteUrl = `${this.baseUrl}/api/restaurant/delete`; //delete
  loginUrl = `${this.registerUrl}/loginvalidationStaff?_format=json`; //post
  SignupUrl = `${this.registerUrl}/registrationStaff?_format=json`; //post

  postRestaurant(data: any) {
    console.log(data);
    return this._http.post(this.listUrl, data);
  }

  loginRestaurant(data: any) {
    console.log(data);
    return this._http.post(this.loginUrl, data);
  }

  signupRestaurant(data: any) {
    console.log(data);
    return this._http.post(this.SignupUrl, data);
  }
  getRestaurant() {
    return this._http.get(this.createUrl);
  }

  deleteRestaurant(id: number) {
    return this._http.delete<any>(this.deleteUrl + id);
  }
}
