import React, {useEffect, useState, useRef } from 'react';

import styles from './filter.module.css';
import Accordion from './accordion';
import RadioPillSelector from './radio-pill-selector';
import ChecklistPillSelector from './checklist-pill-selector';
import DetailedFeatureSelection from './detailed-feature-selection';
import ScrollToTopButton from './scroll-to-top-button';
import { SuggestionTextBox } from './suggestion-text-box';


function Filter (props) {
const scrollTargetRef = useRef();

const [getMeCloseVisible, setGetMeCloseVisible] = useState(true);
const [topModalZ, setTopModalZ] = useState(99999);

const [scolex, setScolex] = useState(null);
const [apical_organ, setApical_organ] = useState(null);
const [tentacles, setTentacles] = useState(null);
const [hooks, setHooks] = useState(null);
const [scolex_attachment_structures, setScolex_attachment_structures] = useState(null);
const [proglottid_margins, setProglottid_margins] = useState(null);
const [laciniations, setLaciniations] = useState(null);
const [genital_pore_position, setGenital_pore_position] = useState(null);
const [vagina_opening, setVagina_opening] = useState(null);
const [single_column_of_testes, setSingle_column_of_testes] = useState(null);
const [post_poral_testes, setPost_poral_testes] = useState(null);
const [anterior_extent_of_uterus, setAnterior_extent_of_uterus] = useState(null);
const [vitelline_follicle_arrangement, setVitelline_follicle_arrangement] = useState(null);
const [apolysis, setApolysis] = useState(null);
const [wide_anterior_strobila, setWide_anterior_strobila] = useState(null);
const [host_group, setHost_group] = useState(null);
const [order, setOrder] = useState(null);
const [host_family, setHost_family] = useState(null);
const [bothridial_features, setBothridial_features] = useState([]);
const [apical_bothridial_region, setApical_bothridial_region] = useState([]);
const [hook_placement, setHook_placement] = useState([]);
const [hook_features, setHook_features] = useState([]);

const [orderData, setOrderData] = useState([]);
const [host_familyData, setHost_familyData] = useState([]);

const getOrderData = async() => {
const response = await fetch(`https://api.tapeworms-unlocked.info/orders`);
const data = await response.json()
let arr  = []
for(let d of data){
arr.push(d.order)
}
setOrderData(arr)
}

const getHost_familyData = async() => {
const response = await fetch(`https://api.tapeworms-unlocked.info/host_families`);
const data = await response.json()
let arr  = []
for(let d of data){
arr.push(d.host_family)
}
setHost_familyData(arr)
}


const buildQuery = () => {
let query = {
'scolex' : scolex,
'apical_organ' : apical_organ,
'tentacles' : tentacles,
'hooks' : hooks,
'scolex_attachment_structures' : scolex_attachment_structures,
'proglottid_margins' : proglottid_margins,
'laciniations' : laciniations,
'genital_pore_position' : genital_pore_position,
'vagina_opening' : vagina_opening,
'single_column_of_testes' : single_column_of_testes,
'post_poral_testes' : post_poral_testes,
'anterior_extent_of_uterus' : anterior_extent_of_uterus,
'vitelline_follicle_arrangement' : vitelline_follicle_arrangement,
'apolysis' : apolysis,
'wide_anterior_strobila' : wide_anterior_strobila,
'host_group' : host_group,
'order' : order,
'host_family' : host_family,
'bothridial_features' : bothridial_features,
'apical_bothridial_region' : apical_bothridial_region,
'hook_placement' : hook_placement,
'hook_features' : hook_features,
};

for (let p in query) {
if (query[p] === null || query[p].length === 0)
delete query[p];
}
let params = new URLSearchParams(query);
props.setFilters(params.toString());
}

const scrollToTop = () => scrollTargetRef.current.scrollIntoView({behavior: 'smooth',block:'start'});
const clearFilters = () => {
setScolex(null);
setApical_organ(null);
setTentacles(null);
setHooks(null);
setScolex_attachment_structures(null);
setProglottid_margins(null);
setLaciniations(null);
setGenital_pore_position(null);
setVagina_opening(null);
setSingle_column_of_testes(null);
setPost_poral_testes(null);
setAnterior_extent_of_uterus(null);
setVitelline_follicle_arrangement(null);
setApolysis(null);
setWide_anterior_strobila(null);
setHost_group(null);
setOrder(null);
setHost_family(null);
setBothridial_features([]);
setApical_bothridial_region([]);
setHook_placement([]);
setHook_features([]);
}

// ON EVERY RENDER
useEffect(() => {
buildQuery();
});
//ON INITIAL RENDER
useEffect(() => {
getOrderData();
getHost_familyData();
},[]);


return(
<div className={styles.container} id={"filtercontainer"}>
<div className={styles.scrollableWrapper}>
<span className={styles.icons}>
<ScrollToTopButton onClick={scrollToTop}/>
</span>
<span ref={scrollTargetRef}>
<span className={styles.headingButtonContainter}> 
<h2>Get Me Close</h2>
<button className={styles.clearFiltersButton} onClick={clearFilters}>Clear Filters</button>
</span>
</span>
<Accordion header={'Scolex Features'} openInitially={true}>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'scolex present':'present', 'scolex absent':'absent'}}
value={scolex}
setValue={setScolex}

