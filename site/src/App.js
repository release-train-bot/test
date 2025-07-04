import React from 'react';

function App() {
  const releaseUrl = process.env.GITHUB_RELEASE_URL || 'No release URL available';
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Release</h1>
        <p>
          Latest release is available at: 
          <a 
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {releaseUrl}
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;