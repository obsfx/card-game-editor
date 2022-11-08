import React from 'react';
import { css } from '@emotion/css';
import FileInputs from './components/FileInputs';
import SelectedCardPreview from './components/SelectedCardPreview';
import CardSelection from './components/CardSelection';
import { AppContextProvider } from './contexts/AppContext';
import BoardPreview from './components/BoardPreview';
import Output from './components/Output';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <div className={app}>
        <FileInputs />

        <div className={bodyWrapper}>
          <BoardPreview />
          <div>
            <div className={cardPreviewWrapper}>
              <SelectedCardPreview />
              <CardSelection />
            </div>
            <div className={outputWrapper}>
              <Output />
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
};

const app = css({
  fontFamily: 'sans-serif',
  fontSize: 12,
});

const bodyWrapper = css({
  display: 'flex',
  alignItems: 'flex-start',
  margin: 10,
});

const cardPreviewWrapper = css({
  display: 'flex',
  alignItems: 'center',
  margin: 5,
});

const outputWrapper = css({
  border: '1px solid #f2f2f2',
  width: 400,
  margin: 10,
  padding: 5,
  maxHeight: 600,
  overflow: 'auto',
});

export default App;
