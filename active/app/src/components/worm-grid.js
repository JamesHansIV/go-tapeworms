import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';

import styles from './worm-grid.module.css';

function WormGrid(props) {
    // states
    const [numResults, setNumResults] = useState('...');
    const [order, setOrder] = useState("lecanicephalidea");
    const [data, updateData] = useState([]);
    const [loading, updateLoading] = useState(true);

    // useeffect
    useEffect(() => {
        // fetch data from api
        fetchAPI();
    },[props.query]);

    const fetchAPI = async () => {
        const route = `http://localhost:8080/worms?${props.query}`;
        console.log("FETCH params", props.query);
        await fetch(route)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                updateData(data);
                setNumResults(data.length);
                updateLoading(false);
            });
    };

    return (
        loading == true ? (
            <div className={styles.container}>
            <div className={styles.results}>
                <h4 className={styles.results}>
                    <span>[{numResults}] genera of {order}ns</span>
                </h4>
            </div>
            <div className={styles.grid}>
                    {
                        Array(25).fill(0).map( () => {
                            <GridCard loading={true}/>
                        })
                    }
                {/* <GridCard genus="Seussepex"/> */}
            </div>
        </div>
        ) : (
        <div className={styles.container}>
            <div className={styles.results}>
                <h4 className={styles.results}>
                    <span>[{numResults}] genera of {order}ns</span>
                </h4>
            </div>
            <div className={styles.grid}>
                {
                    data.map( (x) => (
                        <GridCard 
                            genus={()=>{ return x.name.charAt(0).toUpperCase() + x.name.slice(1); }}
                            key = {`${x.name}_card`}
                            img = {`./${x.name}_main.jpg`}
                        />
                    ))
                }
                {/* <GridCard genus="Seussepex"/> */}
            </div>
        </div>
        )
    );
}

export default WormGrid;