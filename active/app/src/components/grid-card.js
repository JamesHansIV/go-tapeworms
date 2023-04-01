import React, {useState} from 'react';

import styles from './grid-card.module.css';

function GridCard(props) {
    const [genus, setGenus] = useState(props.genus);

    return (
        props.loading == true ? (
            <div className={styles.container}>
                <div className={styles.portrait}>
                    <div className={styles.skeleton}/>
                </div>

                <div className={styles.nameTagSkeleton}/>
            </div>
        ) : (
            <div className={styles.container}> 
            {/* Image (carousel?) */}
                <div className={styles.portrait}>
                    <img 
                        className={styles.image}
                        src={`${process.env.PUBLIC_URL}/images/${props.img}`} alt="Cannot Find Image :("
                    />
                </div>

                <div className={styles.nameTag}
                    style={{backgroundColor:props.color}}>
                    {genus}
                </div>
            </div>
        )
    );
}

export default GridCard;