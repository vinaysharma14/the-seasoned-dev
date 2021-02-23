import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useTheme } from 'hooks';
import { Contrast, Language } from 'assets/icons';
import { changeTheme, changeLanguage } from 'store/features';

import { messages } from './messages';

import './styles.scss';

export const SuspenseFallback: FC = () => {
  const intl = useIntl();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);

  const themeClickHandler = useCallback(() => dispatch(changeTheme()), [dispatch]);
  const langClickHandler = useCallback(() => dispatch(changeLanguage()), [dispatch]);

  useEffect(() => setAnimate(true), []);

  return (
    <div className={`container ${theme}`}>
      <Contrast className="cta theme" onClick={themeClickHandler} />
      <Language className="cta language" onClick={langClickHandler} />

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
