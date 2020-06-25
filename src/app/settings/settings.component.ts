import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SYSTEM_SETTINGS, UPDATE_SETTINGS } from '../graphql';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  env = environment;
  showButton = true;
  formGroup = new FormGroup({
    savingsPercentage: new FormControl('', Validators.required),
    minimumLoanAmount: new FormControl('', Validators.required),
    maximumLoanAmount: new FormControl('', Validators.required),
    loanDefaultAmount: new FormControl('', Validators.required),
    initialUserMaxAmount: new FormControl('', Validators.required)
  });
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings = () => {
    this.apollo.query({
      query: SYSTEM_SETTINGS,
      fetchPolicy: 'network-only'
    }).subscribe((res) => {
      // @ts-ignore
      const apiData = res.data.systemSettings;
      this.formGroup.controls.savingsPercentage.setValue(apiData.savingsPercentage);
      this.formGroup.controls.minimumLoanAmount.setValue(apiData.minimumLoanAmount);
      this.formGroup.controls.maximumLoanAmount.setValue(apiData.maximumLoanAmount);
      this.formGroup.controls.loanDefaultAmount.setValue(apiData.loanDefaultAmount);
      this.formGroup.controls.initialUserMaxAmount.setValue(apiData.initialUserMaxAmount);
    }, error => this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim()));
  }

  updateSettings = () => {
    console.log(this.formGroup.value);
    this.showButton = false;
    this.apollo.mutate({
      mutation: UPDATE_SETTINGS,
      variables: this.formGroup.value
    }).subscribe((res) => {
      this.showButton = true;
      this.generalService.showSuccess('Settings Updated', 'Done');
    }, err => {
      this.generalService.showFailure(err.message.replace('GraphQL error:', '').trim());
      this.showButton = true;
    });
  }

}
