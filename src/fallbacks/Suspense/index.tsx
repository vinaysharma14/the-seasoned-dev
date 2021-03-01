import { FC, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useTheme } from 'hooks';

import { messages } from './messages';

import './styles.scss';

export const SuspenseFallback: FC = () => {
  const intl = useIntl();
  const { theme } = useTheme();

  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  return (
    <div className={`container ${theme}`}>
      {Object.keys(messages).map((key) => (
        <h1 key={key} className={animate ? 'animate' : ''}>
          {intl.formatMessage(messages[key], { whitespace: '\u00a0' })}
        </h1>
      ))}
    </div>
  );
};
