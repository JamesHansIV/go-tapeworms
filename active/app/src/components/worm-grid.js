import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';

import styles from './worm-grid.module.css';

function WormGrid(props) {
    const gridRef = useRef();

    // states   
    const [orderCounts, setOrderCounts] = useState({});
    const [data, updateData] = useState([]);
    // const [loading, updateLoading] = useState(true);

    // color map
    const colorMap = {
        'Anthobothriidea' : '#5c1a1b',
        'Balanobothriidea' : '#ef233c',
        'Calliobothriidea' : '#a4243b',
        'Cathetocephalidea' : '#d8973c',
        'Caulobothriidea' : '#F8782E',
        'Clade III' : '#404e5c',
        'Clade IV' : '#f0a7a0',
        'Diphyllidea' : '#dd9ac2',
        'Gastrolecithiidea' : '#af7595',
        'Gyrocotylidea' : '#533b4d',
        'Lecanicephalidea' : '#f3b803',
        'Litobothriidea' : '#8db580',
        'Onchoproteocephalidea II' : '#06bcc1',
        'Phyllobothriidea' : '#404e5c',
        'Rhinebothriidea' : '#4f6272',
        'Serendipeidea' : '#7c91b0',
        'Zyxibothriidea' : '#404e5c'
    };

    const calcNumResultsPerOrder = (_data) => {
        let counts = {};

        _data.map((x)=> {
            if (x.order in counts)
                counts[x.order] ++;
            else
                counts[x.order] = 1;
        });

        setOrderCounts(counts);  
    };

    // useeffect
    useEffect(() => {
        gridRef.current.getBoundingClientRect();

        const fetchAPI = async () => {
            const route = `http://localhost:8080/worms?${props.query}`;
            console.log("FETCH params", props.query);
            let response = await fetch(route)
            response = await response.json()
            let _data = response;
            await updateData(_data);
            await calcNumResultsPerOrder(_data);
            console.log(orderCounts)
            // setNumResults(data.length);
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
            <div className={styles.orderCountContainer}>
                {
                    Object.entries(orderCounts).map(([order, count])=> (
                        // <span className={styles.textResults}>  [{count}] {order}</span> 
                        <span className={styles.pillBody} style={{backgroundColor:colorMap[order]}}>{order}
                            <div className={styles.pillCount}>{count}</div>
                        </span> 
                    ))
                }
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