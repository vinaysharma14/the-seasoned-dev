import { FC, ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { messages } from 'locales';
import { RootState } from 'store/types';

interface Props {
  children: ReactNode;
}

const App: FC<Props> = ({ children }) => {
  const { language } = useSelector(({ ui }: RootState) => ui);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  );
};

export default App;