/>
<DetailedFeatureSelection
inputDict={{'scolex present':'present', 'scolex absent':'absent'}}
value={scolex}
setValue={setScolex}
featureName={'scolex'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'apical organ present':'present', 'apical organ absent':'absent'}}
value={apical_organ}
setValue={setApical_organ}

/>
<DetailedFeatureSelection
inputDict={{'apical organ present':'present', 'apical organ absent':'absent'}}
value={apical_organ}
setValue={setApical_organ}
featureName={'apical_organ'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'tentacles present':'present', 'tentacles absent':'absent'}}
value={tentacles}
setValue={setTentacles}

/>
<DetailedFeatureSelection
inputDict={{'tentacles present':'present', 'tentacles absent':'absent'}}
value={tentacles}
setValue={setTentacles}
featureName={'tentacles'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'hooks present':'present', 'hooks absent':'absent'}}
value={hooks}
setValue={setHooks}

/>
<DetailedFeatureSelection
inputDict={{'hooks present':'present', 'hooks absent':'absent'}}
value={hooks}
setValue={setHooks}
featureName={'hooks'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolex_attachment_structures}
setValue={setScolex_attachment_structures}

/>
<DetailedFeatureSelection
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolex_attachment_structures}
setValue={setScolex_attachment_structures}
featureName={'scolex_attachment_structures'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion><Accordion header={'Proglottid Features'} openInitially={true}>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'craspedote':'craspedote', 'acraspedote':'acraspedote'}}
value={proglottid_margins}
setValue={setProglottid_margins}

/>
<DetailedFeatureSelection
inputDict={{'craspedote':'craspedote', 'acraspedote':'acraspedote'}}
value={proglottid_margins}
setValue={setProglottid_margins}
featureName={'proglottid_margins'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'laciniations present':'present', 'laciniations absent':'absent'}}
value={laciniations}
setValue={setLaciniations}

/>
<DetailedFeatureSelection
inputDict={{'laciniations present':'present', 'laciniations absent':'absent'}}
value={laciniations}
setValue={setLaciniations}
featureName={'laciniations'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'GPP lateral sublateral':'lateral_sublateral', 'GPP dorsal ventral':'dorsal_ventral'}}
value={genital_pore_position}
setValue={setGenital_pore_position}
abbreviation={{'GPP' : 'Genital Pore Position'}}

/>
<DetailedFeatureSelection
inputDict={{'GPP lateral sublateral':'lateral_sublateral', 'GPP dorsal ventral':'dorsal_ventral'}}
value={genital_pore_position}
setValue={setGenital_pore_position}
featureName={'genital_pore_position'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'vagina anterior to CS':'anterior_to_cs', 'vagina posterior to CS':'posterior_to_cs'}}
value={vagina_opening}
setValue={setVagina_opening}
abbreviation={{'CS' : 'Cirrus sac'}}

/>
<DetailedFeatureSelection
inputDict={{'vagina anterior to CS':'anterior_to_cs', 'vagina posterior to CS':'posterior_to_cs'}}
value={vagina_opening}
setValue={setVagina_opening}
featureName={'vagina_opening'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'1 column of testes':'present', '>1 column of testes':'absent'}}
value={single_column_of_testes}
setValue={setSingle_column_of_testes}

/>
<DetailedFeatureSelection
inputDict={{'1 column of testes':'present', '>1 column of testes':'absent'}}
value={single_column_of_testes}
setValue={setSingle_column_of_testes}
featureName={'single_column_of_testes'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'post-poral testes':'present', 'no post-poral testes':'absent'}}
value={post_poral_testes}
setValue={setPost_poral_testes}

/>
<DetailedFeatureSelection
inputDict={{'post-poral testes':'present', 'no post-poral testes':'absent'}}
value={post_poral_testes}
setValue={setPost_poral_testes}
featureName={'post_poral_testes'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'uterus extends to GP':'to_pore', 'uterus extends beyond GP':'beyond'}}
value={anterior_extent_of_uterus}
setValue={setAnterior_extent_of_uterus}
abbreviation={{'GP' : 'Genital Pore'}}

/>
<DetailedFeatureSelection
inputDict={{'uterus extends to GP':'to_pore', 'uterus extends beyond GP':'beyond'}}
value={anterior_extent_of_uterus}
setValue={setAnterior_extent_of_uterus}
featureName={'anterior_extent_of_uterus'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'circumsegmental VFA':'circumsegmental', 'lateral VFA':'lateral', 'other VFA':'other'}}
value={vitelline_follicle_arrangement}
setValue={setVitelline_follicle_arrangement}
abbreviation={{'VFA' : 'Vitelline Follicle Arrangement'}}

