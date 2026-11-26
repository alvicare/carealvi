/** Prevent forward page scrolling while a scroll-triggered sequence plays. */
export function lockForwardScroll(onReverse: () => void): () => void {
  let previousTouchY: number | null = null;
  let released = false;

  const release = () => {
    if (released) return;
    released = true;
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("keydown", onKeyDown);
  };

  const cancelForReverse = () => {
    release();
    onReverse();
  };

  const onWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) event.preventDefault();
    else if (event.deltaY < 0) cancelForReverse();
  };
  const onTouchStart = (event: TouchEvent) => {
    previousTouchY = event.touches[0]?.clientY ?? null;
  };
  const onTouchMove = (event: TouchEvent) => {
    const currentY = event.touches[0]?.clientY;
    if (currentY === undefined || previousTouchY === null) return;
    if (currentY < previousTouchY) event.preventDefault();
    else if (currentY > previousTouchY) cancelForReverse();
    previousTouchY = currentY;
  };
  const onTouchEnd = () => {
    previousTouchY = null;
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
      event.preventDefault();
    } else if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
      cancelForReverse();
    }
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  return release;
}

/** Snap to a pin boundary without inheriting the page's smooth-scroll styling. */
export function jumpToScrollPosition(top: number): void {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  root.style.scrollBehavior = previousBehavior;
}
