import { useCallback, useEffect } from 'react';

export const useClickOutListener = (
  containerRef: React.MutableRefObject<any>,
  onClick: (target: HTMLElement) => void
) => {
  const handleOutClick = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      if (!containerRef || !containerRef.current || containerRef.current.contains(target)) {
        return;
      }

      onClick(target);
    },
    [containerRef, onClick]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleOutClick, false);
    return () => {
      document.body.removeEventListener('click', handleOutClick, false);
    };
  }, [handleOutClick]);
};
