import { useCallback, useEffect } from 'react';

export const useClickOutListener = (
  containerRef: React.MutableRefObject<any>,
  onClose: () => void
) => {
  const handleOutClick = useCallback(
    (e: any) => {
      if (containerRef && containerRef.current) {
        if (containerRef.current.contains(e.target)) {
          return;
        }

        if (onClose) {
          onClose();
        }
      }
    },
    [containerRef, onClose]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleOutClick, false);
    return () => {
      document.body.removeEventListener('click', handleOutClick, false);
    };
  }, [handleOutClick]);
};
