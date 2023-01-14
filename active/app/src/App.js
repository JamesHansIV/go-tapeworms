import logo from './logo.svg';

// components
import Header from './components/header.js';
import WormGrid from './components/worm-grid';

import img from './images/Seussapex_KA206Asc2nd.jpg';


function App() {

  return (
    <div className="App">
      <Header/>
      <div style={{
        backgroundColor: "white",
        height: 200
      }} /> 

      <div>
        <WormGrid/>
        {/* <img src={img} alt="import failed"/> */}
      </div>
    </div>
  );
}

export default App;
