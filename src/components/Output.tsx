import React, { useState } from 'react';
import { css } from '@emotion/css';
import { HiClipboardCopy } from 'react-icons/hi';
import { useAppContext } from '../contexts/AppContext';

const Output: React.FC = () => {
  const { output } = useAppContext();

  const [showMessage, setShowMessage] = useState(false);

  let messageTimeout: any = undefined;
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setShowMessage(true);
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className={outputWrapper}>
      <button className={copyToClipboardButton} onClick={handleCopyToClipboard}>
        <HiClipboardCopy />
        <span>Copy to clipboard</span>
      </button>
      {showMessage && <div className={message}>Copied !</div>}
      <pre>
        <code>{JSON.stringify(output, null, 2)}</code>
      </pre>
    </div>
  );
};
const outputWrapper = css({
  border: '1px solid #ddd',
  width: '100%',
  padding: 5,
  maxHeight: 670,
  overflow: 'auto',
  borderRadius: 8,
  boxSizing: 'border-box',
  marginTop: 10,
  position: 'relative',
});

const copyToClipboardButton = css({
  border: '1px solid #ddd',
  fontSize: 12,
  display: 'inline-flex',
  alignItems: 'center',
  padding: 5,
  borderRadius: 5,
  backgroundColor: '#f3f3f3',
  position: 'absolute',
  right: 5,
  top: 5,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#eee',
  },
  '& svg': {
    width: 14,
    height: 14,
    marginRight: 4,
  },
});

const message = css({
  color: 'green',
  fontWeight: 'bold',
});

export default Output;
