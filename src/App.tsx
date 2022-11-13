import React from 'react';
import { css } from '@emotion/css';
import FileInputs from './components/FileInputs';
import SelectedCardPreview from './components/SelectedCardPreview';
import CardSelection from './components/CardSelection';
import { AppContextProvider } from './contexts/AppContext';
import BoardPreview from './components/BoardPreview';
import Output from './components/Output';
import ScreenSize from './components/ScreenSize';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <div className={app}>
        <ScreenSize />
        <div className={bodyWrapper}>
          <BoardPreview />
          <div className={rightWrapper}>
            <div className={cardPreviewWrapper}>
              <SelectedCardPreview />
              <CardSelection />
            </div>
            <FileInputs />
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
  margin: 14,
});

const bodyWrapper = css({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 10,
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
  marginLeft: 10,
  width: 450,
});

export default App;
