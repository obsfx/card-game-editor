import { useCallback, useEffect } from 'react';

export const useClickOutListener = (
  containerRef: React.MutableRefObject<any>,
  onClick: () => void,
  excludedTargetsDataIDs: string[] = []
) => {
  const handleOutClick = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      if (!containerRef || !containerRef.current || containerRef.current.contains(target)) {
        return;
      }

      if (target.dataset.clickoutId && excludedTargetsDataIDs.includes(target.dataset.clickoutId)) {
        return;
      }

      onClick();
    },
    [containerRef, onClick, excludedTargetsDataIDs]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleOutClick, false);
    return () => {
      document.body.removeEventListener('click', handleOutClick, false);
    };
  }, [handleOutClick]);
};
