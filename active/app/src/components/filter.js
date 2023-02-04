import React, {useEffect, useState, useRef} from 'react';

import styles from './filter.module.css';
import RadioPillSelector from './radio-pill-selector';

function Filter (props) {

    // state
    const [apicalOrgan, setApicalOrgan] = useState(null);
    const [acetabulaShape, setAcetabulaShape] = useState(null);
    const [tentacles, setTentacles] = useState(null);

    const [proglottidsMargins, setProglottidsMargins] = useState(null);

    const [host, setHost] = useState(null);


    // build query on load
    useEffect(() => {
        buildQuery();
    });

    const buildQuery = () => {
        // build query
        let query = {
            'apical_organ' : apicalOrgan,
            'acetabula_shape' : acetabulaShape,
            'tentacles' : tentacles,
            'proglottids_margins' : proglottidsMargins,
            'host' : host
        };

        // remove null params
        for (let p in query) {
            if (query[p] === null)
                delete query[p];
        }

        let params = new URLSearchParams(query);
        props.setFilters(params.toString());
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Get Me Close</h2>

            <div className={styles.getMeCloseContainer}>
                <h4 className={styles.instructionText}>SELECT ANY & ALL THAT APPLY</h4>

                {/* Scolex Features */}
                <h5>Features</h5>

                {/* USE THIS FORMAT */}
                {/* inputDict={{ label : value }} 
                    value={state}
                    setValue={setState} */}
                
                <RadioPillSelector inputDict={{  'apical organ' : true,
                                            'no apical organ': false}}
                                    value={apicalOrgan}
                                    setValue={setApicalOrgan}
                />

                <RadioPillSelector inputDict={{ 'bothria' : 'bothridiate',
                                                'bothridia' : 'bothriate',
                                                'suckers' : 'sucker-like'}}
                                    value={acetabulaShape}
                                    setValue={setAcetabulaShape}
                />

                <RadioPillSelector inputDict={{ 'tentacles' : true,
                                                'no tentacles': false}}
                                    value={tentacles}
                                    setValue={setTentacles}
                />
                
                <h5>Proglottid features</h5>
                <RadioPillSelector inputDict={{ 'craspedote' : 'craspedote',
                                                'acraspedote' : 'acraspedote'}}
                                    value={proglottidsMargins}
                                    setValue={setProglottidsMargins}
                />


                <h5>Host Information</h5>
                <RadioPillSelector inputDict={{ 'batoid' : 'batoid',
                                                'shark' : 'shark'}}
                                    value={host}
                                    setValue={setHost}
                />

            </div>
            <div className={styles.moreFeaturesContainer}>

            </div>
        </div>
    );
}

export default Filter;