import { useEffect, useState } from 'react';

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          setIsLocked(true);
          wakeLock.addEventListener('release', () => {
            setIsLocked(false);
          });
        } catch (err) {
          console.warn('Wake Lock request failed:', err);
          setIsLocked(false);
        }
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  return isLocked;
}
