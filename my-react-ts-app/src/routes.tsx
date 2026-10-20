import CsgoPage from './csgo/CsgoPage';
import RegeltestPage from './regeltest/RegeltestPage';
import { matchTimerRoute } from './timer/TimerRouter';

const CSGO_ROUTE = /^\/csgo\/?$/i;
const REGELTEST_ROUTE = /^\/regeltest\/?$/i;

/**
 * Tiny path-based router. Returns the page for a non-homepage route,
 * or null when the normal landing page should render.
 */
export function matchRoute(pathname: string): JSX.Element | null {
  if (CSGO_ROUTE.test(pathname)) return <CsgoPage />;
  if (REGELTEST_ROUTE.test(pathname)) return <RegeltestPage />;
  return matchTimerRoute(pathname);
}
