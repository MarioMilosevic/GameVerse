export function useThrottle(fn: () => void, delay = 200) {
  let lastCall = 0;
  return () => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn();
  };
}
