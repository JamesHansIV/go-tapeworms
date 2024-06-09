import React, {useState, useEffect} from 'react';
import './App.css'

// router
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

// components
import Header from './components/header.js';
import WormGrid from './components/worm-grid.js';
import MasonryGrid from './components/masonry-grid.js';
import Filter from './components/filter.js';
import Footer from './components/footer.js'

// styles
import './components/root.module.css';


function App() {
  const [params, setParams] = useState("");

  // useEffect (()=> {
  //   console.log("App params:\t",params);
  // });

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Header/>

      <Router>
        <Routes>
          <Route 
            path="/home" 
            element={
              <>
                <img src={"Scolex banner.png"}/>
                {/* Should add text, short paragraph to describe use of the site */}
              </>
            }
          />
          <Route 
            path="/key"
            element={
              <>
                <div style = {{backgroundColor: "white", height: 25}}/>
                <div class = "home">
                  <Filter setFilters={setParams}/>
                  <MasonryGrid query={params}/>
                </div>
                <div style={{ backgroundColor: "white", height: 100}}/>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <h1 style={{textAlign:"center", paddingTop:250, paddingBottom:250}}>Whoops! Current page is under construction!</h1>
              </>
            }
          />
          <Route
            path="/elasmobranch-tapeworm-orders"
            element={
              <>
                <h1 style={{textAlign:"center", paddingTop:250, paddingBottom:250}}>Whoops! Current page is under construction!</h1>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <h1 style={{textAlign:"center", paddingTop:250, paddingBottom:250}}>Whoops! Current page is under construction!</h1>
              </>
            }
          />
        </Routes>
      </Router>
      {/* </BrowserRouter> */}
      <Footer/>
    </div>
  );
}

export default App;
