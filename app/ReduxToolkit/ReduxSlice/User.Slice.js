"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import { useSession } from 'next-auth/react';

import axios from 'axios';

const defaultConfig = () => {
    const accessToken = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export const GetUserData = createAsyncThunk("user/GetUserData", async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user", defaultConfig());
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({ message: "An error occurred while fetching tasks." });
    }
  });

export const CreateRepo = createAsyncThunk("user/CreateRepo", async (data, { rejectWithValue }) => {
    try {
      console.log("Data in CreateRepo",data);
      
      const res = await axios.post("/api/repository",data, defaultConfig());
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({ message: "An error occurred while fetching tasks." });
    }
 });

 export const GetRepos = createAsyncThunk("user/GetRepos", async (data, { rejectWithValue }) => {
  try {
    console.log("Data in GetRepos",data);
    
    const res = await axios.post("/api/repository/Get",data, defaultConfig());
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue({ message: error.response.data.message });
    }
    return rejectWithValue({ message: "An error occurred while fetching tasks." });
  }
});

const initialState = {
    message: "",
    user:"",
    repositories:"",
    OrderId:"",
    OrdersHistory:[],
    Tasks: [],
    RedeemCards:[]
  }
  
  export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
      RemoveOrderId(state, action) {
        state.OrderId = "";
      },
    },
    extraReducers: (builder) => {
      builder.addCase(GetUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
        .addCase(GetUserData.rejected, (state, action) => {
          console.error("Error fetching user data:", action.payload.message);
        });
      builder.addCase(CreateRepo.fulfilled, (state, action) => {
          // state.user = action.payload.user;
      })
        .addCase(CreateRepo.rejected, (state, action) => {
          console.error("Error fetching user data:", action.payload.message);
        });
        builder.addCase(GetRepos.fulfilled, (state, action) => {
          state.repositories = action.payload.repositories;
      })
        .addCase(GetRepos.rejected, (state, action) => {
          console.error("Error fetching user data:", action.payload.message);
        })
}})


export const { RemoveOrderId } = UserSlice.actions;
export default UserSlice.reducer;