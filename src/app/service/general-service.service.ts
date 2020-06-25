import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  showSideNav = false;
  env = environment;
  constructor(private toastr: ToastrService) { }

  showSuccess(msg, title) {
    this.toastr.success(msg, title);
  }
  showFailure(msg) {
    this.toastr.error(msg, 'Error!');
  }
  showNav = () => {
    this.env.showNav = !this.env.showNav;
  }
}
