import { TCartItem } from '../redux/types/types';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce(
    (sum, obj) => Math.floor(obj.cost - (obj.cost / 100) * obj.sale) * obj.count + sum,
    0,
  );
};
