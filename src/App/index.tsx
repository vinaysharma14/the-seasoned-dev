import { FC, ReactNode } from 'react';

import { useTheme } from 'hooks';

import './styles.scss';

interface Props {
  children: ReactNode;
}

const App: FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      {children}
    </div>
  );
};

export default App;
