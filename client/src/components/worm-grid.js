import React, {useState, useEffect} from 'react';
import {filterLength} from '../filters.js';
import '../App.css';

function WormGrid() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [worms, setWorms] = useState([]);
    const [active, setActive] = useState([]);

    useEffect(() => {
        fetchWorms();
        
    }, [])

    const fetchWorms = async () => {
        await fetch('/order-list')
            .then(response=>response.json())
            .then(data=> {
                    console.log('worms set');
                    setIsLoaded(true);
                    setWorms(data);
                    setActive(data);
                    console.log('fetch',worms);
                }, (err) => {
                    console.log("worm loading error: ",err);
                    setIsLoaded(true);
                    setError(err)
                }
            )
    }

    const setSessionStorage = () => {
        sessionStorage.setItem('worms',JSON.stringify(worms));
       // applyFilters();
    }

    const applyFilters = () => {
        console.log("filters called");
        let results = [];

        let filters = JSON.parse(sessionStorage.getItem('filters'));
        console.log(filters.scolexFt);
        switch(filters.scolexFt) {
            case 'bothria':
                results = worms.filter(worm => worm.num_bothria != null);
                console.log('results',results);
                setActive(results);
                break;      
        }

        
    }
    

    return (
        <div className='worm-grid'>
            
            {
                worms.filter(test => test.num_bothria != null).map((worm) => (
                    <div key={worm.id}>
                        <p>{"./src/img/" + worm.img_src}</p>
                        <div>
                            {worm.name}<br/>
                            <img url={"./src/img/" + worm.img_src}/>

                        </div>
                        {/*<img src={'/img/'+ worm.img_src}></img> */}
                    </div>
                ))
            }
            <p>Worms {worms.length}     Active {active.length}</p>
            <script {...setSessionStorage()}/>
        </div>
        
    );
}

export default WormGrid;