import { ICart } from "../interfaces/cart.interface";
import { NotificationService } from "../services/notification.service";

export class Cart<IFruit> implements ICart<IFruit> {
  private storage: IFruit[] = [];

  constructor(private capacity: number = Infinity, private notificationService: NotificationService) { }

  push(item: IFruit): void {
    if (this.size() === this.capacity) {
      this.notificationService.info("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): IFruit | undefined {
    return this.storage.pop();
  }

  peekTop(): IFruit {
    return this.storage[this.size() - 1];
  }

  peek(): IFruit[] | undefined {
    return this.storage;
  }

  size(): number {
    return this.storage.length;
  }
}