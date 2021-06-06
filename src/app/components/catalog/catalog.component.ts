import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { IFruit } from '../../interfaces/fruit.interface';
import { FruitsService } from '../../services/fruits.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  fruits: IFruit[] = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fruitsService: FruitsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getFruits();
  }

  getFruits(): void {
    this.fruitsService.getFruits()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((fruits: IFruit[]) => this.fruits = fruits);
  }

  updateFruits(event: IFruit): void {
    const index = this.fruits.findIndex(fruit => fruit.name === event.name);
    this.fruits[index].quantity = event.quantity;
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.ngUnsubscribe.unsubscribe();
  }

}
