import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

export const addFood = createAsyncThunk(
  'invoice/addFoodMiddleware',
  ({food, idInvoice}: {food: FoodReduxType; idInvoice: string}, {dispatch}) => {
    dispatch(invoiceSlice.actions.addFood({food, idInvoice}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId: idInvoice}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId: idInvoice}));
  },
);

const invoiceSlice = createSlice({
  initialState,
  name: 'invoice',
  reducers: {
    createInvoice: (state, action: PayloadAction<Shop>) => {
      const {id} = action.payload;
      if (state.byId[id] === undefined) {
        state.byId[id] = {
          ...action.payload,
          listFood: [],
          totalPrice: 0,
          numOfFood: 0,
        };
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

    caculateTotalFood: (state, action: PayloadAction<{invoiceId: string}>) => {
      const id = action.payload.invoiceId;
      const invoice = state.byId[id];
      invoice.numOfFood = invoice.listFood.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
    },

    caculateTotalPrice: (state, action: PayloadAction<{invoiceId: string}>) => {
      const id = action.payload.invoiceId;
      const invoice = state.byId[id];
      invoice.totalPrice = invoice.listFood.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
  },
});

export default invoiceSlice.reducer;
export const {createInvoice} = invoiceSlice.actions;
