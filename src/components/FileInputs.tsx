import React, { ChangeEvent } from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { AtlasData } from '../types';
import { getJSON, getImage } from '../utils';

const FileInputs: React.FC = () => {
  const { setJson, setImageB64 } = useAppContext();

  const handleOnFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const name = event.target.name;

    if (name === 'json') {
      const json = await getJSON(event.target.files[0]);
      setJson(json as AtlasData);
      return;
    }

    if (name === 'image') {
      const imageBase64 = await getImage(event.target.files[0]);
      setImageB64(imageBase64 as string);
      return;
    }
  };

  return (
    <div className={inputWrapper}>
      <div className={row}>
        <label htmlFor="spritesheet-img">Spritesheet Image: </label>
        <input id="spritesheet-img" type="file" name="image" onChange={handleOnFileChange} />
      </div>

      <div className={row}>
        <label htmlFor="spritesheet-img">Spritesheet JSON: </label>
        <input id="spritesheet-json" name="json" type="file" onChange={handleOnFileChange} />
      </div>
    </div>
  );
};

const inputWrapper = css({
  display: 'flex',
});

const row = css({
  padding: 5,
});

export default FileInputs;
