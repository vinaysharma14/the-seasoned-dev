import {
  FC,
  lazy,
  Suspense,
  useEffect,
} from 'react';

import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { messages } from 'locales';
import { delayImport } from 'utils';

import { SuspenseFallback } from 'fallbacks';

import { RootState } from 'store/types';
import { rehydrateUI } from 'store/features';

const App = lazy(() => import(/* webpackChunkName: "app" */ 'App'));

const Home = lazy(() => delayImport(import(/* webpackChunkName: "home" */ './Home')));
const NotFound = lazy(() => delayImport(import(/* webpackChunkName: "not-found" */ './NotFound')));

export const Router: FC = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(({ ui }: RootState) => ui);

  useEffect(() => { dispatch(rehydrateUI()); }, [dispatch]);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <BrowserRouter>
        <Suspense fallback={<SuspenseFallback />}>
          <App>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="*" component={NotFound} />
            </Switch>
          </App>
        </Suspense>
      </BrowserRouter>
    </IntlProvider>
  );
};
