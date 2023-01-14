import React, {useState} from 'react';

import styles from './grid-card.module.css';


import img from '../images/Seussapex_KA206Asc2nd.jpg';
// import img from '../images/test.jpg';

function GridCard(props) {
    const [genus, setGenus] = useState(props.genus);

    return (
        <div className={styles.container}>
            {/* Image (carousel?) */}

            <div className={styles.portrait}>
                <img 
                    className={styles.image}
                    src={img} alt="number 2"/>
            </div>

            <div className={styles.nameTag}>
                {genus}
            </div>
        </div>
    );
}

export default GridCard;