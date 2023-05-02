import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
})
export class RestaurantDashboardComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  id = 0;
  form_data_obj = new FormData();
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [this.id++],
      name: [''],
      email_id: [''],
      address: [''],
      phone_number: [0],
      cuisine_type: [''],
    });
    this.getAllData();
  }
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res['restaurant_list'];
    });
  }

  addRestaurant() {
    this.form_data_obj.append('id', this.formValue.value.id);
    this.form_data_obj.append('name', this.formValue.value.name);
    this.form_data_obj.append('email_id', this.formValue.value.email_id);
    this.form_data_obj.append(
      'phone_number',
      this.formValue.value.phone_number
    );
    this.form_data_obj.append('address', this.formValue.value.address);
    this.form_data_obj.append(
      'cuisine_type',
      this.formValue.value.cuisine_type
    );

    this.restaurantModelObj.id = this.formValue.value.id;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email_id = this.formValue.value.email_id;
    this.restaurantModelObj.phone_number = this.formValue.value.phone_number;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.cuisine_type = this.formValue.value.cuisine_type;

    this.api.postRestaurant(this.form_data_obj).subscribe(
      (res: any) => {
        console.log('res', res);
        alert('Restaurant Records added Successfully');
        // let ref = document.getElementById('clear');
        // ref?.click();
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Not Added' + err);
      }
    );
  }

  deleteRestaurant(id: number) {
    this.api.deleteRestaurant(id).subscribe((res) => {
      console.log(res);
      this.getAllData();
    });
  }

  editData(data: any) {
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email_id'].setValue(data.email_id);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['phone_number'].setValue(data.phone_number);
    this.formValue.controls['cuisine_type'].setValue(data.cuisine_type);
  }

  updateResto() {
    this.form_data_obj.append('id', this.formValue.value.id);
    this.form_data_obj.append('name', this.formValue.value.name);
    this.form_data_obj.append('email_id', this.formValue.value.email_id);
    this.form_data_obj.append('phone_number',this.formValue.value.phone_number);
    this.form_data_obj.append('address', this.formValue.value.address);
    this.form_data_obj.append('cuisine_type',this.formValue.value.cuisine_type);

    this.restaurantModelObj.id = this.formValue.value.id;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email_id = this.formValue.value.email_id;
    this.restaurantModelObj.phone_number = this.formValue.value.phone_number;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.cuisine_type = this.formValue.value.cuisine_type;
  }
}
