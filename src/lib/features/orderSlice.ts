import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Define what an Order looks like
export interface Order {
  id: string;
  clientName: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Shipped';
  date: string; // Added for better B2B tracking
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [
    { id: '101', clientName: 'Blue Bottle Cafe', amount: 450, status: 'Pending', date: '2026-02-20' },
    { id: '102', clientName: 'Grand Hyatt Hotel', amount: 1200, status: 'Approved', date: '2026-02-19' },
  ],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // A B2B manager approving an order
    approveOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'Approved';
      }
    },
    // Adding a new business order
    addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'status' | 'date'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `PO-${Math.floor(Math.random() * 10000)}`, // Auto-generate ID
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      // .unshift puts the newest order at the TOP of the list
      state.orders.unshift(newOrder);
    },
    // Remove an order (Useful for cleaning up canceled requests)
    cancelOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    }
  },
});

export const { approveOrder, addOrder, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;