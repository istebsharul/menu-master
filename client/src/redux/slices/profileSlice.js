// src/redux/slices/auth/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios'; // Axios instance with baseURL setup

// Fetch user profile
export const getProfile = createAsyncThunk('profile/getProfile', async (_, thunkAPI) => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

// Update user profile
export const updateProfile = createAsyncThunk('profile/updateProfile', async (updatedData, thunkAPI) => {
  try {
    const response = await api.put('/auth/profile', updatedData);
    console.log("Profile",response.data);
    return response.data.user;
  } catch (error) {
    console.log(error?.response?.data);
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update profile');
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;

export default profileSlice.reducer;