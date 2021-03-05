import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocaleType } from 'config';
import { CACHED_VALUES } from 'utils';
import { AppThunk } from 'store/types';

interface State {
  language: LocaleType;
  theme: 'light' | 'dark';
  showPreferences: boolean;
}

const initialState: State = {
  theme: 'light',
  language: 'en',
  showPreferences: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state: State, { payload }: PayloadAction<State['theme']>) => {
      state.theme = payload;
    },
    setLanguage: (state: State, { payload }: PayloadAction<LocaleType>) => {
      state.language = payload;
    },
    togglePreferences: (state: State) => {
      state.showPreferences = !state.showPreferences;
    },
  },
});

export const ui = uiSlice.reducer;
export const { setTheme, setLanguage, togglePreferences } = uiSlice.actions;

const rehydrateUI = (): AppThunk => async (dispatch) => {
  const [cachedTheme, cachedLanguage] = await Promise.all(
    Object.keys(CACHED_VALUES).map((key) => localStorage.getItem(key)),
  );

  if (cachedTheme) {
    dispatch(setTheme(cachedTheme as State['theme']));
  }

  if (cachedLanguage) {
    dispatch(setLanguage(cachedLanguage as State['language']));
  }
};

const changeTheme = (): AppThunk => async (dispatch, getState) => {
  const { theme } = getState().ui;
  const updatedTheme = theme === 'light' ? 'dark' : 'light';

  await localStorage.setItem(CACHED_VALUES.theme, updatedTheme);

  dispatch(setTheme(updatedTheme));
};

const changeLanguage = (): AppThunk => async (dispatch, getState) => {
  const { language } = getState().ui;
  const updatedLanguage = language === 'en' ? 'fr' : 'en';

  await localStorage.setItem(CACHED_VALUES.locale, updatedLanguage);

  dispatch(setLanguage(updatedLanguage));
};

export { rehydrateUI, changeTheme, changeLanguage };
