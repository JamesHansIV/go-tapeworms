import React,{useState} from 'react';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';

//Components
import NavBar from './components/nav-bar';

//Pages
import Home from './pages/home';
import About from './pages/about';
import Key from './pages/key'
// import FurtherLearning from './pages/further-learning'
import PageNotFound from './pages/page-not-found';

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
      </header>
    
      <div className='site-body'>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/key" element={<Key/>}/>
            {/* <Route path="/further_learning" element={FurtherLearning}/> */}
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </div>
      
           

      {/* <div id='app-body' className='site-body'>
        <FilterBox/>
        <WormGrid id='grid'/>
      </div> */}
    </div>
  );
}

export default App;
