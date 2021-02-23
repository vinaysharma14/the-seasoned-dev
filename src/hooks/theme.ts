import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

export const useTheme = (): { theme: 'light' | 'dark' } => {
  const { theme } = useSelector(({ ui }: RootState) => ui);

  return { theme };
};
