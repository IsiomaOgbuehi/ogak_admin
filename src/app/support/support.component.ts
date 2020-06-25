import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import { GET_SUPPORT_INFO, READ_SUPPORT_MSG } from '../graphql';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  env = environment;
  apiData = [];
  config: any;
  collection = { count: 0, data: [] };
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getSupport();
  }

  getSupport = () => {
    this.apollo.query({
      query: GET_SUPPORT_INFO,
      fetchPolicy: 'network-only'
    }).subscribe((res) => {
      // @ts-ignore
      this.apiData = res.data.getSupportInfo;

      this.collection.data = this.apiData;
      this.collection.count = this.apiData.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, err => {
      this.generalService.showFailure(err.message.replace('GraphQL error:', ''));
    });
  }

  read = (id, readStatus) => {
    const msgID = +id;
    if (!readStatus) {
      this.apollo.mutate({
        mutation: READ_SUPPORT_MSG,
        variables: {msgId: msgID, readStatus: true}
      }).subscribe((res) => {
        this.getSupport();
      }, err => {
        this.generalService.showFailure('Not Connected to Internet');
        console.log(err);
      });
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
