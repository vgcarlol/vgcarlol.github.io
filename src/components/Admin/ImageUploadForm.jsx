import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    onUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionarla</p>
      </div>
      {file && (
        <div>
          <h4>Imagen seleccionada:</h4>
          <img src={URL.createObjectURL(file)} alt="Selected" style={imageStyle} />
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '200px',
  marginTop: '20px'
};

export default ImageUploadForm;
