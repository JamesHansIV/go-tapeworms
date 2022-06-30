import React, {useEffect, useState} from 'react';
import '../App.css';
// import ReactDOM from 'react-dom/client';



function FilterBox() {
    const [firstRender, setFirstRender] = useState(true);
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(25);
    const [minTestes, setMinTestes] = useState(0);
    const [maxTestes, setMaxTestes] = useState(65);
    const [scolexFt, setScolexFt] = useState('unknown');
    const [parasiteOf, setParasite] = useState('unknown');
    const [hasApOrg, setHasApOrg] = useState('null');

    const handleApplyFilter = () => {
        let filters = JSON.parse(sessionStorage.getItem('filters'));
        console.log("pushed", filters);
        storeFilters();
    }

    const storeFilters = () => {
        //convert filters to json
        const filters = {
            minLength: minLength,
            maxLength: maxLength,
            minTestes: minTestes,
            maxTestes: maxTestes,
            scolexFt: scolexFt,
            parasiteOf: parasiteOf,
            hasApOrg: hasApOrg
        }

        //submit filters to session storage
        sessionStorage.setItem('filters',JSON.stringify(filters));
    }

    const resetFilters = () => {
        setMinLength(0); setMaxLength(25);
        setMinTestes(0); setMaxTestes(65);
        setScolexFt('unknown'); setParasite('unknown'); setHasApOrg('null');
        storeFilters(); //store the reset filters

        //reset buttons
        let btns = document.getElementsByTagName('input'); 
        console.log(btns.length);
        for(let i = 0; i < btns.length; i++) {
            if(btns[i].type == 'radio' && btns[i].checked) btns[i].checked = false;
        }
    }


    useEffect(() => {
        storeFilters();
    }, [minLength,maxLength,minTestes,maxTestes,scolexFt,parasiteOf,hasApOrg]);

    return (
        <div className='filter-box'>
            <div className='filter-container'>
                <h3>FILTERS</h3>
            </div>
            <br/>
            <div className='filter-container'>
                <h3>Scolex</h3>
                <h4>Apical Organ</h4>
            </div>

            <div className='filter-container'>
                <h3>Body</h3>

            </div>

            {/* <label>&#8195;Length 
                <input id='length-min' type='numeric' value={minLength} onChange={(e) => setMinLength(e.target.value)}/>
                <input id='length-max' type='numeric' value={maxLength} onChange={(e) => setMaxLength(e.target.value)}/>
            </label><br/><br/>

            <label>&#8195;Testes 
                <input id='testes-min' type='numeric' value={minTestes} onChange={(e) => setMinTestes(e.target.value)}/>
                <input id='testes-max' type='numeric' value={maxTestes} onChange={(e) => setMaxTestes(e.target.value)}/>
            </label><br/><br/>

            &#8195;Scolex Features<br/>
            &#8195;&#8195;<input id='bothria-radio' type='radio' name='scolex-feature' value='bothria'onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='bothria-radio'>Bothria</label>
            &#8195;&#8195;<input id='bothridia-radio' type='radio' name='scolex-feature' value='bothridia' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='bothridia-radio'>Bothridia</label>
            &#8195;&#8195;<input id='suckers-radio' type='radio' name='scolex-feature' value='suckers' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='suckers-radio'>Suckers</label>
            &#8195;&#8195;<input id='scolex-unkown-radio' type='radio' name='scolex-feature' value='unknown' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='scolex-unkown-radio'>Unkown</label>
            <br/><br/>

            &#8195;Parasite of...<br/>
            &#8195;&#8195;<input id='stingrays-radio' type='radio' name='parasite-of' value='stingrays' onChange={e=>setParasite(e.target.value)}/><label htmlFor='stingrays-radio'>Stingrays</label>
            &#8195;&#8195;<input id='eagle-rays-radio' type='radio' name='parasite-of' value='eagle-rays' onChange={e=>setParasite(e.target.value)}/><label htmlFor='eagle-rays-radio'>Eagle Rays</label>
            &#8195;&#8195;<input id='sharks-radio' type='radio' name='parasite-of' value='sharks' onChange={e=>setParasite(e.target.value)}/><label htmlFor='sharks-radio'>Sharks</label>
            &#8195;&#8195;<input id='parasite-unkown-radio' type='radio' name='parasite-of' value='unknown' onChange={e=>setParasite(e.target.value)}/><label htmlFor='parasite-unkown-radio'>Unkown</label>
            <br/><br/>

            &#8195;Apical Organ<br/>
            &#8195;&#8195;<input id='has-apical-radio' type='radio' name='has-apical' value='true' onChange={e=>setHasApOrg(e.target.value)}/><label htmlFor='has-apical-radio'>Present</label>
            &#8195;&#8195;<input id='no-apical-radio' type='radio' name='has-apical' value='false' onChange={e=>setHasApOrg(e.target.value)}/><label htmlFor='no-apical-radio'>Not Present</label>
            &#8195;&#8195;<input id='unknown-apical-radio' type='radio' name='has-apical' value='null' onChange={e=>setHasApOrg(e.target.value)}/><label htmlFor='no-apical-radio'>Unknown</label>
            <br/><br/>

            &#8195;<input id='apply-btn' type='button' value='Apply Filter' onClick={handleApplyFilter}/>
            &#8195;<input id='reset-btn' type='button' value='Reset Filter' onClick={resetFilters}/> */}

            {/* <script {...storeFilters()}/> */}
        </div>
        
    )

}

export default FilterBox;