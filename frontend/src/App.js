import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  const handleConnectDropbox = async () => {
    try {
      // Redirect to backend server to initiate OAuth flow with Dropbox
      window.location.href = 'http://localhost:5000/auth/dropbox';
    } catch (error) {
      console.error('Error connecting to Dropbox: ', error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Dropbox Files</h1>
      <button className="connect-btn" onClick={handleConnectDropbox}>Connect to Dropbox</button>
      <div className="file-list">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-info">
                <strong>{file.name}</strong>
              </div>
              <div className="file-metadata">
                <p>Size: {file.size} bytes</p>
                <p>Modified: {file.client_modified}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-files-msg">No files found.</div>
        )}
      </div>
    </div>
  );
}

export default App;
