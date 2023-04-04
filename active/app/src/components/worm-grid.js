import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';

import styles from './worm-grid.module.css';

function WormGrid(props) {
    const gridRef = useRef();

    // states
    const [numResults, setNumResults] = useState('...');
    const [order, ] = useState("lecanicephalidea");
    const [data, updateData] = useState([]);
    // const [loading, updateLoading] = useState(true);

    // color map
    const colorMap = {
        'Anthobothriidea' : '#5c1a1b',
        'Balanobothriidea' : '#ef233c',
        'Calliobothriidea' : '#a4243b',
        'Cathetocephalidea' : '#d8973c',
        'Caulobothriidea' : '#F8782E',
        'CladeIII' : '#404e5c',
        'CladeIV' : '#f0a7a0',
        'Diphyllidea' : '#dd9ac2',
        'Gastrolecithiidea' : '#af7595',
        'Gyrocotylidea' : '#533b4d',
        'Lecanicephalidea' : '#f3b803',
        'Litobothriidea' : '#8db580',
        'OnchoproteocephalideaII' : '#06bcc1',
        'Phyllobothriidea' : '#404e5c',
        'Rhinebothriidea' : '#4f6272',
        'Serendipeidea' : '#7c91b0',
        'Zyxibothriidea' : '#404e5c'
    };

    // useeffect
    useEffect(() => {
        gridRef.current.getBoundingClientRect();

        const fetchAPI = async () => {
            const route = `http://localhost:8080/worms?${props.query}`;
            console.log("FETCH params", props.query);
            let response = await fetch(route)
                response = await response.json()
                let data = response;
                updateData(data);
                setNumResults(data.length);
        };

        fetchAPI();
    },[props.query]);

    return (
        // loading == true ? (
        //     <div className={styles.container}>
        //     <div className={styles.results}>
        //         <h4 className={styles.results}>
        //             <span>[{numResults}] genera of {order}ns</span>
        //         </h4>
        //     </div>
        //     <div className={styles.grid}>
        //             {
        //                 Array(25).fill(0).map( () => {
        //                     <GridCard loading={true}/>
        //                 })
        //             }
        //         {/* <GridCard genus="Seussepex"/> */}
        //     </div>
        // </div>
        // ) : (
        <div className={styles.container} ref={gridRef}>
            <div className={styles.results}>
                <h4 className={styles.results}>
                    <span>[{numResults}] genera of {order}ns</span>
                </h4>
            </div>
            <div className={styles.grid}>
                {
                    data.map( (x) => (
                        <GridCard 
                            genus={()=>{ return x.genus.charAt(0).toUpperCase() + x.genus.slice(1); }}
                            gridBox = {gridRef}
                            key = {`${x.genus}_card`}
                            img = {`./${x.genus}_main.jpg`}
                            color = {colorMap[x.order]}
                        />
                    ))
                }
            </div>
        </div>
        // )
    );
}

export default WormGrid;