import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { GET_WITHDRAWALS, ACCT_BALANCE_UPDATE_WITHDRAWAL, WITHDRAWAL_APPROVED_UPDATE } from '../graphql';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {
  env = environment;
  apiData = [];
  allData = [];
  result = [];
  searchText: any;
  userId: any;
  accountBalance: any;
  id: any;
  showLoader = false;
  requestId: any;
  requestedAmount: any;
  approvedStatus: any;

  config: any;
  collection = { count: 0, data: [] };
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getWithdrawals();
  }

  getWithdrawals = () => {
    this.apollo.query({
      query: GET_WITHDRAWALS,
      fetchPolicy: 'network-only'
    }).subscribe((res) => {
      // @ts-ignore
      this.apiData = res.data.getWithdrawals;
      this.allData = this.apiData;

      this.collection.data = this.allData;
      this.collection.count = this.allData.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, error => {
      this.generalService.showFailure(error.message.replace('GraphQL Error:', '').trim());
    });
}

  searchTransaction = (searchText) => {
    this.result = [];
    this.apiData = this.allData;
    if (searchText !== null) {
      this.apiData.map((res) => {
        if (res.dateApplied.includes(searchText)) {
          this.result.push(res);
        }
      });
      this.apiData = this.result;
      if (this.apiData.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getSelectedUser = (data) => {
    this.requestedAmount = data.amount;
    const userAccountBalance = data.user.accountBalance;
    this.requestId = data.id;
    this.userId = data.user.id;
    this.accountBalance = userAccountBalance - this.requestedAmount;
    this.approvedStatus = data.read;
  }

  activeSelect(id){
    this.id = id;
  }

  approve = () => {
    if (this.approvedStatus) {
      return this.generalService.showFailure('Already Approved');
    }
    this.showLoader = true;
    this.apollo.mutate({
      mutation: ACCT_BALANCE_UPDATE_WITHDRAWAL,
      variables: {accountBalance: this.accountBalance, userId: this.userId}
    }).subscribe((res) => {

      this.apollo.mutate({
        mutation: WITHDRAWAL_APPROVED_UPDATE,
        variables: {read: true, requestId: this.requestId}
      }).subscribe((result) => {
        this.getWithdrawals();
        this.showLoader = false;
        this.approvedStatus = true;
        this.generalService.showSuccess('Withdrawal Approved', 'Done');
      }, err => {
        this.showLoader = false;
        this.generalService.showFailure(err.message.replace('GraphQL Error:', '').trim());
      });
    }, error => {
      this.showLoader = false;
      this.generalService.showFailure(error.message.replace('GraphQL Error:', '').trim());
    });
  }

}
