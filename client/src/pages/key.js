//imports
import FilterBox from "../components/filter-box";
import WormGrid from "../components/worm-grid";

import "../App.css";

//This is the component for the visual key
const Key = () => {
    return (
        <div className="key-container">
            <FilterBox/>
            <WormGrid id='grid'/>
        </div>
    );
}


export default Key;