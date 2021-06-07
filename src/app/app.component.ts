import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '🥬 Fresh Basket';
  user: User | null = null;
  constructor(private accountService: AccountService) { }
  logout() {
    this.accountService.logout();
  }

  OnInit() {
    this.user = this.isAuthenticated();
  }

  isAuthenticated() {
    return this.accountService.userValue;
  }
}
