import React, {useEffect, useState, useRef } from 'react';

import styles from './filter.module.css';
import Accordion from './accordion';
import RadioPillSelector from './radio-pill-selector';
import ChecklistPillSelector from './checklist-pill-selector';
import DetailedFeatureSelection from './detailed-feature-selection';
import ScrollToTopButton from './scroll-to-top-button';
import { SuggestionTextBox } from './suggestion-text-box';

function Filter (props) {
    // refs
    const scrollTargetRef = useRef();

    // ui states
    const [getMeCloseVisible, setGetMeCloseVisible] = useState(true);
    const [topModalZ, setTopModalZ] = useState(99999);

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
    const [hostFamily, setHostFamily] = useState(null);

    // MORE FEATURES
    const [bothridialFeatures, setBothridialFeatures] = useState([]);
    const [apicalSuckerRegion, setApicalSuckerRegion] = useState([]);
    const [hookPlacement, setHookPlacement] = useState(null);
    const [peduncleHooks, setPeduncleHooks] = useState(null);
    const [hookFeatures, setHookFeatures] = useState([]);


    //family table data
    const [hostFamilies, setHostFamilies] = useState([])

    const getHostFamilies = async() => {
        const response = await fetch(`https://api.tapeworms-unlocked.info/host_families`);
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
            'host_group' : hostGroup,
            'host_family' : hostFamily,
            'bothridial_features': bothridialFeatures,
            'apical_sucker_region': apicalSuckerRegion,
            'hook_placement': hookPlacement,
            'peduncle_hooks':peduncleHooks,
            'hook_features':hookFeatures
        };
        // console.log('query', query);

        // remove null params
        for (let p in query) {
            if (query[p] === null || query[p].length === 0)
                delete query[p];
        }

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
        setHostFamily(null);

        // MORE FEATURES
        // scolex features
        setBothridialFeatures([]);
        setApicalSuckerRegion([]);
        setHookPlacement(null);
        setPeduncleHooks(null);
    };


    // ON RENDER
    buildQuery();
    
    useEffect(() => {
        getHostFamilies();
    },[]);

    return (
        <div className={styles.container} id={"filtercontainer"}>
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

                    {/* <h5>Scolex Features</h5> */}
                    <Accordion header={'Scolex Features'} openInitially={true}>
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'scolex present' : true, 'scolex absent' : false}}
                                value={scolexPresent}
                                setValue={setScolexPresent}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'scolex present' : true, 'scolex absent' : false}}
                                value={scolexPresent}
                                setValue={setScolexPresent}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'bothria' : 'bothria', 'bothridia' : 'bothridia', 'suckers': 'suckers', 'other' : 'other'}}
                                value={scolexAttachmentStructure}
                                setValue={setScolexAttachmentStructure}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'bothria' : 'bothria', 'bothridia' : 'bothridia', 'suckers': 'suckers', 'other' : 'other'}}
                                value={scolexAttachmentStructure}
                                setValue={setScolexAttachmentStructure}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                        
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{  'apical organ' : true, 'no apical organ': false}}
                                value={apicalOrganPresent}
                                setValue={setApicalOrganPresent}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'apical organ present' : true, 'apical organ absent' : false}}
                                value={apicalOrganPresent}
                                setValue={setApicalOrganPresent}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{ 'tentacles' : true, 'no tentacles': false}}
                                value={tentaclesPresent}
                                setValue={setTentaclesPresent}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'tentacles' : true, 'no tentacles' : false}}
                                value={tentaclesPresent}
                                setValue={setTentaclesPresent}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'hooks' : true, 'no hooks' : false}}
                                value={hooksPresent}
                                setValue={setHooksPresent}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'hooks' : true, 'no hooks' : false}}
                                value={hooksPresent}
                                setValue={setHooksPresent}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                    </Accordion>

                    {/* <h5>Proglottid features</h5> */}
                    <Accordion header={'Proglottid Features'}>
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{ 'craspedote' : 'craspedote', 'acraspedote' : 'acraspedote'}}
                                value={proglottidsMargins}
                                setValue={setProglottidsMargins}
                            />
                            <DetailedFeatureSelection
                                inputDict={{ 'craspedote' : 'craspedote', 'acraspedote' : 'acraspedote'}}
                                value={proglottidsMargins}
                                setValue={setProglottidsMargins}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                        

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'laciniations' : true, 'no laciniations' : false}}
                                value={laciniationsPresent}
                                setValue={setLaciniationsPresent}
                            />
                            <DetailedFeatureSelection
                                title="Laciniations Present"
                                inputDict={{'laciniations' : true, 'no laciniations' : false}}
                                value={laciniationsPresent}
                                setValue={setLaciniationsPresent}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'GPP lateral/sublateral' : 'lateral_sublateral', 'GPP dorsal/ventral' : 'dorsal_ventral'}}
                                value={genitalPorePosition}
                                setValue={setGenitalPorePosition}
                                abbreviation={{'GPP' : 'Genital Pore Position'}}
                                shift={"right"}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'GPP lateral/sublateral' : 'lateral_sublateral', 'GPP dorsal/ventral' : 'dorsal_ventral'}}
                                value={genitalPorePosition}
                                setValue={setGenitalPorePosition}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'1 column of testes' : true, '>1 column of testes' : false}}
                                value={hasSingleColumnOfTestes}
                                setValue={setHasSingleColumnOfTestes}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'1 column of testes' : true, '>1 column of testes' : false}}
                                value={hasSingleColumnOfTestes}
                                setValue={setHasSingleColumnOfTestes}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector 
                                inputDict={{'post-poral testes' : true, 'no post-poral testes' : false}}
                                value={postPoralTestesPresent}
                                setValue={setPostPoralTestesPresent}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'post-poral testes' : true, 'no post-poral testes' : false}}
                                value={hasSingleColumnOfTestes}
                                setValue={setHasSingleColumnOfTestes}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{ 'uterus extends to GP' : 'to_pore', 'uterus extends beyond GP': 'beyond'}}
                                value={anteriorExtentOfUterus}
                                setValue={setAnteriorExtentOfUterus}
                                abbreviation={{'GP':'Genital Pore'}}
                                shift="left"
                            />
                            <DetailedFeatureSelection
                                inputDict={{ 'uterus extends to GP' : 'to_pore', 'uterus extends beyond GP': 'beyond'}}
                                value={anteriorExtentOfUterus}
                                setValue={setAnteriorExtentOfUterus}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>

                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector 
                                inputDict={{ 'circumsegmental VFA' : 'circumsegmental', 'lateral VFA' : 'lateral', 'other VFA' : 'other'}}
                                value={vitellineFollicleArrangement}
                                setValue={setVitellineFollicleArrangement}
                                abbreviation={{'VFA' : 'Vitelline Follicle Arrangement'}}
                                shift="left"
                                shiftIndex={2}
                            />
                            <DetailedFeatureSelection
                                inputDict={{ 'circumsegmental VFA' : 'circumsegmental', 'lateral VFA' : 'lateral', 'other VFA' : 'other'}}
                                value={vitellineFollicleArrangement}
                                setValue={setVitellineFollicleArrangement}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                    </Accordion>
                                        

                    {/* <h5>Strobilar Features</h5> */}
                    <Accordion header={'Strobilar Features'}>
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'apolytic' : 'apolytic', 'euapolytic' : 'euapolytic', 'hyperapolytic' : 'hyperapolytic'}}
                                value={apolysis}
                                setValue={setApolysis}
                            />
                            <DetailedFeatureSelection
                                title="apolysis"
                                inputDict={{ 'apolytic' : 'apolytic',
                                            'euapolytic' : 'euapolytic',
                                            'hyperapolytic' : 'hyperapolytic' }}
                                value={apolysis}
                                setValue={setApolysis}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                        
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{'wide anterior strobila' : true, 'narrow anterior strobila' : false}}
                                value={wideAnteriorStrobia}
                                setValue={setWideAnteriorStrobira}
                            />
                            <DetailedFeatureSelection
                                inputDict={{'wide anterior strobila' : true, 'narrow anterior strobila' : false}}
                                value={wideAnteriorStrobia}
                                setValue={setWideAnteriorStrobira}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                        
                    </Accordion>
                    

                    {/* <h5>Host Information</h5> */}
                    <Accordion header={'Host Information'}>
                        <div style={{display:'flex', height:'100%'}}>
                            <RadioPillSelector inputDict={{ 'batoid' : 'batoids', 'shark' : 'sharks', 'ratfish' : 'ratfishes'}}
                                value={hostGroup}
                                setValue={setHostGroup}
                            />
                            <DetailedFeatureSelection
                                title="Host Group"
                                inputDict={{ 'batoid' : 'batoids', 'shark' : 'sharks', 'ratfish' : 'ratfishes'}}
                                value={hostGroup}
                                setValue={setHostGroup}
                                topModalZ={topModalZ}
                                setTopModalZ={setTopModalZ}
                                browser={props.browser}
                            />
                        </div>
                    </Accordion>
                    

                </div>
                
                <br/>
                <h2 className={styles.subtitle}>More Features</h2>
                <div className={styles.moreFeaturesContainer}>
                    <Accordion header={'More Host Information'} divider>
                        <h5 className={styles.moreFeaturesHeader}>Host Family</h5>
                        <SuggestionTextBox 
                            // heading = "Host family"
                            options = {hostFamilies}
                            value = {hostFamily}
                            setValue = {setHostFamily}
                        />
                        
                    </Accordion>

                    {/* <hr className={styles.divider}/> */}

                    <Accordion header={'More Scolex Features'}>
                        <h5 className={styles.moreFeaturesHeader}>Bothridial Features (select all that apply)</h5>
                        <ChecklistPillSelector 
                            inputDict={{'facial loculi':'facial_loculi',
                                        'marginal loculi':'marginal_loculi', 
                                        'pouch':'pouch',
                                        'bifid':'bifid',
                                        'folding':'folding',
                                        'unmodified':'unmodified',
                                        'other':'other'
                                    }}
                            value={bothridialFeatures}
                            setValue={setBothridialFeatures}
                        />

                        <h5 className={styles.moreFeaturesHeader}>Apical Bothridial Region</h5>
                        <ChecklistPillSelector 
                            inputDict={{
                                        'sucker':'sucker',
                                        'region':'region',
                                        'none':'none'
                                    }}
                            value={apicalSuckerRegion}
                            setValue={setApicalSuckerRegion}
                        />

                        {/* <h5 className={styles.moreFeaturesHeader}>Hook Placement and Features</h5> */}
                        <h5 className={styles.moreFeaturesHeader}>Hook Placement</h5>
                        <RadioPillSelector
                            inputDict={{'tentacle':'tentacle_hooks',
                                        'bothridial':'bothridial_hooks',
                                        'bothrial':'bothrial_hooks'}}
                            value={hookPlacement}
                            setValue={setHookPlacement}
                        />

                        <RadioPillSelector 
                            inputDict={{'peduncle hooks present' : 'yes'}}
                            value={peduncleHooks}
                            setValue={setPeduncleHooks}
                        />

                        <h5 className={styles.moreFeaturesHeader}>Bothridial Hook Features (select all that apply)</h5>
                        <ChecklistPillSelector 
                            inputDict={{
                                        'one hook pair':'1_hook_pair', 
                                        'two hook pairs':'2_hook_pairs',
                                        'one prongs per hook' : '1_prongs_per_hook',
                                        'two prongs per hook' : '2_prongs_per_hook',
                                        'three prong per hook' : '3_prongs_per_hook',
                                        'accessory piece':'accessory_piece',
                                        'prongs directed anteriorly':'prongs_directed_anteriorly'
                                    }}
                            value={hookFeatures}
                            setValue={setHookFeatures}
                        />
                    </Accordion>              
                </div>
            </div>
        </div>
    );
}

export default Filter;