import { calcTotalPrice } from './calcTotalPrice';
import { calcTotalCount } from './calcTotalCount';
import { TCartItem } from '../redux/types/types';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  return {
    items: items as TCartItem[],
    totalPrice,
    totalCount,
  };
};
