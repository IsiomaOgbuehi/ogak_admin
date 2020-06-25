import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { GeneralServiceService } from '../service/general-service.service';
import { GET_GUARANTORS } from '../graphql';

@Component({
  selector: 'app-loan-guarantors',
  templateUrl: './loan-guarantors.component.html',
  styleUrls: ['./loan-guarantors.component.css']
})
export class LoanGuarantorsComponent implements OnInit {
  env = environment;
  searchText: any;
  apiData = [];
  allData = [];
  result = [];

  config: any;
  collection = { count: 0, data: [] };
  constructor(private apollo: Apollo, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.getGuarantors();
  }

  getGuarantors = () => {
    this.apollo.query({
      query: GET_GUARANTORS
    }).subscribe(res => {
      // @ts-ignore
      this.apiData = res.data.getLoanGuarantors;
      this.allData = this.apiData;

      this.collection.data = this.allData;
      this.collection.count = this.allData.length;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }, error => console.log(error));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  search(text){
    this.result = [];
    this.apiData = this.allData;
    if (text !== null) {
      this.apiData.map((res) => {
        if (res.user.phone.includes(text)) {
          this.result.push(res);
        }
      });
      this.apiData = this.result;
      if (this.apiData.length === 0) {
        this.generalService.showFailure('No Match Found');
      }
    }
  }

}
