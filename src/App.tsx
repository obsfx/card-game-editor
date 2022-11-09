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
          <div className={rightWrapper}>
            <div className={cardPreviewWrapper}>
              <SelectedCardPreview />
              <CardSelection />
            </div>
            <Output />
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
  height: 126,
});

const rightWrapper = css({
  display: 'flex',
  flexDirection: 'column',
});

export default App;
