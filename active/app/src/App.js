import logo from './logo.svg';

// components
import Header from './components/header.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{
        backgroundColor: "red",
        height: 1000
      }}
      />
    </div>
  );
}

export default App;
