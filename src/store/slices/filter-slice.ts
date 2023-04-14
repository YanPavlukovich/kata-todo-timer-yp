import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
	activeFilter: string;
}

const initialState: StateType = {
  activeFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export const selectActiveFilter = (state:{filter: StateType}) => state.filter.activeFilter;

export default filterSlice.reducer;
