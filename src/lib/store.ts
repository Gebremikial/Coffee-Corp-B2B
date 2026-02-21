import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventorySlice';
import orderReducer from './features/orderSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      inventory: inventoryReducer,
      orders: orderReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];