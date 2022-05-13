import React from 'react';
//import fetchList from './requests.js';
import WormGrid from './components/worm-grid.js';
import FilterBox from './components/filter-box.js';
import './App.css';


function App() {
  //states

  
  //on page load
  React.useEffect(() => {
    //get all worms from db and add them to the array of active worm

    //setActiveWorms((activeWorms) => activeWorms.concat(JSON.stringify(fetchList())));
    //fetchList();
  }, []);


  return (
    <div className="Go-Tapeworms-client">
      <header className="App-header">
        <h2>GO TAPEWORMS</h2>
        {/* <p>
          {!activeWorms ? "getting worm data..." : "worms: " + activeWorms[0]}
        </p> */}
        
      </header>
      <WormGrid id='grid'></WormGrid>
      <FilterBox/>
    </div>
  );
}

export default App;
