import React, {useState, useRef, useEffect} from 'react';
import {FastAverageColor} from 'fast-average-color';
import styles from './grid-card.module.css';


function GridCard(props) {
    const innerRef = useRef();
    const outerRef = useRef();
    const portraitRef = useRef();
    const imgRef = useRef();
    const selectedRef = useRef(false);

    // card size constants
    // const [defaultCardWidth, ] = useState(props.cardWidth);
    const defaultCardWidth =  200;
    const defaultCardHeight = 205;
    const defaultPortraitHeight = 180;
    const maxWidth = 300;

    const cardWidth = props.cardWidth;

    const [genus, ] = useState(props.genus);
    const [gridBox, ] = useState(props.gridBox.current.getBoundingClientRect());
    const [gridWidth, ] = useState(900);
    const [imageIndex, setImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);


    // let images = [props.img, 'aberrapex_main.jpg', 'corollapex_main.jpg'];
    let images = props.imageSources;

    useEffect(() => { 
        if(!props.loading && !imageLoading){
            // resizeCard(defaultCardWidth, defaultCardHeight, defaultPortraitHeight);
        }
        // averageBackground();
        // console.log(images)
    });

    const centerIfSmall = () => {
        // const imgRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;

        // console.log(genus, imgRef.current.height, portraitRef.current.style.height, parseInt(portraitRef.current.style.height));
        if (imgRef.current.height < parseInt(portraitRef.current.style.height)) {
            portraitRef.current.style.display = 'flex';
            portraitRef.current.style.alignItems = 'center';
        } else {
            portraitRef.current.style.display = '';
            portraitRef.current.style.alignItems = '';
        }
    };

    const averageBackground = async () => {
        const fac = new FastAverageColor();
        try {
            const color = await fac.getColorAsync(imgRef.current);
            outerRef.current.style.backgroundColor = color.rgba;
            outerRef.current.style.color = color.isDark ? '#fff' : '#000';
            innerRef.current.style.backgroundColor = outerRef.current.style.backgroundColor;
        } catch (error) {
            // console.log(error.message);
        }
    };

    const resizeCard = (cardWidth, cardHeight, portraitHeight) => {
        innerRef.current.style.width = `${cardWidth}px`;
        innerRef.current.style.height = `${cardHeight}px`;
        portraitRef.current.style.width = `${cardWidth}px`;
        portraitRef.current.style.height = `${portraitHeight}px`;

        let offsetX = (defaultCardWidth - cardWidth) / 2;
        let offsetY = (defaultCardHeight - cardHeight) / 2;

        const cardRect = innerRef.current.getBoundingClientRect();

        if (selectedRef.current === true) {
            if (cardRect.left + offsetX < gridBox.left)
                offsetX = gridBox.left - cardRect.left + 8;
            if (cardRect.right > gridBox.left + gridWidth)
                offsetX = defaultCardWidth - cardWidth + 8;

            innerRef.current.style.left = `${offsetX}px`;
            innerRef.current.style.top = `${offsetY}px`;
            innerRef.current.style.boxShadow = '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)';
        } else {
            innerRef.current.style.left = `0px`;
            innerRef.current.style.top = `0px`;
            innerRef.current.style.boxShadow = 'none';
        } 


    };

    const handleClick = () => {
        selectedRef.current = !selectedRef.current;

        if (props.loading !== true && selectedRef.current === true) {
            const imgRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
            const newWidth = Math.min(maxWidth, imgRef.current.naturalWidth);
            const newHeight = newWidth / imgRatio;
            
            outerRef.current.style.zIndex = 90;
            // resizeCard(newWidth, newHeight+20, newHeight);
        } else {
            // resizeCard(defaultCardWidth, defaultCardHeight, defaultPortraitHeight);
            outerRef.current.style.zIndex = 50;
        }
    };  

    const buildImageURL = () => {
        let base = "https://s3.us-east-2.amazonaws.com/images.tapeworms-unlocked.info/thumbnails";
        let genusLowerCase = genus.charAt(0).toLowerCase() + genus.slice(1);
        if (images === undefined) {
            return `${base}/${genusLowerCase}`;
        }

        let imageURL = `${base}/${genusLowerCase}/${images[imageIndex]}`;
        // console.log(imageURL);
        // console.log(imageURL);
        return imageURL;
    }

    const handleNextImage = () => {
        setImageIndex((imageIndex + 1) % images.length);
        buildImageURL();
        setImageLoading(true);
    }

    const handlePrevImage = () => {
        setImageIndex((imageIndex -1 + images.length) % images.length);
        buildImageURL();
        setImageLoading(true);
    }

    const getSize = () => {

        const imgRatio = cardWidth / imgRef.current.naturalWidth;
        const newHeight = imgRef.current.naturalHeight * imgRatio;

        let rows = ~~(newHeight / 5);

        return `span ${rows+9}`
    }

    return (
        props.loading === true ? (
            <div className={styles.container}>
                <div className={styles.portrait}>
                    <div className={styles.skeleton}/>
                </div>

                <div className={styles.nameTagSkeleton}/>
            </div>
        ) : ( 
            <div className={styles.outerContainer} onClick={handleClick} ref={outerRef} style={{gridRowEnd: imageLoading ? "" : getSize()}}> 
                <div className={styles.innerContainer} ref={innerRef}>
                
                {/* Image (carousel?) */}
                    
                    <div className={styles.portrait} ref={portraitRef}>

                        <div 
                        className={styles.skeleton} 
                        style={{display: imageLoading ? "block" : "none"}}>
                            {/* loading... */}
                        </div>

                        <div className= {styles.carousel} style={{display: imageLoading ? "none" : "block"}}>
                            <img 
                                className={styles.image}
                                src={buildImageURL()} 
                                alt={`cannot find ${genus} source`}
                                ref={imgRef}
                                crossOrigin={"anonymous"}
                                onLoad={() => {
                                    setImageLoading(false);
                                    centerIfSmall();
                                    averageBackground();
                                }}
                                />
                        </div>
                        { images?.length > 1 &&
                            <div className={styles.buttons}>
                                <button className={styles.carouselButton} onClick={handlePrevImage}>
                                    &#9664;
                                </button>
                                <button className={styles.carouselButton} onClick={handleNextImage}>
                                    &#9654;
                                </button>
                            </div>
                        }
                        
                        
                    </div>

                    <div className={styles.nameTag}
                        style={{backgroundColor:props.color}}>
                        {genus}
                    </div>

                    
                </div>
            </div>
        )
    );
}

export default GridCard;