import { TCartItem } from '../redux/types/types';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.cost * obj.count + sum, 0);
};
