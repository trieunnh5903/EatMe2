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
  ({food, shop}: {food: FoodReduxType; shop: Shop}, {dispatch}) => {
    const invoiceId = shop.id;
    dispatch(invoiceSlice.actions.createInvoice(shop));
    dispatch(invoiceSlice.actions.addFood({food, idInvoice: invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId}));
  },
);

export const increaseFoodQuantity = createAsyncThunk(
  'invoice/increaseFoodQuantityMiddleware',
  ({foodId, invoiceId}: {foodId: string; invoiceId: string}, {dispatch}) => {
    dispatch(invoiceSlice.actions.increaseFoodQuantity({foodId, invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId}));
  },
);

export const decreaseFoodQuantity = createAsyncThunk(
  'invoice/decreaseFoodQuantityMiddleware',
  ({foodId, invoiceId}: {foodId: string; invoiceId: string}, {dispatch}) => {
    dispatch(invoiceSlice.actions.decreaseFoodQuantity({foodId, invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId}));
  },
);

export const removeFood = createAsyncThunk(
  'invoice/removeFoodMiddleware',
  ({foodId, invoiceId}: {foodId: string; invoiceId: string}, {dispatch}) => {
    dispatch(invoiceSlice.actions.removeFood({foodId, invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId}));
  },
);

export const removeAllFood = createAsyncThunk(
  'invoice/removeAllFoodMiddleware',
  ({invoiceId}: {invoiceId: string}, {dispatch}) => {
    dispatch(invoiceSlice.actions.removeAllFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalFood({invoiceId}));
    dispatch(invoiceSlice.actions.caculateTotalPrice({invoiceId}));
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

      if (!state.allIds.includes(id)) {
        state.allIds.push(id);
      }

      console.log('createInvoice');
    },

    addFood: (
      state,
      action: PayloadAction<{food: FoodReduxType; idInvoice: string}>,
    ) => {
      const {food, idInvoice} = action.payload;
      const invoice = state.byId[idInvoice];
      const existingFood = invoice.listFood.find(item => {
        return (
          item.name === food.name &&
          JSON.stringify(item.options) === JSON.stringify(food.options) &&
          JSON.stringify(item.toppings) === JSON.stringify(food.toppings)
        );
      });

      if (existingFood === undefined) {
        invoice.listFood.push(food);
      } else {
        existingFood.quantity += food.quantity;
      }
      console.log('addFood');
      // if (foodAlreadyExsited === undefined) {
      //   const newListFood = [...invoice.listFood, food];
      //   state.byId[action.payload.idInvoice] = {
      //     ...invoice,
      //     listFood: newListFood,
      //   };
      // } else {
      //   const newFood = {
      //     ...foodAlreadyExsited,
      //     quantity: food.quantity + foodAlreadyExsited.quantity,
      //   };
      //   const newListFood = invoice.listFood.map(item => {
      //     if (item.id === foodAlreadyExsited.id) {
      //       return newFood;
      //     }
      //     return item;
      //   });
      //   state.byId[action.payload.idInvoice] = {
      //     ...invoice,
      //     listFood: newListFood,
      //   };
      // }
    },

    caculateTotalFood: (state, action: PayloadAction<{invoiceId: string}>) => {
      const id = action.payload.invoiceId;
      const invoice = state.byId[id];
      invoice.numOfFood = invoice.listFood.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      console.log('caculateTotalFood');
    },

    caculateTotalPrice: (state, action: PayloadAction<{invoiceId: string}>) => {
      const id = action.payload.invoiceId;
      const invoice = state.byId[id];
      invoice.totalPrice = invoice.listFood.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      console.log('caculateTotalPrice');
    },

    increaseFoodQuantity(
      state,
      action: PayloadAction<{foodId: string; invoiceId: string}>,
    ) {
      const {foodId, invoiceId} = action.payload;
      const invoice = state.byId[invoiceId];
      const food = invoice.listFood.find(item => item.id === foodId);
      if (food) {
        food.quantity++;
      }
      console.log('increaseFoodQuantity');
    },

    decreaseFoodQuantity(
      state,
      action: PayloadAction<{foodId: string; invoiceId: string}>,
    ) {
      const {foodId, invoiceId} = action.payload;
      const invoice = state.byId[invoiceId];
      const food = invoice.listFood.find(item => item.id === foodId);
      if (food) {
        food.quantity--;
      }
      console.log('decreaseFoodQuantity');
    },

    removeFood(
      state,
      action: PayloadAction<{foodId: string; invoiceId: string}>,
    ) {
      const {foodId, invoiceId} = action.payload;
      const invoice = state.byId[invoiceId];
      invoice.listFood = invoice.listFood.filter(item => item.id !== foodId);
      console.log('removeFood');
    },

    removeAllFood(state, action: PayloadAction<{invoiceId: string}>) {
      const {invoiceId} = action.payload;
      const invoice = state.byId[invoiceId];
      invoice.listFood = [];
      console.log('removeAllFood');
    },
  },
});

export default invoiceSlice.reducer;
