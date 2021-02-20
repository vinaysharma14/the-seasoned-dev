import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocaleType } from 'config';

interface State {
  language: LocaleType;
  theme: 'light' | 'dark';
}

const initialState: State = {
  theme: 'light',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state: State) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    chooseLanguage: (state: State, action: PayloadAction<LocaleType>) => {
      state.language = action.payload;
    },
  },
});

export const ui = uiSlice.reducer;
export const { toggleTheme, chooseLanguage } = uiSlice.actions;
