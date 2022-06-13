import React, {useState, useEffect} from 'react';
import * as filtering from '../filters.js';
import '../App.css';

function WormGrid() {
    //const [isLoaded, setIsLoaded] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [worms, setWorms] = useState([]);
    const [filteredWorms, setFilteredWorms] = useState([]);
    const applyFilterBtn = document.getElementById('apply-btn');
    const resetBtn = document.getElementById('reset-btn');
    //const [active, setActive] = useState([]);


    const fetchWorms = async () => {
        await fetch('/order-list')
            .then(response=>response.json())
            .then(data=> {
                    console.log('worms set');
                    // setIsLoaded(true);
                    setWorms(data);
                    setFilteredWorms(data);
                }, (err) => {
                    console.log("worm loading error: ",err);
                    //setIsLoaded(true);
                }
            )
    }

    //USE EFFECT
    useEffect(() => {
        //fetchWorms();
        if(firstRender) {
            console.log("first render");
            fetchWorms(); //get list of all worms & set filtered worms
            setFirstRender(false); //set first render false
        } else {
            console.log("2nd+ render");
            console.log("worms",worms);
            console.log("filteredList",filteredWorms);
            applyFilterBtn.addEventListener('click',applyFilters);
            resetBtn.addEventListener('click',resetFilters);
        }

    }, [filteredWorms])

    

    const setSessionStorage = () => {
        sessionStorage.setItem('worms',JSON.stringify(worms));
        applyFilters();
    }

    const resetFilters = () => {
        setFilteredWorms(worms);
    }

    const applyFilters = async () => {
        console.log("filters called");

        //get filters from session storage
        let filters = sessionStorage.getItem('filters');

        //fetch list of filtered worms from mysql database
        await fetch('/filter-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: filters
        })
        .then(response=>response.json())
        .then(data=>setFilteredWorms(data))
    }
    

    return (
        <div className='worm-grid'>
            
            {
                // worms.filter(test => test.num_bothria != null).map((worm)
                filteredWorms.map((worm) => (
                    <div key={worm.id}>
                        <p>{"./src/img/" + worm.img_src}</p>
                        <div>
                            {worm.name}<br/>
                            {/* <img url={"./src/img/" + worm.img_src}/> */}

                        </div>
                        {/*<img src={'/img/'+ worm.img_src}></img> */}
                    </div>
                ))
            }
            <p>Total Worms {worms.length} in Database<br/>Displaying {filteredWorms.length} worms</p>
            {/* <script {...setSessionStorage()}/> */}
        </div>
        
    );
}

export default WormGrid;