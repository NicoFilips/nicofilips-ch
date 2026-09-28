import CsgoPage from './csgo/CsgoPage';
import { matchTimerRoute } from './timer/TimerRouter';

const CSGO_ROUTE = /^\/csgo\/?$/i;

/**
 * Tiny path-based router. Returns the page for a non-homepage route,
 * or null when the normal landing page should render.
 */
export function matchRoute(pathname: string): JSX.Element | null {
  if (CSGO_ROUTE.test(pathname)) return <CsgoPage />;
  return matchTimerRoute(pathname);
}
