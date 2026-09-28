import {
  findTimer,
  RESET_PATH_SEGMENT,
  TEST_PATH_SEGMENT,
} from './timerConfig';
import ResetPage from './ResetPage';
import TestTimerPage from './TestTimerPage';
import TimerPage, { UnknownTimerPage } from './TimerPage';

const TIMER_ROUTE = /^\/timer\/([^/]+)\/?$/;

/** Returns the timer route element for the given path, or null if it is not a timer URL. */
export function matchTimerRoute(pathname: string): JSX.Element | null {
  const match = TIMER_ROUTE.exec(pathname);
  if (!match) return null;
  const segment = decodeURIComponent(match[1]);
  if (segment === RESET_PATH_SEGMENT) return <ResetPage />;
  if (segment === TEST_PATH_SEGMENT) return <TestTimerPage />;
  const timer = findTimer(segment);
  return timer ? <TimerPage timer={timer} /> : <UnknownTimerPage />;
}
