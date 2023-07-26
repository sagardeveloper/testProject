// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'user',
  initialState: {
    users:[],
    loading:false
  },
  reducers: {
    setUsers: (state, action) => {
        console.log('state inside reducer',state.users.reverse(),action)
        state.users = action?.payload;
        state.loading = false;
      },
    startLoading: (state, action) => {
        state.loading = false;
      },
  },
});

export const { setUsers, startLoading } = counterSlice.actions;
export default counterSlice.reducer;