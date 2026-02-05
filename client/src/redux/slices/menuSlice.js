import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios'; // adjust path if needed

const API = '/api/menu';

// Get all categories
export const fetchCategories = createAsyncThunk(
  'menu/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/categories`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add category
export const addCategory = createAsyncThunk(
  'menu/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const res = await api.post(`/categories`, categoryData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  'menu/updateCategory',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await api.patch(`/categories/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  'menu/deleteCategory',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get all menu items
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/items`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add menu item
export const addMenuItem = createAsyncThunk(
  'menu/addMenuItem',
  async (itemData, thunkAPI) => {
    try {
      const res = await api.post(`/items`, itemData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update menu item
export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await api.patch(`/items/${id}`, updatedData, { headers: { "Content-Type": "multipart/form-data" } });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete menu item
export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/items/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const toggleMenuAvailability = createAsyncThunk(
  'menu/toggleAvailability',
  async ({ id, available }, thunkAPI) => {
    try {
      await api.patch(`/items/availability/${id}`, { available });
      return { id, available };
    } catch (error) {
      return thunkAPI.rejectWithValue({ id });
    }
  }
);

const initialState = {
  categories: [],
  menuItems: [],
  loading: false,
  itemLoading: {},
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuError(state) {
      state.error = null;
    },
    toggleMenuAvailabilityOptimistic(state, action) {
      const item = state.menuItems.find(i => i._id === action.payload);
      if (item) {
        item.available = !item.available;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Menu Items
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems.push(action.payload);
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Menu Item
      .addCase(updateMenuItem.pending, (state, action) => {
        const id = action.meta.arg.id; // get the item id from thunk argument
        state.itemLoading = { ...state.itemLoading, [id]: true };
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.menuItems.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.menuItems[index] = action.payload; 
        }
        // remove loader for this item
        delete state.itemLoading[action.payload._id];
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        const id = action.meta.arg.id;
        delete state.itemLoading[id];
        state.error = action.payload;
      })

      // Delete Menu Item
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = state.menuItems.filter(item => item._id !== action.payload);
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Availability
      .addCase(toggleMenuAvailability.rejected, (state, action) => {
        const item = state.menuItems.find(i => i._id === action.payload.id);
        if (item) {
          item.available = !item.available; // rollback
        }
      })
  },
});

export const { clearMenuError, toggleMenuAvailabilityOptimistic } = menuSlice.actions;
export default menuSlice.reducer;