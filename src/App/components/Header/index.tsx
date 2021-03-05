import { FC, useCallback } from 'react';

import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { Contrast, Language, Options } from 'assets/icons';
import { changeTheme, changeLanguage, togglePreferences } from 'store/features';

import { message } from '../../messages';

import './styles.scss';

export const Header: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const themeClickHandler = useCallback(() => dispatch(changeTheme()), [dispatch]);
  const langClickHandler = useCallback(() => dispatch(changeLanguage()), [dispatch]);
  const preferenceHandler = useCallback(() => dispatch(togglePreferences()), [dispatch]);

  return (
    <div className="header">
      <h1>{intl.formatMessage(message.theSeasonedDev)}</h1>

      <Options id="options" onClick={preferenceHandler} />

      <div className="icons-container">
        <Contrast onClick={themeClickHandler} />
        <Language onClick={langClickHandler} />
      </div>
    </div>
  );
};
