import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocaleType } from 'config';
import { CACHED_VALUES } from 'utils';
import { AppThunk } from 'store/types';

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
    setTheme: (state: State, { payload }: PayloadAction<State['theme']>) => {
      state.theme = payload;
    },
    chooseLanguage: (state: State, { payload }: PayloadAction<LocaleType>) => {
      state.language = payload;
    },
  },
});

export const ui = uiSlice.reducer;
export const { setTheme, chooseLanguage } = uiSlice.actions;

const rehydrateUI = (): AppThunk => async (dispatch) => {
  const cachedTheme = await localStorage.getItem(CACHED_VALUES.theme);

  if (cachedTheme) {
    dispatch(setTheme(cachedTheme as State['theme']));
  }
};

const changeTheme = (): AppThunk => async (dispatch, getState) => {
  const { theme } = getState().ui;
  const updatedTheme = theme === 'light' ? 'dark' : 'light';

  await localStorage.setItem(CACHED_VALUES.theme, updatedTheme);

  dispatch(setTheme(updatedTheme));
};

export { rehydrateUI, changeTheme };
