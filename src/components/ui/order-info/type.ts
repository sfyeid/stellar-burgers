import { TIngredient } from '@utils-types';

export type OrderInfUIProps = {
  OrderInf: TOrderInf;
};

type TOrderInf = {
  ingredientsInfo: {
    [key: string]: TIngredient & { count: number };
  };
  date: Date;
  total: number;
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};
