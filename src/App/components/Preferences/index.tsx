import {
  FC,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Close, Contrast, Language } from 'assets/icons';

import { RootState } from 'store/types';
import { changeLanguage, changeTheme, togglePreferences } from 'store/features';

import './styles.scss';

export const Preferences: FC = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const { showPreferences } = useSelector(({ ui }: RootState) => ui);

  const closePreferences = useCallback(() => dispatch(togglePreferences()), [dispatch]);

  const handleClickOutside = useCallback((e): void => {
    if (ref.current !== null && !ref.current.contains(e.target as Node)) {
      closePreferences();
    }
  }, [closePreferences]);

  useEffect(() => {
    if (showPreferences) {
      document.addEventListener('click', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPreferences, handleClickOutside]);

  const themeClickHandler = useCallback(() => {
    dispatch(changeTheme());
  }, [dispatch]);

  const langClickHandler = useCallback(() => {
    dispatch(changeLanguage());
  }, [dispatch]);

  return (
    showPreferences ? (
      createPortal(
        <div className="backdrop">
          <div className="preferences-container" ref={ref}>
            <div className="bg" />
            <Contrast onClick={themeClickHandler} />
            <Language onClick={langClickHandler} />
            <Close onClick={closePreferences} />
          </div>
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('portal')!,
      )
    ) : null
  );
};
