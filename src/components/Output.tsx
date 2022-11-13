import React, { useRef, useState } from 'react';
import { css } from '@emotion/css';
import { HiClipboardCopy } from 'react-icons/hi';
import { useAppContext } from '../contexts/AppContext';

const Output: React.FC = () => {
  const { output } = useAppContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  let messageTimeout: any = undefined;
  const showCopyMessage = () => {
    setShowMessage(true);
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      showCopyMessage();
      return;
    }

    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.top = '0';
    textAreaRef.current.style.left = '0';
    textAreaRef.current.style.position = 'fixed';
    textAreaRef.current.focus();
    textAreaRef.current.select();

    try {
      document.execCommand('copy');
      showCopyMessage();
    } catch (err) {
      console.error('unable to copy', err);
    }
  };

  return (
    <div className={outputWrapper}>
      <textarea ref={textAreaRef} className={textbox} value={JSON.stringify(output, null, 2)} />
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

const textbox = css({
  display: 'none',
});

export default Output;
