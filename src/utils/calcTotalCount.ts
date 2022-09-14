import { TCartItem } from '../redux/types/types';

export const calcTotalCount = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.count + sum, 0);
};
