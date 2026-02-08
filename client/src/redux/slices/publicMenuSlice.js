// store/publicMenuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk with fetch
export const fetchPublicMenu = createAsyncThunk(
  "menu/fetchPublicMenu",
  async (slug, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/public/menu?slug=${slug}`);
      return res.data;
    } catch (err) {
      console.log("Error", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  }
);

const publicMenuSlice = createSlice({
  name: "publicMenu",
  initialState: {
    restaurant: null,
    categories: [],
    items: [],
    loading: false,
    error: null,
  },    
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        state.items = action.payload.menuItems;

        // Derive categories from items (unique categoryId)
        const categories = Array.from(
          new Map(action.payload.menuItems.map((item) => [item.categoryId._id, item.categoryId])).values()
        ).sort((a, b) => a.name.localeCompare(b.name));
        state.categories = categories;
      })
      .addCase(fetchPublicMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default publicMenuSlice.reducer;
