import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import { GET_ALL_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY } from '../graphql';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  env = environment;
  apiData = [];
  switch: boolean;
  showLoader = false;
  edit = false;
  catId: any;
  formGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryStatus: new FormControl('', Validators.required)
  })
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories = () => {
    this.apollo.query({
      query: GET_ALL_CATEGORIES,
      fetchPolicy: 'network-only'
    }).subscribe(res => {
      // @ts-ignore
      this.apiData = res.data.getAllCategories;
    }, error => this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim()));
  }

  switchValue = (event) => {
    this.switch = event.target.checked;
  }

  addCategory = () => {
    this.showLoader = true;
    this.apollo.mutate({
      mutation: ADD_CATEGORY,
      variables: this.formGroup.value
    }).subscribe((res) => {
      this.showLoader = false;
      this.getCategories();
      this.formGroup.reset();
      this.generalService.showSuccess('Category Added', 'Done');
    }, error => {
      this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim());
      this.showLoader = false;
    });
  }

  updateValue = (data) => {
    this.edit = true;
    this.formGroup.controls.categoryName.setValue(data.categoryName);
    this.formGroup.controls.categoryStatus.setValue(data.categoryStatus);
    this.catId = data.id;
  }
  resetEdit = () => {
    this.edit = true;

    if (this.formGroup.value.categoryName === '') {
      this.edit = false;
    }
  }

  updateCategory = () => {
    this.formGroup.value.categoryId = this.catId;
    if (!this.catId){
      return this.generalService.showFailure('Select Category to Edit');
    }
    this.apollo.mutate({
      mutation: EDIT_CATEGORY,
      variables: this.formGroup.value
    }).subscribe((res) => {
      this.getCategories();
      this.generalService.showSuccess('Category Updated', 'Done');
      this.formGroup.reset();
      this.edit = false;
    }, error => this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim()));
  }

}
