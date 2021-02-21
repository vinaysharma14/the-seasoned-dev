import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useDispatch } from 'react-redux';

import { useTheme } from 'hooks';
import { Contrast } from 'assets/icons';
import { changeTheme } from 'store/features';

import './styles.scss';

export const SuspenseFallback: FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);
  const clickHandler = useCallback(() => dispatch(changeTheme()), [dispatch]);

  useEffect(() => setAnimate(true), []);

  return (
    <div className={`container ${theme}`}>
      <Contrast onClick={clickHandler} />

      <div>
        <h1 className={animate ? 'animate' : ''}>TH</h1>
        <h1 className={animate ? 'animate' : ''}>E&nbsp;</h1>
        <h1 className={animate ? 'animate' : ''}>SEASON</h1>
        <h1 className={animate ? 'animate' : ''}>ED&nbsp;</h1>
        <h1 className={animate ? 'animate' : ''}>DEV</h1>
      </div>
    </div>
  );
};
