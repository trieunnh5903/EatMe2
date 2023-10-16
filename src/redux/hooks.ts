import {useSelector} from 'react-redux';
import {RootState} from './store';
import {createSelector} from '@reduxjs/toolkit';

export const useSelectCartById = (id: string) => {
  const cart = useSelector((state: RootState) => state.cart.byId[id]);
  return cart;
};

const makeTotalFoodCountSelector = () =>
  createSelector(
    (state: RootState, restaurantId: string) => state.cart.byId[restaurantId], // Lấy thông tin hóa đơn từ state
    cart => {
      if (!cart) {
        return 0;
      } // Kiểm tra nếu không tìm thấy hóa đơn
      // Thực hiện tính toán tổng số lượng món ăn ở đây
      return cart.reduce((total, item) => total + item.quantity, 0); // Ví dụ: Đây giả sử món ăn được lưu trong mảng foodItems
    },
  );

export const getTotalFoodCount = makeTotalFoodCountSelector();

export const useSelectTotalCart = createSelector(
  (state: RootState) => state.cart,
  cartsState => cartsState.allIds.map(cartId => cartsState.byId[cartId]).length,
);

export const useSelectAllCart = createSelector(
  (state: RootState) => state.restaurant,
  cartsState => cartsState.allIds.map(cartId => cartsState.byId[cartId]),
);
