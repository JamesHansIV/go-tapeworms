import React, {useEffect, useState, useRef } from 'react';

import styles from './filter.module.css';
import RadioPillSelector from './radio-pill-selector';
import DetailedFeatureSelection from './detailed-feature-selection';
import ScrollToTopButton from './scroll-to-top-button';
import { SuggestionTextBox } from './suggestion-text-box';

function Filter (props) {
    // refs
    const scrollTargetRef = useRef();

    // ui states
    const [getMeCloseVisible, setGetMeCloseVisible] = useState(true);
    const [topModalZ, setTopModalZ] = useState(10);

    // filter states
    // scolex feature states
    const [scolexPresent, setScolexPresent] = useState(null);
    const [scolexAttachmentStructure, setScolexAttachmentStructure] = useState(null);
    const [apicalOrganPresent, setApicalOrganPresent] = useState(null);
    const [tentaclesPresent, setTentaclesPresent] = useState(null);
    const [hooksPresent, setHooksPresent] = useState(null);

    // proglottid feature states
    const [proglottidsMargins, setProglottidsMargins] = useState(null);
    const [laciniationsPresent, setLaciniationsPresent] = useState(null);
    const [genitalPorePosition, setGenitalPorePosition] = useState(null);
    const [hasSingleColumnOfTestes, setHasSingleColumnOfTestes] = useState(null);
    const [postPoralTestesPresent, setPostPoralTestesPresent] = useState(null);
    const [anteriorExtentOfUterus, setAnteriorExtentOfUterus] = useState(null);
    const [vitellineFollicleArrangement, setVitellineFollicleArrangement] = useState(null);

    // strobilar feature states
    const [apolysis, setApolysis] = useState(null);
    const [wideAnteriorStrobia, setWideAnteriorStrobira] = useState(null);

    // host information states
    const [hostGroup, setHostGroup] = useState(null);

    //genera table data
    const [hostFamilies, setHostFamilies] = useState([])

    const getHostFamilies = async() => {
        const response = await fetch(`http://localhost:8080/host_families`);
        const data = await response.json()
        let host_array  = []
        for(let d of data){
            host_array.push(d.host_family)
        }
        setHostFamilies(host_array)
    }

    // build query
    const buildQuery = () => {
        // build query
        let query = {
            'scolex' : scolexPresent,
            'apical_organ' : apicalOrganPresent,
            'tentacles' : tentaclesPresent,
            'hooks' : hooksPresent,
            'scolex_attachment_structures' : scolexAttachmentStructure,
            'proglottid_margins' : proglottidsMargins,
            'laciniations' : laciniationsPresent,
            'pore_position' : genitalPorePosition,
            'single_column_of_testes' : hasSingleColumnOfTestes,
            'post_poral testes' : postPoralTestesPresent,
            'anterior_extent_of_uterus' : anteriorExtentOfUterus,
            'vitelline_follicle_arrangement' : vitellineFollicleArrangement,
            'apolysis' : apolysis,
            'wide_anterior_strobia' : wideAnteriorStrobia,
            'host_group' : hostGroup
        };
        console.log('query', query);

        // remove null params
        for (let p in query) {
            if (query[p] === null)
                delete query[p];
        }

        console.log("pruned", query);
        

        let params = new URLSearchParams(query);
        props.setFilters(params.toString());
    }

    // onclick handlers
    const scrollToTop = () => scrollTargetRef.current.scrollIntoView({behavior: 'smooth',block:'start'});
    const toggleGetMeCloseVisible = () => setGetMeCloseVisible(!getMeCloseVisible);    
    const clearFilters = () => {
        // reset scolex feature states
        setScolexPresent(null);
        setScolexAttachmentStructure(null);
        setApicalOrganPresent(null);
        setTentaclesPresent(null);
        setHooksPresent(null);

        // reset proglottid feature states
        setProglottidsMargins(null);
        setLaciniationsPresent(null);
        setGenitalPorePosition(null);
        setHasSingleColumnOfTestes(null);
        setPostPoralTestesPresent(null);
        setAnteriorExtentOfUterus(null);
        setVitellineFollicleArrangement(null);

        // reset strobilar feature states
        setApolysis(null);
        setWideAnteriorStrobira(null);

        // reset host information states
        setHostGroup(null);
    };


    // ON RENDER
    buildQuery();
    
    useEffect(() => {
        getHostFamilies();
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.scrollableWrapper}>
                <span className={styles.icons}>
                    <ScrollToTopButton onClick={scrollToTop}/>
                </span>

                {/* Get me close title */}
                <span ref={scrollTargetRef}>
                    <span className={styles.headingButtonContainter}> 
                        <h2>Get Me Close</h2>
                        <button className={styles.clearFiltersButton} onClick={clearFilters}>Clear Filters</button>
                    </span>
                    {/* <button onClick={toggleGetMeCloseVisible}> {getMeCloseVisible ? "Hide" : "Show"} </button> */}
                </span>

                <div className={styles.getMeCloseContainer}
                    style={{display: getMeCloseVisible ? 'block' : 'none'}}>
                    {/* <h4 className={styles.instructionText}>SELECT ANY & ALL THAT APPLY</h4> */}

                    {/* USE THIS FORMAT */}
                    {/* inputDict={{ label : value }} 
                        value={state}
                        setValue={setState} */}

                    <h5>Scolex Features</h5>
                    <RadioPillSelector inputDict={{'scolex present' : true, 'scolex absent' : false}}
                        value={scolexPresent}
                        setValue={setScolexPresent}
                    />

                    <RadioPillSelector inputDict={{'bothria' : 'bothria', 'bothridia' : 'bothridia', 'suckers': 'suckers', 'other' : 'other'}}
                        value={scolexAttachmentStructure}
                        setValue={setScolexAttachmentStructure}
                    />

                    <RadioPillSelector inputDict={{  'apical organ' : true, 'no apical organ': false}}
                        value={apicalOrganPresent}
                        setValue={setApicalOrganPresent}
                    />

                    <RadioPillSelector inputDict={{ 'tentacles' : true, 'no tentacles': false}}
                        value={tentaclesPresent}
                        setValue={setTentaclesPresent}
                    />

                    <RadioPillSelector inputDict={{'hooks' : true, 'no hooks' : false}}
                        value={hooksPresent}
                        setValue={setHooksPresent}
                    />

                    <h5>Proglottid features</h5>
                    {/* <h6>(GPP = Genital Pore Position)<br/>(VFA = Vitelline Follicle Arrangement)</h6> */}
                    <RadioPillSelector inputDict={{ 'craspedote' : 'craspedote', 'acraspedote' : 'acraspedote'}}
                        value={proglottidsMargins}
                        setValue={setProglottidsMargins}
                    />

                    <RadioPillSelector inputDict={{'laciniations' : true, 'no laciniations' : false}}
                        value={laciniationsPresent}
                        setValue={setLaciniationsPresent}
                    />

                    <RadioPillSelector inputDict={{'GPP lateral/sublateral' : 'lateral_sublateral', 'GPP doral/ventral' : 'dorsal_ventral'}}
                        value={genitalPorePosition}
                        setValue={setGenitalPorePosition}
                    />

                    <RadioPillSelector inputDict={{'1 columnn of testes' : true, '>1 column of testes' : false}}
                        value={hasSingleColumnOfTestes}
                        setValue={setHasSingleColumnOfTestes}
                    />

                    <RadioPillSelector inputDict={{'post-poral testes' : true, 'no post-poral testes' : false}}
                        value={postPoralTestesPresent}
                        setValue={setPostPoralTestesPresent}
                    />

                    <RadioPillSelector inputDict={{ 'uterus extends to GP' : 'to_pore', 'uterus extends beyond GP': 'beyond'}}
                        value={anteriorExtentOfUterus}
                        setValue={setAnteriorExtentOfUterus}
                    />

                    <RadioPillSelector 
                        inputDict={{ 'circumsegmental VFA' : 'circumsegmental', 'lateral VFA' : 'lateral', 'other VFA' : 'other'}}
                        value={vitellineFollicleArrangement}
                        setValue={setVitellineFollicleArrangement}
                    />

                    <h5>Strobilar Features</h5>
                    <RadioPillSelector inputDict={{'apolytic' : 'apolytic', 'euapolytic' : 'euapolytic', 'hyperapolytic' : 'hyperapolytic'}}
                        value={apolysis}
                        setValue={setApolysis}
                    />

                    <RadioPillSelector inputDict={{'wide anterior strobila' : true, 'narrow anterior strobila' : false}}
                        value={wideAnteriorStrobia}
                        setValue={setWideAnteriorStrobira}
                    />

                    <h5>Host Information</h5>
                    <RadioPillSelector inputDict={{ 'batoid' : 'batoids', 'shark' : 'sharks', 'ratfish' : 'ratfishes'}}
                        value={hostGroup}
                        setValue={setHostGroup}
                    />

                </div>
                
                <br/>
                <h2 className={styles.subtitle}>More Features</h2>
                <div className={styles.moreFeaturesContainer}>
                    <SuggestionTextBox 
                        heading = "Host family"
                        options = {hostFamilies}
                    />
                    <h4 className={styles.instructionText}>CLICK ON A FEATURE TO SEE OPTIONS</h4>
                    
                    <DetailedFeatureSelection
                        title="Apolysis"
                        inputDict={{ 'Apolytic' : 'apolytic',
                                    'Euapolytic' : 'euapolytic',
                                    'Hyperapolytic' : 'hyperapolytic' }}
                        value={apolysis}
                        setValue={setApolysis}
                        topModalZ={topModalZ}
                        setTopModalZ={setTopModalZ}
                    />

                    <DetailedFeatureSelection
                        title="Apolysis"
                        inputDict={{ 'Apolytic' : 'apolytic',
                                    'Euapolytic' : 'euapolytic',
                                    'Hyperapolytic' : 'hyperapolytic' }}
                        value={apolysis}
                        setValue={setApolysis}
                        topModalZ={topModalZ}
                        setTopModalZ={setTopModalZ}
                    />

                    <DetailedFeatureSelection
                        title="Apolysis"
                        inputDict={{ 'Apolytic' : 'apolytic',
                                    'Euapolytic' : 'euapolytic',
                                    'Hyperapolytic' : 'hyperapolytic' }}
                        value={apolysis}
                        setValue={setApolysis}
                        topModalZ={topModalZ}
                        setTopModalZ={setTopModalZ}
                    />

                    
                </div>
            </div>
        </div>
    );
}

export default Filter;