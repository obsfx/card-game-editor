import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Output: React.FC = () => {
  const { output } = useAppContext();
  return (
    <pre>
      <code>{JSON.stringify(output, null, 2)}</code>
    </pre>
  );
};

export default Output;
