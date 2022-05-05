import React, {useState, useEffect} from 'react';
import '../App.css';

function WormGrid() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [worms, setWorms] = useState([]);

    useEffect(() => {
        fetchWorms();
    }, [])

    const fetchWorms = async () => {
        await fetch('/order-list')
            .then(response=>response.json())
            .then(data=> {
                setIsLoaded(true);
                setWorms(data);
            }, (err) => {
                console.log("worm loading error: ",err);
                setIsLoaded(true);
                setError(err)
            },
        )
    }
    

    return (
        <div className='worm-grid' >
            {
                worms.map((worm) => (
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
        </div>
    );
}

export default WormGrid;