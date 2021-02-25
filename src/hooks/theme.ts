import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/types';

export const useTheme = (): { theme: 'light' | 'dark' } => {
  const { theme } = useSelector(({ ui }: RootState) => ui);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return { theme };
};
