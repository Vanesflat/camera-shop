import { useCallback, useEffect, useState } from 'react';

interface UseKeyPressOptions {
  targetKey: KeyboardEvent['key'];
}

export default function useKeyPress({ targetKey }: UseKeyPressOptions): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const handleDownPress = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey],
  );

  const handleUpPress = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleDownPress);
    window.addEventListener('keyup', handleUpPress);

    return () => {
      window.removeEventListener('keydown', handleDownPress);
      window.removeEventListener('keyup', handleUpPress);
    };
  }, [handleDownPress, handleUpPress]);

  return keyPressed;
}
