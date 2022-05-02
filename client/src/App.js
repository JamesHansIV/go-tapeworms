import React from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  //states
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data ? "loading data..." : data}
        </p>
      </header>
    </div>
  );
}

export default App;
