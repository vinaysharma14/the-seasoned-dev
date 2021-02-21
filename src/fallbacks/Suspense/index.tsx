import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useTheme } from 'hooks';
import { Contrast } from 'assets/icons';
import { changeTheme } from 'store/features';

import { messages } from './messages';

import './styles.scss';

export const SuspenseFallback: FC = () => {
  const intl = useIntl();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);
  const clickHandler = useCallback(() => dispatch(changeTheme()), [dispatch]);

  useEffect(() => setAnimate(true), []);

  return (
    <div className={`container ${theme}`}>
      <Contrast onClick={clickHandler} />

      <div>
        {Object.keys(messages).map((key) => (
          <h1 key={key} className={animate ? 'animate' : ''}>
            {intl.formatMessage(messages[key], { whitespace: '\u00a0' })}
          </h1>
        ))}
      </div>
    </div>
  );
};
