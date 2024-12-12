import React from 'react';
import './css/Button.css';

export default function Button ({ buttonText, className, val, onTextLengthChange, onClickNewSection, onClickNewBook }) {
    const handleClick = (event) => {
        event.preventDefault();
        if (event.target.className === 'length') {
            onTextLengthChange(event.target.value);
        } else if (event.target.className === 'newSection new') {
            onClickNewSection();
        } else if  (event.target.className === 'newBook new') {
            onClickNewBook();
        }
    };

    return (
        <button 
            className={className}
            onClick={handleClick}
            value={val}>
                {buttonText}
        </button>
    );
}


