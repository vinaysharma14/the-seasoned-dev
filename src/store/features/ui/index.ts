import { createSlice } from '@reduxjs/toolkit';

interface State {
  theme: 'light' | 'dark';
}

const initialState: State = {
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state: State) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const ui = uiSlice.reducer;
export const { toggleTheme } = uiSlice.actions;
