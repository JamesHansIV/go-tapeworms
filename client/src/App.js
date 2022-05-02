import React, {useState} from 'react';
import fetchList from './requests.js';
import Worm from './worm.js';
import WormGrid from './worm-grid.js';
import './App.css';


function App() {
  //states
  const [activeWorms, setActiveWorms] = useState([]);

  
  //on page load
  React.useEffect(() => {
    //get all worms from db and add them to the array of active worm

    //setActiveWorms((activeWorms) => activeWorms.concat(JSON.stringify(fetchList())));
    console.log(JSON.stringify(fetchList()));
    //fetchList();
  }, []);

  console.log('worms 0',activeWorms[0]);

  return (
    <div className="Go-Tapeworms-client">
      <header className="App-header">
        <h2>GO TAPEWORMS</h2>
        <p>
          {!activeWorms ? "getting worm data..." : "worms: " + activeWorms[0]}
        </p>
        <Worm></Worm>
        <WormGrid></WormGrid>
      </header>
    </div>
  );
}

export default App;
