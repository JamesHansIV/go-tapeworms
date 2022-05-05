import React from 'react';
import '../App.css';
import ReactDOM from 'react-dom/client';

class FilterBox extends React.Component {
    state = {
        minLength: 0,
        maxLength: 25,
        minTestes: 0,
        maxTestes: 65,
        minBothria: 0,
        maxBothria: 5
    }

    render() {
        return (
            <div>
                <label>&#8195;Length 
                    <input id='length-min' type='numeric' value={this.state.minLength}/>
                    <input id='length-max' type='numeric' value={this.state.maxLength}/>
                </label><br/><br/>

                <label>&#8195;Testes 
                    <input id='testes-min' type='numeric' value={this.state.minTestes}/>
                    <input id='testes-max' type='numeric' value={this.state.maxTestes}/>
                </label><br/><br/>

                &#8195;Scolex Features<br/>
                &#8195;&#8195;<input id='bothria-radio' type='radio' name='scolex-feature' value='bothria'/><label for='bothria-radio'>Bothria</label>
                &#8195;&#8195;<input id='bothridia-radio' type='radio' name='scolex-feature' value='bothridia'/><label for='bothridia-radio'>Bothridia</label>
                &#8195;&#8195;<input id='suckers-radio' type='radio' name='scolex-feature' value='suckers'/><label for='suckers-radio'>Suckers</label>
                &#8195;&#8195;<input id='scolex-unkown-radio' type='radio' name='scolex-feature' value='unkown'/><label for='scolex-unkown-radio'>Unkown</label>
                <br/><br/>

                &#8195;Parasite of...<br/>
                &#8195;&#8195;<input id='stingrays-radio' type='radio' name='parasite-of' value='stingrays'/><label for='stingrays-radio'>Stingrays</label>
                &#8195;&#8195;<input id='eagle-rays-radio' type='radio' name='parasite-of' value='eagle-rays'/><label for='eagle-rays-radio'>Eagle Rays</label>
                &#8195;&#8195;<input id='sharks-radio' type='radio' name='parasite-of' value='sharks'/><label for='sharks-radio'>Sharks</label>
                &#8195;&#8195;<input id='parasite-unkown-radio' type='radio' name='parasite-of' value='unkown'/><label for='parasite-unkown-radio'>Unkown</label>
                <br/><br/>

                &#8195;Apical Organ<br/>
                &#8195;&#8195;<input id='has-apical-radio' type='radio' name='has-apical' value='true'/><label for='has-apical-radio'>Present</label>
                &#8195;&#8195;<input id='no-apical-radio' type='radio' name='has-apical' value='false'/><label for='no-apical-radio'>Not Present</label>
                <br/><br/>

                &#8195;<input id='update-btn' type='button' value='Update Filter'/>
                &#8195;<input id='reset-btn' type='button' value='Reset Filter'/>
            </div>
            
        )
    }
    
}

export default FilterBox;