import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import { API_PRODUCTS, ADD_PRODUCTS, CATEGORIES, UPDATE_PRODUCT } from '../graphql';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ignore} from 'selenium-webdriver/testing';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  env = environment;
  apiProducts = [];
  allProducts = [];
  result = [];
  id: any;
  showLoader = false;
  updateBtn = false;
  productCat = [];
  productFile: any;
  product_id: any;
  showFileInput = true;
  fileName: any;
  searchText: any;

  config: any;
  collection = { count: 0, data: [] };
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  formGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
    warranty: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    productImage: new FormControl('', Validators.required),
    productCategory: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts = () => {
    this.apollo.watchQuery({
      query: API_PRODUCTS,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      // @ts-ignore
      this.apiProducts = result.data.getProducts;
      this.allProducts = this.apiProducts;

      this.collection.data = this.allProducts;
      this.collection.count = this.allProducts.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, error1 => {
      this.generalService.showFailure(error1.message.replace('GraphQL error:', '').trim());
    });
  }

  getCategories = () => {
    this.apollo.query({
      query: CATEGORIES
    }).subscribe((result) => {
      // @ts-ignore
      this.productCat = result.data.getCategories;
    }, error => {
      this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim());
    });
  }

  activeSelect(id, product, option) {

    if (option === 'without') {
      this.id = id;
      this.updateBtn = true;
      this.showFileInput = false;

      this.formGroup.controls.productName.setValue(product.productName);
      this.formGroup.controls.productPrice.setValue(product.productPrice);
      this.formGroup.controls.warranty.setValue(product.warranty);
      this.formGroup.controls.sku.setValue(product.sku);
      this.formGroup.controls.productDescription.setValue(product.productDescription);
      // @ts-ignore
      this.formGroup.controls.productCategory.setValue(product.productCategory.categoryName);

      this.product_id = product.id;
      this.formGroup.get('productImage').clearValidators();
      this.formGroup.get('productImage').updateValueAndValidity();
    }
    if (option === 'with') {
      this.id = id;
      this.updateBtn = true;
      this.showFileInput = true;

      this.formGroup.controls.productName.setValue(product.productName);
      this.formGroup.controls.productPrice.setValue(product.productPrice);
      this.formGroup.controls.warranty.setValue(product.warranty);
      this.formGroup.controls.sku.setValue(product.sku);
      this.formGroup.controls.productDescription.setValue(product.productDescription);
      // @ts-ignore
      this.formGroup.controls.productCategory.setValue(product.productCategory.categoryName);

      this.product_id = product.id;
      this.formGroup.get('productImage').setValidators(Validators.required);
      this.formGroup.get('productImage').updateValueAndValidity();
    }
  }

  editProduct = () => {
    if (!this.productFile) {
      this.formGroup.value.productId = this.product_id;
      this.showLoader = true;
      this.apollo.mutate({
        mutation: UPDATE_PRODUCT,
        variables: this.formGroup.value,
        context: {
          useMultipart: true
        }
      }).subscribe((res) => {
        this.generalService.showSuccess('Product Updated', 'Done');
        this.updateBtn = false;
        this.showLoader = false;
        this.getProducts();
      }, error => {
        this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim());
        this.updateBtn = false;
        this.showLoader = false;
      });

    }else {

      this.formGroup.value.productImage = this.productFile;
      this.formGroup.value.productId = this.product_id;
      this.showLoader = true;
      this.apollo.mutate({
        mutation: UPDATE_PRODUCT,
        variables: this.formGroup.value,
        context: {
          useMultipart: true
        }
      }).subscribe((res) => {
        this.generalService.showSuccess('Product Updated', 'Done');
        this.updateBtn = false;
        this.showLoader = false;
        this.getProducts();
      }, error => {
        this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim());
        this.updateBtn = false;
        this.showLoader = false;
      });
    }
  }

  toggleAction() {
    this.updateBtn = false;
    this.formGroup.reset();
  }

  addProduct = () => {
    this.formGroup.value.productImage = this.productFile;
    this.showLoader = true;
    this.showFileInput = true;

    this.apollo.mutate({
      mutation: ADD_PRODUCTS,
      variables: this.formGroup.value,
      context: {
        useMultipart: true
      }
    }).subscribe((res) => {
      this.generalService.showSuccess('Product Uploaded', 'Done');
      this.showLoader = false;
      this.getProducts();
      this.formGroup.reset();
    }, error1 => {
      this.generalService.showFailure(error1.message.replace('GraphQL error:', '').trim());
      this.showLoader = false;
    });
  }

  handleFileInput(event: Event) {

    this.productFile = (event.target as HTMLInputElement).files[0];
    // this.fileName = this.productFile.name;
    const file = this.productFile;

    const reader = new FileReader();
    reader.onload = e => this.fileName = reader.result;

    reader.readAsDataURL(file);
  }

  searchProducts = (product) => {
    this.result = [];
    this.apiProducts = this.allProducts;
    if (product !== null) {
      this.apiProducts.map((res) => {
        if (res.productName.includes(product) ||
          res.productName.toLowerCase().includes(product.toLowerCase())) {
          this.result.push(res);
        }
      });
      this.apiProducts = this.result;
      if (this.apiProducts.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
