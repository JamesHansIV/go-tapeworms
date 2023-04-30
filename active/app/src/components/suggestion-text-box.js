import React, {useState} from 'react';
import './suggestion-text-box.css'

export const SuggestionTextBox = (props) => {
    const options = props.options
    const heading = props.heading
    const [value, setValue] = useState("");
    const [showOptions, setShowOptions] = useState(false)
    const [suggestions, setSuggestions]= useState([])

    const handleTextChange = (e) => {
        const current_text = e.target.value;
        setValue(current_text)
        setShowOptions(current_text.length > 0 ? true : false)
        setSuggestions(
            options.filter((option) => option.toLowerCase().includes(current_text.toLowerCase()))
        )
    }

    const handleSelectSuggestion = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
    };

    return (
        <>
        <div className='body'>
            <label className='label-heading'>{heading}</label><br/>
            <input type = "text" value = {value} onChange={handleTextChange}/>
            {showSuggestions && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
                        {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    )
}

