import { FC, useEffect, useState } from 'react';

import { useTheme } from 'hooks';

import './styles.scss';

export const SuspenseFallback: FC = () => {
  const { theme } = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  return (
    <div className={`container ${theme}`}>
      <h1 className={animate ? 'animate' : ''}>TH</h1>
      <h1 className={animate ? 'animate' : ''}>E&nbsp;</h1>
      <h1 className={animate ? 'animate' : ''}>SEASON</h1>
      <h1 className={animate ? 'animate' : ''}>ED&nbsp;</h1>
      <h1 className={animate ? 'animate' : ''}>DEV</h1>
    </div>
  );
};
