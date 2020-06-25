import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanGuarantorsComponent } from './loan-guarantors/loan-guarantors.component';
import { ProductCategoryComponent } from './product-category/product-category.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-home', component: DashboardHomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent,  canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent,  canActivate: [AuthGuard] },
  { path: 'support' , component: SupportComponent,  canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent,  canActivate: [AuthGuard] },
  { path: 'withdrawals', component: WithdrawalsComponent, canActivate: [AuthGuard] },
  { path: 'loan-request', component: LoanRequestComponent,  canActivate: [AuthGuard] },
  { path: 'loan-guarantors', component: LoanGuarantorsComponent,  canActivate: [AuthGuard] },
  { path: 'product-category', component: ProductCategoryComponent,  canActivate: [AuthGuard] },
  { path: '', pathMatch : 'full', redirectTo: 'login' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
