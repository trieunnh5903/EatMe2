import {useSelector} from 'react-redux';
import {RootState} from './store';
import {createSelector} from '@reduxjs/toolkit';

export const useSelectCartById = (id: string) => {
  const cart = useSelector((state: RootState) => state.cart.byId[id]);
  return cart;
};

const makeTotalFoodCountSelector = () =>
  createSelector(
    (state: RootState, restaurantId: string) => state.cart.byId[restaurantId],
    cart => {
      if (!cart) {
        return 0;
      }
      return cart.reduce((total, item) => total + item.quantity, 0);
    },
  );

export const getTotalFoodCount = makeTotalFoodCountSelector();

const makeTotalPriceSelector = () =>
  createSelector(
    (state: RootState, restaurantId: string) => state.cart.byId[restaurantId],
    cart => {
      if (!cart) {
        return 0;
      }
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
  );

export const getTotalFoodPriceOneInvoice = makeTotalPriceSelector();

export const useSelectTotalCart = createSelector(
  (state: RootState) => state.cart,
  cartsState => cartsState.allIds.map(cartId => cartsState.byId[cartId]).length,
);

export const useSelectAllRestaurant = createSelector(
  (state: RootState) => state.restaurant,
  restaurantState =>
    restaurantState.allIds.map(
      restaurantId => restaurantState.byId[restaurantId],
    ),
);
