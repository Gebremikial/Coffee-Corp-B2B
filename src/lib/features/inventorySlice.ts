import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the Async Thunk (The API Caller)
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    // Simulating a 1.5 second network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you'd use: const response = await fetch('/api/inventory');
    return [
      { id: 'p1', name: 'Ethiopian Yirgacheffe', price: 18.50, stock: 45, category: 'Beans' },
      { id: 'p2', name: 'Espresso Machine Pro', price: 1200.00, stock: 3, category: 'Equipment' },
      { id: 'p3', name: 'Caramel Syrup', price: 12.00, stock: 8, category: 'Syrups' },
    ];
  }
);

interface InventoryState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  status: 'idle',
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.stock += action.payload.amount;
    },
  },
  // 2. Handle the "Async" states here
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export const { updateStock } = inventorySlice.actions;
export default inventorySlice.reducer;