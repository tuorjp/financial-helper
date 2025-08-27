export type AuthUserProps = {
  name?: string;
  email: string;
  password: string;
}

export type UserProps = {
  token: string;
  user: string;
}

export type SingleCategory = {
  id?: number;
  name: string;
  type: number;
}

export type ManyCategories = SingleCategory[]

export interface SingleReceipt {
  id?: number;
  receiptValue: number;
  receiptDate: string;
  category: number;
}
export type ManyReceipts = SingleReceipt[];

export interface SinglePayment {
  id?: number;
  paymentValue: number;
  paymentDate: string;
  category: number;
}
export type ManyPayments = SinglePayment[];