import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Action } from '../enums/action.enum';
import { IFruit } from '../interfaces/fruit.interface';
import { Cart } from '../models/cart.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUpdateSubject: Subject<any> = new Subject();
  cartUpdate$: Observable<any> = this.cartUpdateSubject.asObservable();
  private cart = new Cart<IFruit>(Infinity, this.notificationService);
  constructor(private notificationService: NotificationService) { }

  addFruitToCart(fruit: IFruit) {
    this.cart.push(fruit);
    this.notificationService.info(`${fruit.emoji} has been added to basket`);
    this.cartUpdateSubject.next(this.getCartItems());
  }

  removeFruitFromCart(fruit: IFruit): boolean {
    const fruitAtTop: IFruit = this.cart.peekTop();
    let isSuccessful = false;
    if (!fruitAtTop) {
      this.notificationService.info(`Cannot remove ${fruit.emoji} from basket since its is empty`);
    } else {
      if (fruitAtTop.name === fruit.name) {
        this.cart.pop();
        this.notificationService.info(`${fruit.emoji} has been removed from basket`);
        this.cartUpdateSubject.next(this.getCartItems());
        isSuccessful = true;
      } else {
        this.notificationService.info(`Cannot remove ${fruit.emoji} from basket since its not on top`);
      }
    }
    return isSuccessful;
  }

  getCartItems() {
    return this.cart.peek();
  }

}
