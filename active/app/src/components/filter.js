import React, {useEffect, useState, useRef} from 'react';

import styles from './filter.module.css';
import RadioPillSelector from './radio-pill-selector';
import FeatureSelectorModal from './feature-selector-modal';
import DetailedFeatureSelection from './detailed-feature-selection';

function Filter (props) {

    // ui states
    const [getMeCloseVisible, setGetMeCloseVisible] = useState(true);

    // filter states
    const [apicalOrgan, setApicalOrgan] = useState(null);
    const [acetabulaShape, setAcetabulaShape] = useState(null);
    const [tentacles, setTentacles] = useState(null);

    const [proglottidsMargins, setProglottidsMargins] = useState(null);

    const [host, setHost] = useState(null);
    const [apolysis, setApolysis] = useState(null);


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
            'host' : host,
            'apolysis' : apolysis
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
            <span>
                <h2 className={styles.subtitle}>Get Me Close</h2>
                <button onClick={()=> {
                    setGetMeCloseVisible(!getMeCloseVisible);
                }}>{getMeCloseVisible ? "Hide" : "Show"}</button>
            </span>

            <div className={styles.getMeCloseContainer}
                style={{display: getMeCloseVisible ? 'block' : 'none'}}>
                <h4 className={styles.instructionText}>SELECT ANY & ALL THAT APPLY</h4>

                {/* USE THIS FORMAT */}
                {/* inputDict={{ label : value }} 
                    value={state}
                    setValue={setState} */}

                <h5>Scolx Features</h5>
                <RadioPillSelector inputDict={{  'apical organ' : true,
                                            'no apical organ': false}}
                                    value={apicalOrgan}
                                    setValue={setApicalOrgan}
                />

                <RadioPillSelector inputDict={{ 'bothria' : 'bothridiate',
                                                'bothridia' : 'bothriate',
                                                'suckers' : 'sucker-like',
                                                'other' : 'other'}} // other means none of the previous three. 
                                    value={acetabulaShape}
                                    setValue={setAcetabulaShape}
                />

                <RadioPillSelector inputDict={{ 'tentacles' : true,
                                                'no tentacles': false}}
                                    value={tentacles}
                                    setValue={setTentacles}
                />

                
                <RadioPillSelector inputDict={{ 'uterus to GP' : true,
                                                'uterus beyond GP': false}}
                                    value={0}
                                    setValue={0}
                                    // orientation={'vertical'}
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
            
            <br/>
            <h2 className={styles.subtitle}>More Features</h2>
            <div className={styles.moreFeaturesContainer}>

                <h4 className={styles.instructionText}>CLICK ON A FEATURE TO SEE OPTIONS</h4>
                
                <DetailedFeatureSelection
                    title="Apolysis"
                    inputDict={{ 'Apolytic' : 'apolytic',
                                'Euapolytic' : 'euapolytic',
                                'Hyperapolytic' : 'hyperapolytic' }}
                    value={apolysis}
                    setValue={setApolysis}
                />

<DetailedFeatureSelection
                    title="Apolysis"
                    inputDict={{ 'Apolytic' : 'apolytic',
                                'Euapolytic' : 'euapolytic',
                                'Hyperapolytic' : 'hyperapolytic' }}
                    value={apolysis}
                    setValue={setApolysis}
                />

<DetailedFeatureSelection
                    title="Apolysis"
                    inputDict={{ 'Apolytic' : 'apolytic',
                                'Euapolytic' : 'euapolytic',
                                'Hyperapolytic' : 'hyperapolytic' }}
                    value={apolysis}
                    setValue={setApolysis}
                />
            </div>
        </div>
    );
}

export default Filter;