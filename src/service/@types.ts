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