export class Expense {
  id: number;
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;

  constructor(id: number, name: string, amount: number, currency: string, category: string, date: Date) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.currency = currency;
    this.category = category;
    this.date = date;
  }
}