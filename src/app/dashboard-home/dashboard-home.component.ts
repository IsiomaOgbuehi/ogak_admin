import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ALL_USERS, GET_UNREAD_WITDRWAAL, GET_TODAYS_TRANSACTION } from '../graphql';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  users = [];
  registeredCustomers = 0;
  registeredAgents = 0;
  unreadWitdraw = [];
  todaysTransaction = [];
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getCusomers();
    this.getUnreadWitdrawal();
    this.getTodaysTransaction();
  }

  getCusomers = () => {
    this.apollo.query({
      query: ALL_USERS
    }).subscribe((res) => {
      // @ts-ignore
      this.users = res.data.allUsers;
      this.registeredCustomers = this.users.length;
      this.users.map(val => val.userType === 'AGENT' ? this.registeredAgents ++ : this.registeredAgents);
    });
  }

  getUnreadWitdrawal = () => {
    this.apollo.query({
      query: GET_UNREAD_WITDRWAAL
    }).subscribe((res) => {
      // @ts-ignore
      this.unreadWitdraw = res.data.getUnreadWithdrawal.length;
    });
  }

  getTodaysTransaction = () => {
    this.apollo.query({
      query: GET_TODAYS_TRANSACTION
    }).subscribe((result) => {
      // @ts-ignore
      this.todaysTransaction = result.data.getTodaysTransaction;
    });
  }

}
