import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const App: FC<Props> = ({ children }) => (
  <>
    {children}
  </>
);

export default App;
