import { useEffect } from 'react';

/**
 * Scroll to the hash target after the first render.
 *
 * The page is client-rendered, so when the browser processes the hash on
 * a cold load, #root is still empty and the target element does not
 * exist yet. The browser does not retry once React mounts, so a shared
 * deep link such as /#problem-integration silently lands at the top.
 *
 * Runs once, after paint. `scrollIntoView` honours the scroll-padding-top
 * that keeps the target clear of the sticky header.
 */
export default function useHashLanding() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // On a reload the browser restores the previous scroll position,
    // which then races and usually beats the landing below. When a hash
    // is present it is the more specific instruction, so it wins.
    const previousRestoration = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    // 'instant', not 'auto'. Per spec 'auto' defers to the computed
    // scroll-behavior, which is smooth here — so 'auto' would start an
    // 18,000px animation instead of landing. A deep link should arrive,
    // not travel.
    //
    // Two frames: one for React to commit, one for the fonts-adjusted
    // layout to settle, so we do not scroll to a position that then moves.
    let inner;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: 'instant', block: 'start' }),
      );
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
      if ('scrollRestoration' in history) history.scrollRestoration = previousRestoration;
    };
  }, []);
}
