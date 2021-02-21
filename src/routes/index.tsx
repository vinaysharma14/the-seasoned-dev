import {
  FC,
  lazy,
  Suspense,
  useEffect,
} from 'react';

import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { delayImport } from 'utils';
import { SuspenseFallback } from 'fallbacks';
import { rehydrateUI } from 'store/features';

const App = lazy(() => import(/* webpackChunkName: "app" */ 'App'));

const Home = lazy(() => delayImport(import(/* webpackChunkName: "home" */ './Home')));
const NotFound = lazy(() => delayImport(import(/* webpackChunkName: "not-found" */ './NotFound')));

export const Router: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(rehydrateUI()); }, [dispatch]);

  return (
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
  );
};
