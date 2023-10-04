import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';

import styles from './masonry-grid.module.css';

function MasonryGrid(props) {
    const gridRef = useRef();

    // states   
    const [orderCounts, setOrderCounts] = useState({});
    const [data, updateData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [loading, setLoading] = useState(false);

    // infinite scroll
    async function fetchMoreData() {
        // const route = `http://localhost:8080/worms?${props.query}&page=${page}&limit=${limit}`;
        const route = `https://api.tapeworms-unlocked.info/worms?${props.query}&page=${page}&limit=${limit}`;
        console.log("FETCH MORE DATA params", props.query);
        let response = await fetch(route)
        response = await response.json()
        let data_ = [...data, ...response];
        await updateData((prevData) => [...prevData, ...response]);
        // await calcNumResultsPerOrder(data_);
        setLoading(false)
        if(response.length > 0){
            window.addEventListener("scroll", handleScroll);
        }
    }

    // new filter fetch 
    async function fetchWithNewFilter() {
        // normal query
        const route = `https://api.tapeworms-unlocked.info/worms?${props.query}&page=${1}&limit=${limit}`;
        let response = await fetch(route);
        let _data = await response.json();
        await updateData(_data);
        await calcNumResultsPerOrder(_data);
        
        // count query
        let countResponse = await fetch(`https://api.tapeworms-unlocked.info/worms?count_by_order=true`);
        _data = await countResponse.json();
        await calcNumResultsPerOrder(_data);

        setLoading(false);
        if(response.length > 0){
            window.addEventListener("scroll", handleScroll);
        };
    }

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

    const calcNumResultsPerOrder = async (_data) => {
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
        console.log("handle scroll");
        if (
            window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight
        ) {
            console.log("setting new page");
            setPage(page + 1);
            console.log("page set", page);
            window.removeEventListener('scroll', handleScroll);
        }
    }

    useEffect(()=>{
        console.log("query changed");
        window.scrollTo({top:0, behavior:'instant'});
        fetchWithNewFilter();
        setPage(1);
        window.addEventListener("scroll", handleScroll);
    },[props.query]);

    useEffect(()=>{
        console.log("page change")
        console.log(page);
        if (page === 1) {
            console.log("skip");
            return;
        }
        fetchMoreData();
    },[page]);

    return (
        <div className={styles.container} ref={gridRef}>
            {/* Counts of results by order */}
            <div className={styles.orderCountContainer}>
                {
                    Object.entries(orderCounts).map(([order, count])=> (
                        // <span className={styles.textResults}>  [{count}] {order}</span> 
                        <span className={styles.pillBody} style={{backgroundColor:colorMap[order]}} key={`${order}_count}`}>{order}
                            <div className={styles.pillCount}>{count}</div>
                        </span> 
                    ))
                }
            </div>

            {/*  */}
            <div className={styles.grid}>
                {
                    data.map( (x) => (
                        <GridCard 
                            genus={()=>{ return x.genus.charAt(0).toUpperCase() + x.genus.slice(1); }}
                            gridBox = {gridRef}
                            key = {`${x.genus}_card`}
                            img = {`./${x.genus}_main.jpg`}
                            imageSources = {x.thumbnails}
                            color = {colorMap[x.order]}
                        />
                    ))
                }
                {
                    loading && (
                        (() => {
                          const gridCards = [];
                          for (let i = 0; i < limit; i++) {
                            gridCards.push(<GridCard loading={true} gridBox={gridRef} key={i}/>);
                          }
                          return gridCards;
                        })()
                      )
                }                       
            </div>
        </div>
    );
}

export default MasonryGrid;