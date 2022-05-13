import React,{useState} from 'react';
//import fetchList from './requests.js';
import WormGrid from './components/worm-grid.js';
import FilterBox from './components/filter-box.js';
import './App.css';


function App() {
  //states
  const [count, setCount] = useState(0);
  
  //on page load
  React.useEffect(() => {
    //get all worms from db and add them to the array of active worm
    console.log("app render " + count);
    //setActiveWorms((activeWorms) => activeWorms.concat(JSON.stringify(fetchList())));
    //fetchList();
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  }

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
      <button onClick={handleClick}>Counter: {count}</button>
    </div>
  );
}

export default App;
