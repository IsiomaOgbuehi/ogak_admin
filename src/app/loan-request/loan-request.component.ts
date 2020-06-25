import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import { GET_REQUESTED_LOANS, UPDATE_APPROVAL, APPROVE_LOAN } from '../graphql';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})

export class LoanRequestComponent implements OnInit {
  @ViewChild('loanForm') loanForm: ElementRef;
  env = environment;
  searchText: boolean;
  choice: string;
  apiData = [];
  allData = [];
  result = [];
  showLoader = false;
  selectedData: any;
  id: any;

  config: any;
  collection = { count: 0, data: [] };

  // loanStatus: 'INACTIVE';
  apiLoanStatus: any;
  accountBalance: number;
  repaymentAmount: number;
  newCustomer = false;
  userId: any;
  loanId: any;

  // formGroup = new FormGroup({
  //   accountBalance: new FormControl('', Validators.required),
  //   loanStatus: new FormControl('', Validators.required),
  //   newCustomer: new FormControl('', Validators.required)
  // });
  formGroup = new FormGroup({
    repayment: new FormControl('', Validators.required)
  });
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  searchTransaction = (searchText) => {
    // console.log(searchText);
    const status = JSON.parse(searchText);
    // console.log(status);
    this.result = [];
    this.apiData = this.allData;
    if (status !== null) {
      this.apiData.map((res) => {
        if (res.pendingRequest === status) {
          this.result.push(res);
        }
      });
      this.apiData = this.result;
      if (this.apiData.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

  searchType = (type) => {
    this.result = [];
    this.apiData = this.allData;
    // console.log(type);
    if (type !== null) {
      this.apiData.map((res) => {
        // console.log(res.requestedChoice);
        if (res.requestedChoice === type) {
          this.result.push(res);
        }
      });
      this.apiData = this.result;
      if (this.apiData.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

  getData = () => {
    this.apollo.query({
      query: GET_REQUESTED_LOANS,
      fetchPolicy: 'network-only'
    }).subscribe((res) => {
      // @ts-ignore
      this.apiData = res.data.getRequestedLoan;
      this.allData = this.apiData;

      this.collection.data = this.allData;
      this.collection.count = this.allData.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, error => {
      this.generalService.showFailure(error.message.replace('GraphQL error', '').trim());
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  approve = () => {
    this.accountBalance = this.selectedData.user.accountBalance;

    this.apiLoanStatus = this.selectedData.user.loanStatus;

    this.userId = this.selectedData.user.id;

    this.loanId = this.selectedData.id;

    const amountCharged = this.formGroup.value.repayment;
    this.accountBalance = this.accountBalance - amountCharged;
    this.repaymentAmount = amountCharged;
    // this.repaymentAmount = this.repaymentAmount - amountCharged;

    if (this.apiLoanStatus === 'INACTIVE' || this.apiLoanStatus === 'inactive'){
      return this.generalService.showFailure('Already Approved. No Active Request');
    }else {
      // console.log(this.repaymentAmount);
      this.apollo.mutate({
        mutation: UPDATE_APPROVAL,
        variables: {
          userId: this.userId,
          accountBalance: this.accountBalance,
          repaymentAmount: this.repaymentAmount,
          loanStatus: 'inactive',
          newCustomer: this.newCustomer
        }
      }).subscribe((res) => {
        // @ts-ignore
        const response = res.data.updateApproval; // Update current Data with response
        // console.log(response);
        // this.hideModal();
        this.selectedData.user.loanStatus = response.loanStatus;
        this.apiData.map((r) => r.user.loanStatus === response.loanStatus ? r.user.loanStatus = response.loanStatus : r.user.loanStatus);
        this.allData.map((r) => r.user.loanStatus === response.loanStatus ? r.user.loanStatus = response.loanStatus : r.user.loanStatus);
        this.apollo.mutate({
          mutation: APPROVE_LOAN,
          variables: {
            loanId: this.loanId,
            approvalStatus: true,
            pendingRequest: false
          }
        }).subscribe((rs) => {
          this.generalService.showSuccess('Loan Approved', 'Done');
          this.getData();
        }, err => this.generalService.showFailure(err.message.replace('GraphQL error:', '').trim()));
      }, error => this.generalService.showFailure(error.message.replace('GraphQL error:', '').trim()));
    }
  }

  selectedRow = (data, id) => {
    this.selectedData = data;
    this.id = id;
    this.formGroup.reset();
  }

}
