import { createSlice } from '@reduxjs/toolkit';

const placesSlice = createSlice({
  name: 'places',
  initialState: [],
  reducers: {
    addPlace: (state, action) => {
      state.push(action.payload);
      
    }
  }
});

export const { addPlace } = placesSlice.actions;
export default placesSlice.reducer;