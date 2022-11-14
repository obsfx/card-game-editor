import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { minimalInput } from '../sharedStyles';

const ScreenSizeSelection: React.FC = () => {
  const { selectedScreenSize } = useAppContext();

  return (
    <div className={wrapper}>
      <span>Dimensions: </span>
      <div className={sizeWrapper}>
        <span>{selectedScreenSize.label}</span>
        <input
          type="number"
          className={minimalInput}
          readOnly={true}
          value={selectedScreenSize.width}
        />
        <span>X</span>
        <input
          type="number"
          className={minimalInput}
          readOnly={true}
          value={selectedScreenSize.height}
        />
      </div>
    </div>
  );
};

const wrapper = css({
  display: 'flex',
  alignItems: 'center',
  margin: '4px 0',
});

const sizeWrapper = css({
  marginLeft: 4,
  padding: '4px 6px',
  backgroundColor: '#f5f4f4',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',

  '& span': {
    margin: '0 4px',
    fontFamily: 'monospace',
  },
});

export default ScreenSizeSelection;
