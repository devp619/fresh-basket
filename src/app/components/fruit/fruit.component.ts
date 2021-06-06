import { CartService } from './../../services/cart.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFruit } from '../../interfaces/fruit.interface';
import { Action } from 'src/app/enums/action.enum';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss']
})
export class FruitComponent implements OnInit {
  @Input('fruit') fruit!: IFruit;
  @Output() onFruitChange: EventEmitter<IFruit> = new EventEmitter();

  constructor(private cartService: CartService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onUserAction(action: string, fruit: IFruit) {
    // Add/remove fruit to/from cart
    switch (action) {
      case Action.ADD:
        if (this.fruit.quantity > 0) {
          this.cartService.addFruitToCart(fruit);
          this.onFruitChange.emit({ ...fruit, quantity: this.fruit.quantity - 1 });
        } else {
          this.notificationService.info(`No more ${this.fruit.name}s avaiable`);
        }
        break;
      case Action.REMOVE:
        const isSuccessful = this.cartService.removeFruitFromCart(fruit);
        if (isSuccessful) {
          this.onFruitChange.emit({ ...fruit, quantity: this.fruit.quantity + 1 });
        }
    }
  }

}
