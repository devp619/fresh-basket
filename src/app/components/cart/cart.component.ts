import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) { }
  cart: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit(): void {
    this.getCartList();
    this.cartService.cartUpdate$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  getCartList(): void {
    this.cart = this.cartService.getCartItems();
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.ngUnsubscribe.unsubscribe();
  }
}

