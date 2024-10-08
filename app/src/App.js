import React, {useState, useEffect} from 'react';
import './App.css'

// router
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';

// components
import Header from './components/header.js';
import WormGrid from './components/worm-grid.js';
import MasonryGrid from './components/masonry-grid.js';
import Filter from './components/filter.js';
// import Filter from './components/filter_old.js';
import Footer from './components/footer.js';
import UnderConstructionPage from './components/under-construction.js';

// styles
import './components/root.module.css';

// broswer
import getBrowserType from './getBrowserType.js';

function App() {
  const [params, setParams] = useState("");
  const [browser, ] = useState(getBrowserType());

  useEffect(()=>{
    // console.log("BROWSER", browser);
    if (browser !== "Chrome" && browser !== "Firefox") {
      alert(`WARNING!\n\nIt looks like you are using an unsupported browser!\n\nTapeworms Unlocked works best on Firefox or Chrome. Use of other browsers may result in UI bugs. \n\nHappy learning!`);
    }
  }, []);

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Header/>
      
      {/* Uncomment me when disabling routing */}
      {/* <>
        <div style = {{backgroundColor: "white", height: 25}}/>
        <div class = "home">
          <Filter setFilters={setParams} browser={browser}/>
          <MasonryGrid query={params}/>
        </div>
        <div style={{ backgroundColor: "white", height: 100}}/>
      </> */}

      {/* Comment me out when disabling routing */}
      <Router>
        <Routes>
          <Route 
            path="*"
            element={
              <>
                <h1 style={{textAlign:"center", paddingTop:250, paddingBottom:250}}>Page Not Found!</h1>
              </>
            }
          />
          <Route 
            path="/"
            // loader={()=>{return redirect("/home")}}
            element={<><img src={"Scolex banner.png"}/></>}
          />
          <Route 
            path="/home"
            element={<Navigate to="/"/>}
            >
            
          </Route> 
          <Route 
            path="/key"
            element={
              <>
                <div style = {{backgroundColor: "white", height: 25}}/>
                <div className = "home">
                  <Filter setFilters={setParams} browser={browser}/>
                  <MasonryGrid query={params}/>
                </div>
                <div style={{ backgroundColor: "white", height: 100}}/>
              </>
            }
          />
          <Route
            path="/about"
            element={ <UnderConstructionPage/> }
          />
          <Route
            path="/elasmobranch-tapeworm-orders"
            element={ <UnderConstructionPage/> }
          />
          <Route
            path="/contact"
            element={ <UnderConstructionPage/> }
          />
          <Route
            path="/docs"
            element={ <UnderConstructionPage/> }
          />
        </Routes>
      </Router>
      {/* </BrowserRouter> */}
      <Footer/>
    </div>
  );
}

export default App;
