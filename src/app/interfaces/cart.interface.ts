export interface ICart<IFruit> {
  push(item: IFruit): void;
  pop(): IFruit | undefined;
  peek(): IFruit[] | undefined;
  peekTop(): IFruit | undefined;
  size(): number;
}