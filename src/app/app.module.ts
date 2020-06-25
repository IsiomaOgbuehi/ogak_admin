import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GraphQLModule } from './apollo.config';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // To Display Toast
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanGuarantorsComponent } from './loan-guarantors/loan-guarantors.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHomeComponent,
    SideMenuComponent,
    NavComponent,
    UsersComponent,
    ProductsComponent,
    SettingsComponent,
    SupportComponent,
    TransactionsComponent,
    WithdrawalsComponent,
    LoanRequestComponent,
    LoanGuarantorsComponent,
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    GraphQLModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
