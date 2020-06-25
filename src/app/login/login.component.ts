import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIGNIN_USER_MUTATION, ADMIN_USER } from '../graphql';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../service/general-service.service';
import { AuthService } from '../service/auth.service';
import { onError } from 'apollo-link-error';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showLoader = false;
  btnValue = 'Submit';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private apollo: Apollo, private router: Router, private generalService: GeneralServiceService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.btnValue = '';
    this.showLoader = true;
    this.apollo.query({
      query: ADMIN_USER,
      variables: this.form.value
    }).subscribe((res) => {
      // @ts-ignore
      if (res.data.adminUser.isAdmin === true) {
        this.apollo.mutate({
          mutation: SIGNIN_USER_MUTATION,
          variables: this.form.value,
        }).subscribe((rs) => {
          this.showLoader = false;
          this.btnValue = 'Submit';
          // @ts-ignore
          const id = res.data.adminUser.id;
          // @ts-ignore
          const userData: {} = res.data.adminUser;
          // @ts-ignore
          const token = rs.data.tokenAuth.token;
          this.authService.saveUserData(id, token, JSON.stringify(userData));
          if (this.authService.isLoggedIn) {
            console.log('entered');
            this.router.navigate(['/dashboard']);
          }

        }, error1 => {
          // console.log(error1.message.replace('GraphQL error:', '').trim());
          this.showLoader = false;
          this.btnValue = 'Submit';
          this.generalService.showFailure(error1.message.replace('GraphQL error:', '').trim());
        });
      }
    }, error1 => {
      this.showLoader = false;
      this.btnValue = 'Submit';
      this.generalService.showFailure(error1.message.replace('GraphQL error:', '').trim());
    });
  }

}
