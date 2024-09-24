import React, {useEffect, useState} from 'react';
import styles from './suggestion-text-box.module.css';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./suggestion-text-box.module.css"

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
        <div className={styles.wrapper}>
        {/* <h5>{heading}</h5> */}
        <DropdownList
            data ={options.sort()}
            value={selected}
            onChange={handleDropdownChange}
        />
      </div>
    )
}

