import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fresh-basket';
  user: any;
  constructor(private accountService: AccountService) { }
  logout() {
    this.accountService.logout();
  }

  OnInit() {
    this.user = this.accountService.userValue;
    this.accountService.user
      .subscribe(user => {
        this.user = user;
      })
  }
}
