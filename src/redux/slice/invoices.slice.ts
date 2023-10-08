import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodReduxType, Invoice, Shop} from '../../types/types';

interface InvoiceState {
  byId: {
    [id: string]: Invoice;
  };
  allIds: string[];
}

const initialState: InvoiceState = {
  byId: {},
  allIds: [],
};

const invoiceSlice = createSlice({
  initialState,
  name: 'invoice',
  reducers: {
    createInvoice: (state, action: PayloadAction<Shop>) => {
      const {id} = action.payload;
      if (state.byId[id] === undefined) {
        state.byId[id] = {...action.payload, listFood: [], totalPrice: 0};
      }
      const isEsixtingId = state.allIds.find(item => item === id);
      if (isEsixtingId === undefined) {
        state.allIds.push(id);
      }
    },
    addFood: (
      state,
      action: PayloadAction<{food: FoodReduxType; idInvoice: string}>,
    ) => {
      const {food, idInvoice} = action.payload;
      const invoice = state.byId[idInvoice];
      const foodAlreadyExsited = invoice.listFood.find(item => {
        return (
          item.name === food.name &&
          JSON.stringify(item.options) === JSON.stringify(food.options) &&
          JSON.stringify(item.toppings) === JSON.stringify(food.toppings)
        );
      });

      if (foodAlreadyExsited === undefined) {
        const newListFood = [...invoice.listFood, food];
        state.byId[action.payload.idInvoice] = {
          ...invoice,
          listFood: newListFood,
        };
      } else {
        const newFood = {
          ...foodAlreadyExsited,
          quantity: food.quantity + foodAlreadyExsited.quantity,
        };
        const newListFood = invoice.listFood.map(item => {
          if (item.id === foodAlreadyExsited.id) {
            return newFood;
          }
          return item;
        });
        state.byId[action.payload.idInvoice] = {
          ...invoice,
          listFood: newListFood,
        };
      }
    },
  },
});

export default invoiceSlice.reducer;
export const {addFood, createInvoice} = invoiceSlice.actions;
