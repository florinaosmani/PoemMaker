import React from 'react';
import './css/Button.css';

export default function Button ({ buttonText, className, val, onTextLengthChange, onClickNewSection, onClickNewBook, onClickReset }) {
    const handleClick = (event) => {
        event.preventDefault();
        if (event.target.className === 'length') {
            onTextLengthChange(event.target.value);
        } else if (event.target.className === 'newSection new') {
            onClickNewSection();
        } else if  (event.target.className === 'newBook new') {
            onClickNewBook();
        } else if (event.target.className === 'reset') {
            onClickReset();
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


