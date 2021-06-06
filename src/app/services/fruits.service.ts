import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import fruits from './data/fruits.json';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {

  constructor() { }

  getFruits() {
    return of(fruits);
  }
}
