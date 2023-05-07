import React, {useState, useEffect} from 'react';
import './App.css'

// components
import Header from './components/header.js';
import WormGrid from './components/worm-grid.js';
import Filter from './components/filter.js';

// styles
import './components/root.module.css';


function App() {
  const [params, setParams] = useState("");

  useEffect (()=> {
    console.log("App params:\t",params);
  });

  return (
    <div className="App">
      <Header/>
      <div style = {{
        backgroundColor: "white",
        height: 25
      }}/>
      <div class = "home">
        <Filter setFilters={setParams}/>
        <WormGrid query={params}/>
      </div>

      {/* footer placeholder */}
      <div style={{
        backgroundColor: "white",
        height: 100
      }}/>
      <div style={{
        backgroundColor: '#69ACBB',
        height: 100
      }}/>
    </div>
  );
}

export default App;
