import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import { ui } from './features';

export const store = configureStore({
  reducer: { ui },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...process.env.NODE_ENV === 'development' ? [createLogger({ collapsed: true })] : [],
  ],
});
