import { FC } from 'react';

type LazyImport = Promise<{ default: FC<unknown> }>;

const delayImport = (lazyImport: LazyImport): LazyImport => Promise.all([
  lazyImport, new Promise((resolve) => setTimeout(resolve, 2000)),
]).then(([moduleExports]) => moduleExports);

export { delayImport };
