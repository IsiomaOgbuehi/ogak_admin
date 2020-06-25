import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ALL_TRANSACTIONS } from '../graphql';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  env = environment;
  apiData = [];
  searchText = '';
  oldResult = [];
  result = [];

  config: any;
  collection = { count: 0, data: [] };
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction = () => {
    this.apollo.query({
      query: ALL_TRANSACTIONS,
      fetchPolicy: 'network-only'
    }).subscribe((res) => {
      // @ts-ignore
      this.apiData = res.data.getAllTransactions;
      this.oldResult = this.apiData;
      this.collection.data = this.oldResult;
      this.collection.count = this.oldResult.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, err => {
      this.generalService.showFailure(err.message.replace('GraphQL error:', '').trim());
    });
  }

  searchTransaction(text){
    this.result = [];
    this.apiData = this.oldResult;
    if (text !== null) {
      this.apiData.map((res) => {
        if (res.referenceId.includes(text) ||
          res.user.phone.includes(text)) {
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

}
