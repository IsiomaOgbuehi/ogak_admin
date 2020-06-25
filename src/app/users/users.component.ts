import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { ALL_USERS, CREATE_USER_MUTATION, UPDATE_USER } from '../graphql';
import { GeneralServiceService } from '../service/general-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mapping } from '../stateLgaMapping';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  env = environment;
  users = [];
  oldResult = [];
  result = [];
  searchText = '';
  id: any;
  showLoader = false;
  allStates = [];
  stateLga = [];
  updateBtn = false;
  latitude: any;
  longitude: any;
  userId: any;
  constructor(private apollo: Apollo, public generalService: GeneralServiceService) {
    this.allStates = mapping.map(res => res.state.name);
  }

  formGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    lga: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    savingsCategory: new FormControl('', Validators.required),
    homeAddress: new FormControl('', Validators.required),
    businessAddress: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
    pin2: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getUsers();
    this.getLGA();
  }

  getLGA() {
    this.formGroup.value.lga = '';
    this.stateLga = [];
    for (let i = 0; i < mapping.length; i++) {
      if (mapping[i].state.name === this.formGroup.value.state) {
        for (let k = 0; k < mapping[i].state.locals.length; k++) {
          this.stateLga.push(mapping[i].state.locals[k].name);
        }
        return;
      }
    }

  }

  getUsers(){
    this.apollo.watchQuery(
      {
        query: ALL_USERS,
        fetchPolicy: 'network-only'
      }
    ).valueChanges.subscribe((res) => {
      // @ts-ignore
      this.users = res.data.allUsers;
      this.oldResult = this.users;
    });
  }

  searchUser(text){
    this.result = [];
    this.users = this.oldResult;
    if (text !== null) {
      this.users.map((res) => {
        if (res.phone.includes(text) ||
          res.firstName.toLowerCase().includes(text.toLowerCase()) || res.lastName.toLowerCase().includes(text.toLowerCase())) {
          this.result.push(res);
        }
      });
      this.users = this.result;
      if (this.users.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

  activeSelect(id){
    this.id = id;
  }

  submit() {
    if (this.formGroup.value.pin !== this.formGroup.value.pin2) {
      return this.generalService.showFailure('PIN Mismatch');
    }
    this.formGroup.value.longitude = 0.0;
    this.formGroup.value.latitude = 0.0;
    this.formGroup.value.password = this.formGroup.value.phone;
    this.formGroup.value.passwordString = this.formGroup.value.phone;
    this.formGroup.value.loanStatus = 'inactive';
    this.formGroup.value.status = 'active';

    this.showLoader = true;

    this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: this.formGroup.value
    }).subscribe((res) => {
      this.generalService.showSuccess('User Created', '');
      this.showLoader = false;
      this.getUsers();
    }, error1 => {
      this.generalService.showFailure(error1.message.replace('GraphQL error:', '').trim());
      this.showLoader = false;
    });
  }

  editForm(data) {
    this.updateBtn = true;
    this.formGroup.controls.firstName.setValue(data.firstName);
    this.formGroup.controls.lastName.setValue(data.lastName);
    this.formGroup.controls.email.setValue(data.email);
    this.formGroup.controls.phone.setValue(data.phone);
    this.formGroup.controls.state.setValue(data.state);
    this.getLGA();
    this.formGroup.controls.lga.setValue(data.lga);
    this.formGroup.controls.gender.setValue(data.gender);
    this.formGroup.controls.savingsCategory.setValue(data.savingsCategory.toLowerCase());
    this.formGroup.controls.homeAddress.setValue(data.homeAddress);
    this.formGroup.controls.businessAddress.setValue(data.businessAddress);
    this.formGroup.controls.pin.setValue(data.pin);
    this.formGroup.controls.pin2.setValue(data.pin);
    this.formGroup.controls.userType.setValue(data.userType.toLowerCase());
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.formGroup.value.password = data.phone;
    this.userId = data.id;
    // this.formGroup.value.lga = data.lga;

    // this.getLGA();
    // console.log(this.formGroup.value);
  }

  toggleAction() {
    this.updateBtn = false;
    this.formGroup.reset();
  }

  update = () => {
    this.formGroup.value.latitude = this.latitude;
    this.formGroup.value.longitude = this.longitude;
    this.formGroup.value.password = this.formGroup.value.phone;
    this.formGroup.value.id = this.userId;

    if (this.formGroup.value.pin !== this.formGroup.value.pin2) {
      return this.generalService.showFailure('PIN Mismatch');
    }
    this.showLoader = true;
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: this.formGroup.value
    }).subscribe((res) => {
      this.generalService.showSuccess('User Data Updated', 'Done');
      this.showLoader = false;
      this.getUsers();
    }, error => {
      this.generalService.showFailure(error.message.replace('GraphQl error:', '').trim());
      this.showLoader = false;
    });
  }

}
