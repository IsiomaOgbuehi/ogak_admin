import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../service/general-service.service';
import { Apollo } from 'apollo-angular';
import { GET_UNREAD_SUPPORT } from '../graphql';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  unreadSupport = 0;
  constructor(private generalService: GeneralServiceService, private apollo: Apollo, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUnreadSupport();
  }

  showNav = () => {
    this.generalService.showNav();
  }

  getUnreadSupport = () => {
    this.apollo.query({
      query: GET_UNREAD_SUPPORT
    }).subscribe((result) => {
      // @ts-ignore
      this.unreadSupport = result.data.getUnreadSupport.length;
    });
  }

  logout = () => {
    this.authService.logout();
  }

}
