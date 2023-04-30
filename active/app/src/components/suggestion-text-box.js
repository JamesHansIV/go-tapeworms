import React, {useState} from 'react';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

export const SuggestionTextBox = (props) => {
    const options = props.options
    const heading = props.heading
    const [selected, setSelected] = useState(null);

    const handleDropdownChange = (value) => {
        setSelected(value);
    }

    return (
        <div>
        <h3>{heading}</h3>
        <DropdownList
            defaultValue="Select a host genera"
            data ={options}
            value={selected}
            onChange={handleDropdownChange}
        />
      </div>
    )
}

