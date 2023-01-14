import React from 'react';
import GridCard from './grid-card';

import styles from './worm-grid.module.css';

function WormGrid() {
    // fetch data

    return (
        <div className={styles.container}>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
            <GridCard genus="Seussepex"/>
        </div>
    );
}

export default WormGrid;