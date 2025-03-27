import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState('');

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Create a temporary preview URL for the selected file
    setPreviewUrl(URL.createObjectURL(file));
    // Clear previous result if any
    setResult('');
  };

  const onUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error processing image.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Face Image Authenticity Checker</h1>
      <div className="upload-section">
        <label for="file-upload" class="custom-file-upload">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        
        <button onClick={onUpload} className="upload-button">
          Upload and Check
        </button>
      </div>
      {previewUrl && (
        <div className="preview-container">
          {result && <h2 className="result-label">{result}</h2>}
          <img src={previewUrl} alt="Uploaded Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default App;
