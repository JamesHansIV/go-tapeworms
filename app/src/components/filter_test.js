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

const [testSuggestionFeature, setTestSuggestionFeature] = useState(null);
const [scolexPresent, setScolexPresent] = useState(null);
const [scolexAttachmentStructures, setScolexAttachmentStructures] = useState(null);
const [hostFamily, setHostFamily] = useState(null);

const [testSuggestionFeatureData, setTestSuggestionFeatureData] = useState([]);
const [hostFamilyData, setHostFamilyData] = useState([]);

const getTestSuggestionFeatureData = async() => {
const response = await fetch(`https://api.tapeworms-unlocked.info/test_endpoint`);
const data = await response.json()
let arr  = []
for(let d of data){
arr.push(d.data)
}
setTestSuggestionFeatureData(arr)
}

const getHostFamilyData = async() => {
const response = await fetch(`https://api.tapeworms-unlocked.info/host_families`);
const data = await response.json()
let arr  = []
for(let d of data){
arr.push(d.host_family)
}
setHostFamilyData(arr)
}


const buildQuery = () => {
let query = {
'test_suggestion_feature' : testSuggestionFeature,
'scolex_present' : scolexPresent,
'scolex_attachment_structures' : scolexAttachmentStructures,
'host_family' : hostFamily,
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
setTestSuggestionFeature(null);
setScolexPresent(null);
setScolexAttachmentStructures(null);
setHostFamily(null);
}

// ON RENDER
buildQuery();
useEffect(() => {
getTestSuggestionFeatureData();
getHostFamilyData();
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
<SuggestionTextBox
options={testSuggestionFeatureData}
value={testSuggestionFeature}
setValue={setTestSuggestionFeature}
/>
<Accordion header={'Scolex Features'} openInitially={false} divider>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'scolex present':'present', 'scolex absent':'absent'}}
value={scolexPresent}
setValue={setScolexPresent}
/>
<DetailedFeatureSelection
inputDict={{'scolex present':'present', 'scolex absent':'absent'}}
value={scolexPresent}
setValue={setScolexPresent}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
/>
<DetailedFeatureSelection
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion>

<br/><h2 className={styles.subtitle}>more features</h2>
<Accordion header={'More Host Information'} openInitially={false}>
<SuggestionTextBox
options={hostFamilyData}
value={hostFamily}
setValue={setHostFamily}
/>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
/>
<DetailedFeatureSelection
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
<div style={{display:'flex', height:'100%'}}>
<RadioPillSelector
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
/>
<DetailedFeatureSelection
inputDict={{'bothria':'bothria', 'bothridia':'bothridia', 'suckers':'suckers', 'other':'other'}}
value={scolexAttachmentStructures}
setValue={setScolexAttachmentStructures}
topModalZ={topModalZ}
setTopModalZ={setTopModalZ}
browser={props.browser}
/>
</div>
</Accordion>
</div>
</div>
);
}

export default Filter;