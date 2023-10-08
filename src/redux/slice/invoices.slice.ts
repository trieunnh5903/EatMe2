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
      console.log('//////////////////////////');
      // console.log(state.allIds, state.byId);
      // console.log(invoice.id);
      // console.log(invoice.listFood);
      // const foodAlreadyExsited = invoice.listFood.some(item => {
      //   return (
      //     item.name === food.name &&
      //     JSON.stringify(item.options) === JSON.stringify(food.options) &&
      //     JSON.stringify(item.toppings) === JSON.stringify(food.toppings)
      //   );
      // });
      // console.log('foodAlreadyExsited', foodAlreadyExsited);
      // if (foodAlreadyExsited) {
      // } else {
      //   invoice.listFood.push(food);
      // }
      const newListFood = [...invoice.listFood, food];
      console.log(newListFood);
      state.byId[action.payload.idInvoice] = {
        ...invoice,
        listFood: newListFood,
      };
      console.log(state.byId[action.payload.idInvoice].listFood);

      // const {idInvoice, food} = action.payload;
      // let invoice = state.byId[idInvoice];
      // const {listFood} = invoice;
      // console.log(invoice);
      // const foodAlreadyExsited = listFood.some(item => item.id === food.id);
      // if (foodAlreadyExsited === false) {
      //   listFood.push(food);
      //   state.byId[idInvoice] = {...invoice, listFood};
      // }
      // console.log(state.allIds, state.byId);
    },
  },
});

export default invoiceSlice.reducer;
export const {addFood, createInvoice} = invoiceSlice.actions;
