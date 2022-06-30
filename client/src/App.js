import React,{useState} from 'react';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';

//Components
import WormGrid from './components/worm-grid';
import FilterBox from './components/filter-box';
import NavBar from './components/nav-bar';

//Pages
import Home from './pages/home';
import About from './pages/about';
// import About from './pages/about'
// import Key from './pages/key'
// import FurtherLearning from './pages/further-learning'

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
    

      
        <NavBar/>
        {/* <Routes>
            <Route exact path='/' component={<Home/>} />
            <Route path='/about' component={<About/>} />
            
        </Routes> */}
      

      <div id='app-body' className='site-body'>
        <FilterBox/>
        <WormGrid id='grid'></WormGrid>
      </div>
      
      <button onClick={handleClick}>Counter: {count}</button>
    </div>
  );
}

export default App;
