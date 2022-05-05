import React, {useState} from 'react';
import '../App.css';
// import ReactDOM from 'react-dom/client';



function FilterBox() {
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(25);
    const [minTestes, setMinTestes] = useState(0);
    const [maxTestes, setMaxTestes] = useState(65);
    const [scolexFt, setScolexFt] = useState('');
    const [parasiteOf, setParasite] = useState('');
    const [hasApOrg, setHasApOrg] = useState(null);

    const handleApplyFilter = () => {
        //clear filters
        sessionStorage.clear();

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

    return (
        <div>
            <label>&#8195;Length 
                <input id='length-min' type='numeric' value={minLength} onChange={(e) => setMinLength(e.target.value)}/>
                <input id='length-max' type='numeric' value={maxLength} onChange={(e) => setMaxLength(e.target.value)}/>
            </label><br/><br/>

            <label>&#8195;Testes 
                <input id='testes-min' type='numeric' value={minTestes} onChange={(e) => setMinTestes(e.target.value)}/>
                <input id='testes-max' type='numeric' value={maxTestes} onChange={(e) => setMaxTestes(e.target.value)}/>
            </label><br/><br/>

            &#8195;Scolex Features<br/>
            &#8195;&#8195;<input id='bothria-radio' type='radio' name='scolex-feature' value='bothria' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='bothria-radio'>Bothria</label>
            &#8195;&#8195;<input id='bothridia-radio' type='radio' name='scolex-feature' value='bothridia' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='bothridia-radio'>Bothridia</label>
            &#8195;&#8195;<input id='suckers-radio' type='radio' name='scolex-feature' value='suckers' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='suckers-radio'>Suckers</label>
            &#8195;&#8195;<input id='scolex-unkown-radio' type='radio' name='scolex-feature' value='unkown' onChange={e=>setScolexFt(e.target.value)}/><label htmlFor='scolex-unkown-radio'>Unkown</label>
            <br/><br/>

            &#8195;Parasite of...<br/>
            &#8195;&#8195;<input id='stingrays-radio' type='radio' name='parasite-of' value='stingrays' onChange={e=>setParasite(e.target.value)}/><label htmlFor='stingrays-radio'>Stingrays</label>
            &#8195;&#8195;<input id='eagle-rays-radio' type='radio' name='parasite-of' value='eagle-rays' onChange={e=>setParasite(e.target.value)}/><label htmlFor='eagle-rays-radio'>Eagle Rays</label>
            &#8195;&#8195;<input id='sharks-radio' type='radio' name='parasite-of' value='sharks' onChange={e=>setParasite(e.target.value)}/><label htmlFor='sharks-radio'>Sharks</label>
            &#8195;&#8195;<input id='parasite-unkown-radio' type='radio' name='parasite-of' value='unkown' onChange={e=>setParasite(e.target.value)}/><label htmlFor='parasite-unkown-radio'>Unkown</label>
            <br/><br/>

            &#8195;Apical Organ<br/>
            &#8195;&#8195;<input id='has-apical-radio' type='radio' name='has-apical' value='true' onChange={e=>setHasApOrg(e.target.value)}/><label htmlFor='has-apical-radio'>Present</label>
            &#8195;&#8195;<input id='no-apical-radio' type='radio' name='has-apical' value='false' onChange={e=>setHasApOrg(e.target.value)}/><label htmlFor='no-apical-radio'>Not Present</label>
            <br/><br/>

            &#8195;<input id='apply-btn' type='button' value='Apply Filter' onClick={handleApplyFilter}/>
            &#8195;<input id='reset-btn' type='button' value='Reset Filter'/>
        </div>
    )

}

export default FilterBox;