// src/redux/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData) => {
    try {
      const response = await axios.post('/api/v1/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const initialState = {
  user: null,
  status: 'idle',
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
