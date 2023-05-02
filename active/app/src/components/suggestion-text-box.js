import React, {useState} from 'react';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./suggestion-text-box.css"

export const SuggestionTextBox = (props) => {
    const options = ['----None----', ...props.options];
    const heading = props.heading
    const [selected, setSelected] = useState(null);

    const handleDropdownChange = (value) => {
        if(value == '----None----'){
            setSelected(null);
            props.setValue(null);
        } else {
            setSelected(value);
            props.setValue(value);
        }
    }

    return (
        <div>
        <h4>{heading}</h4>
        <DropdownList
            data ={options}
            value={selected}
            onChange={handleDropdownChange}
        />
      </div>
    )
}

