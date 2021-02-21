import { FC, lazy, Suspense } from 'react';

import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { SuspenseFallback } from 'fallbacks';

const App = lazy(() => import(/* webpackChunkName: "app" */ 'App'));

const Home = lazy(() => import(/* webpackChunkName: "home" */ './Home'));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ './NotFound'));

export const Router: FC = () => (
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