/>
<DetailedFeatureSelection
inputDict={{'circumsegmental VFA':'circumsegmental', 'lateral VFA':'lateral', 'other VFA':'other'}}
value={vitelline_follicle_arrangement}
setValue={setVitelline_follicle_arrangement}
featureName={'vitelline_follicle_arrangement'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion><Accordion header={'Strobilar Features'} openInitially={true}>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'hyperapolytic':'hyperapolytic', 'euapolytic':'euapolytic', 'apolytic':'apolytic'}}
value={apolysis}
setValue={setApolysis}

/>
<DetailedFeatureSelection
inputDict={{'hyperapolytic':'hyperapolytic', 'euapolytic':'euapolytic', 'apolytic':'apolytic'}}
value={apolysis}
setValue={setApolysis}
featureName={'apolysis'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'wide anterior strobila':'present', 'narrow anterior strobila':'absent'}}
value={wide_anterior_strobila}
setValue={setWide_anterior_strobila}

/>
<DetailedFeatureSelection
inputDict={{'wide anterior strobila':'present', 'narrow anterior strobila':'absent'}}
value={wide_anterior_strobila}
setValue={setWide_anterior_strobila}
featureName={'wide_anterior_strobila'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion><Accordion header={'Host Information'} openInitially={true}>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'batoids':'batoids', 'ratfishes':'ratfishes', 'sharks':'sharks'}}
value={host_group}
setValue={setHost_group}

/>
<DetailedFeatureSelection
inputDict={{'batoids':'batoids', 'ratfishes':'ratfishes', 'sharks':'sharks'}}
value={host_group}
setValue={setHost_group}
featureName={'host_group'}
hintPanelType={'tall'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion>

<br/><h2 className={styles.subtitle}>More Features</h2>
<Accordion header={'Specimen Order'} openInitially={false}>
<h5 className={styles.moreFeaturesHeader}>Order</h5>
<SuggestionTextBox
options={orderData}
value={order}
setValue={setOrder}
/></Accordion><Accordion header={'More Host Information'} openInitially={false}>
<h5 className={styles.moreFeaturesHeader}>Host Family</h5>
<SuggestionTextBox
options={host_familyData}
value={host_family}
setValue={setHost_family}
/></Accordion><Accordion header={'More Scolex Features'} openInitially={false}>
<h5 className={styles.moreFeaturesHeader}>Bothridial Features (select all that apply)</h5>
<ChecklistPillSelector
inputDict={{'uniloculated':'uniloculated', '2 loculi':'2_loculi', '3 loculi':'3_loculi', '4 loculi':'4_loculi', '5 loculi':'5_loculi', '6 loculi':'6_loculi', 'numerous loculi':'numerous_loculi', 'marginal loculi':'marginal_loculi', 'subloculi':'subloculi', 'stalks':'stalks', 'pedicles':'pedicles', 'bifid':'bifid', 'central circular muscle bands':'central_circular_muscle_bands', 'folded':'folded', 'pouch':'pouch'}}
value={bothridial_features}
setValue={setBothridial_features}
hasHints={true}
hintPanelType={'short'}
featureName={'bothridial_features'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
<h5 className={styles.moreFeaturesHeader}>Apical Bothridial Region (select all that apply)</h5>
<ChecklistPillSelector
inputDict={{'apical sucker':'apical_sucker', 'muscular pad':'muscular_pad', 'apical loculus':'apical_loculus'}}
value={apical_bothridial_region}
setValue={setApical_bothridial_region}
hasHints={true}
hintPanelType={'tall'}
featureName={'apical_bothridial_region'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
<h5 className={styles.moreFeaturesHeader}>Hook Placement (select all that apply)</h5>
<ChecklistPillSelector
inputDict={{'tentacle hooks':'tentacle_hooks', 'bothridial hooks':'bothridial_hooks', 'bothrial hooks':'bothrial_hooks', 'peduncle hooks':'peduncle_hooks'}}
value={hook_placement}
setValue={setHook_placement}
hasHints={true}
hintPanelType={'tall'}
featureName={'hook_placement'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
<h5 className={styles.moreFeaturesHeader}>Hook Features (select all that apply)</h5>
<ChecklistPillSelector
inputDict={{'accessory piece':'accessory_piece', '1 hook pair':'1_hook_pair', '2 hook pairs':'2_hook_pairs', '1 prong per hook':'1_prong_per_hook', '2 prongs per hook':'2_prongs_per_hook', '3 prongs per hook':'3_prongs_per_hook', 'prongs directed anteriorly':'prongs_directed_anteriorly', 'yellow hooks':'yellow_hooks'}}
value={hook_features}
setValue={setHook_features}
hasHints={true}
hintPanelType={'short'}
featureName={'hook_features'}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</Accordion>
<div style={{height:'225px'}}/>
</div>
</div>
);
}

export default Filter;