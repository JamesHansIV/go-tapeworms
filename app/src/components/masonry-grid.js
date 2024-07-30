import React, {useState, useEffect, useRef} from 'react';
import GridCard from './grid-card';
import {buildImageURL} from './grid-card';

import styles from './masonry-grid.module.css';
import loadingAnimations from './loading-animations.module.css';


function MasonryGrid(props) {
    const gridRef = useRef();

    const cardWidth = 200;

    // states   
    const [orderCounts, setOrderCounts] = useState({});
    const [totalCount, setTotalCount] = useState();
    const [data, updateData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(60);
    const [loading, setLoading] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageSrcMap, setImageSrcMap] = useState(new Map());

    // infinite scroll
    async function fetchMoreData() {
        setLoading(true);
        const route = `https://api.tapeworms-unlocked.info/worms?${props.query}&page=${page}&limit=${limit}`;
        let response = await fetch(route)
        response = await response.json()
        let data_ = [...data, ...response];
        await updateData((prevData) => [...prevData, ...response]);
        // preloadImages();
        setLoading(false)
        if(response.length > 0){
            window.addEventListener("scroll", handleScroll);
        }
    }

    // new filter fetch 
    async function fetchWithNewFilter() {
        setLoading(true);
        // normal query
        const route = `https://api.tapeworms-unlocked.info/worms?${props.query}&page=${1}&limit=${limit}`;
        let response = await fetch(route);
        let _data = await response.json();
        updateData(_data);
        // await calcNumResultsPerOrder(_data);
        
        // count query
        let countResponse = await fetch(`https://api.tapeworms-unlocked.info/worms?${props.query}&count_by_order=true`);
        _data = await countResponse.json();
        await calcNumResultsPerOrder(_data);
        // await calcTotalCount(_data);

        await preloadImages();

        setLoading(false);
        if(response.length > 0){
            window.addEventListener("scroll", handleScroll);
        };
    }

    // preload images
    async function preloadImages() {
        setImagesLoaded(false);
        let imgArr = [];
        let newMap = new Map();
        data.map(x => {
            const url = buildImageURL(x.genus, x.thumbnails, 0);
            const img = new Image();
            img.src = url;
            console.log(typeof(url))
            imgArr.push(url);
            newMap[x.genus] = img.src;
        });
        setImageSrcMap({...imageSrcMap, ...newMap});
        // console.log(imgArr);
        setImagesLoaded(true);
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

    const scolexFeaturesList = [
        "scolex", "apical_organ", "tentacles", "hooks", "scolex_attachment_structures"
    ];


    const calcNumResultsPerOrder = async (_data) => {
        let counts = {};
        _data.map((x)=> {
            if (x.order in counts)
                counts[x.order] ++;
            else
                counts[x.order] = 1;
        });
        setOrderCounts(counts); 
        
        // const sumOfCounts = calcTotalCount(counts);
        // setTotalCount(sumOfCounts);
        
    };

    const calcTotalCount = (counts) => {
        let sum = 0;
        for (let order in counts) {
            sum += counts[order];
        }
        console.log("SUM " + sum);
        // setTotalCount(sum);
        return sum;
    }

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight
        ) {
            // setPage(page + 1);
            window.removeEventListener('scroll', handleScroll);
        }
    }

    useEffect(()=>{
        // console.log("query changed");
        window.scrollTo({top:0, behavior:'instant'});
        fetchWithNewFilter();
        setPage(1);
        window.addEventListener("scroll", handleScroll);
    },[props.query]);

    useEffect(()=>{
        // console.log("page change")
        console.log(page);
        if (page === 1) {
            // console.log("skip");
            return;
        }
        fetchMoreData();

        // setTotalCount(Object.values(orderCounts).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    },[page]);

    useEffect(()=>{
        const sumOfCounts = calcTotalCount(orderCounts);
        console.log("sum of counts" + sumOfCounts);
        setTotalCount(sumOfCounts);
    },[orderCounts])



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
            {totalCount > 0 && (loading === true || imagesLoaded === false) && 
                // spinner
                <div className={styles.animationWrapper}>
                    <div className={loadingAnimations.ldsDualRing}/>
                </div>
            }
            {totalCount > 0 && loading === false && imagesLoaded === true &&
                <div className={styles.gridContent} 
                    style={{gridTemplateColumns:`repeat(auto-fit, minmax(min-content, ${cardWidth}px)`}}>
                    {
                        data.map( x => (
                            <GridCard 
                                genus={()=>{ return x.genus.charAt(0).toUpperCase() + x.genus.slice(1); }}
                                gridBox = {gridRef}
                                key = {`${x.genus}_card`}
                                // img = {`./${x.genus}_main.jpg`}
                                img = {imageSrcMap[x.genus]}
                                imageSources = {x.thumbnails}
                                color = {colorMap[x.order]}
                                cardWidth={cardWidth}
                                loading={false}
                            />
                            // console.log(imageSrcMap[x.genus])
                        ))
                    } 
                </div>
            }   
            {totalCount === 0 && loading === false && imagesLoaded === true &&
                <>
                    <b>Whoops! No matches found with the feature combination: </b>
                    <ul>
                       {props.query.split("&").map(paramPair => {
                            if (paramPair === "")
                                return;
                            
                            let param = paramPair.split("=")[0];
                            let value = paramPair.split("=")[1];

                            let paramWords = param.replace(/_/g, ' ');
                            // paramWords = paramWords.split(" ");
                            

                            // paramWords.map(word => {
                            //     return word[0].toUpperCase() + word.substring(1);
                            // }).join("_");

                            if (value == "true")
                                value = "present";
                            if (value == "false")
                                value = "absent";
                
                            return <li><b>{paramWords}:</b> {value}</li>
                       })}
                    </ul>
                </>
            }
            {totalCount > 0 && totalCount > data.length && loading === false && imagesLoaded === true &&
                <div className={styles.loadMore}
                    onClick={()=>{setPage(page + 1)}}
                >
                    Load more...
                </div>
            }            
        </div>
    );
}

export default MasonryGrid;

// https://loading.io/css/