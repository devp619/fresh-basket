import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import users from './data/users.json';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const user = users.find((user: User) => user.name === username);
    if (user && user.password === password) {
      if (user.permission === 'all') {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      } else {
        this.notificationService.info("You don't have permission to access this application");
      }

    } else {
      this.notificationService.info('Incorrect password, please try again');
    }
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }
}