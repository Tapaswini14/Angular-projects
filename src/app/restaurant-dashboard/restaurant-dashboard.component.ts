import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
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
  totalAmount: number = 0;
  counter = 0;
  form_data_obj = new FormData();
  form_data = new FormData();
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
    this.formValue.controls['phone_number'].setValue(data.phone_number);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['cuisine_type'].setValue(data.cuisine_type);
  }

  updateRestaurant() {
    this.form_data.append('id', this.formValue.value.id);
    this.form_data.append('name', this.formValue.value.name);
    this.form_data.append('email_id', this.formValue.value.email_id);
    this.form_data.append('phone_number', this.formValue.value.phone_number);
    this.form_data.append('address', this.formValue.value.address);
    this.form_data.append('cuisine_type', this.formValue.value.cuisine_type);

    this.restaurantModelObj.id = this.formValue.value.id;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email_id = this.formValue.value.email_id;
    this.restaurantModelObj.phone_number = this.formValue.value.phone_number;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.cuisine_type = this.formValue.value.cuisine_type;

    this.api.editRestaurant(this.form_data).subscribe(
      (res: any) => {
        console.log('res', res);
        alert('Restaurant Records updated Successfully');
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

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  appetizerItems = [
    {
      name: 'Crispy Onion Rings',
      price: 150,
      image: '/assets/img1.jpeg',
      description:
        'Deep fried vidalia onion rings served with a tangy dipping sauce.',
    },
    {
      name: 'Thai Spring Rolls',
      price: 120,
      image: '/assets/img2.jpeg',
      description: 'Crispy Thai spring rolls filled with vegetables',
    },
    {
      name: 'Quesadilla',
      price: 220,
      image: '/assets/img3.jpeg',
      description: 'Served with sour cream, guacamole, and salsa.',
    },
  ];

  soupItems = [
    {
      name: 'Cream of Wild Mushroom',
      price: 180,
      image: '/assets/img4.jpeg',
      description: 'A bowl of our house special creamy mushroom soup',
    },
    {
      name: 'Tasty Chicken Noodle soup',
      price: 230,
      image: '/assets/img5.jpeg',
      description:
        'A bowl of our classic chicken noodle made from grandmas recipe',
    },
  ];

  saladItems = [
    {
      name: 'Classic Ceasar Salad',
      price: 120,
      image: '/assets/img6.jpeg',
      description: 'Served with sour cream, guacamole, and salsa.',
    },
    {
      name: 'Cranberry Pecan Blue',
      price: 150,
      image: '/assets/img7.jpeg',
      description: 'Served with sour cream, guacamole, and salsa.',
    },
    {
      name: 'Spinach salad',
      price: 180,
      image: '/assets/img8.jpeg',
      description: 'Served with sour cream, guacamole, and salsa.',
    },
  ];

  addItem(price: number) {
    this.totalAmount += price;
  }

  removeItem(price: number) {
    this.totalAmount -= price;
  }

 }
