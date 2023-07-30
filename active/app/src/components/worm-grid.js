import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';


import styles from './worm-grid.module.css';

function WormGrid(props) {
    const gridRef = useRef();

    // states   
    const [orderCounts, setOrderCounts] = useState({});
    const [data, updateData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(false);

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

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight
        ) {
            setPage((prevPage) => prevPage + 1)
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // useEffect
    useEffect(() => {
        setLoading(true);
        gridRef.current.getBoundingClientRect();
        const fetchAPI = async (page) => {
            const route = `http://localhost:8080/worms?${props.query}&page=${page}&limit=${limit}`;
            console.log("FETCH params", props.query);
            let response = await fetch(route)
            response = await response.json()
            let data_ = [...data, ...response];
            await updateData((prevData) => [...prevData, ...response]);
            await calcNumResultsPerOrder(data_);
            setLoading(false)
            if(response.length > 0){
                window.addEventListener("scroll", handleScroll);
            }
            // console.log(orderCounts)
            // setNumResults(data.length);
        };
        fetchAPI(page);
    },[props.query, page]);    
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    },[])

    return (
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
                {
                    loading && (
                        (() => {
                          const gridCards = [];
                          for (let i = 0; i < 10; i++) {
                            gridCards.push(<GridCard loading={true} gridBox={gridRef} />);
                          }
                          return gridCards;
                        })()
                      )
                }                       
            </div>
        </div>
        // )
    );
}

export default WormGrid;