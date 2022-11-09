import React from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';

const Output: React.FC = () => {
  const { output } = useAppContext();
  return (
    <div className={outputWrapper}>
      <pre>
        <code>{JSON.stringify(output, null, 2)}</code>
      </pre>
    </div>
  );
};
const outputWrapper = css({
  border: '1px solid #ddd',
  width: 420,
  margin: 10,
  padding: 5,
  height: 740,
  overflow: 'auto',
  borderRadius: 8,
});

export default Output;
