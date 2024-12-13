import React, { useState} from 'react';
import './css/Header.css';
import Collapse from './Collapse';
import Form from './Form';


export default function Header ({ onTextLengthChange, onClickNewSection, onClickNewBook, textLength, onClickReset }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = (event) => {
        event.preventDefault();
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <header>
            <Collapse 
                title='Settings'
                isOpen={isOpen}
                onClick={handleClick}>
                    <Form 
                        onTextLengthChange={onTextLengthChange}
                        onClickNewSection={onClickNewSection}
                        onClickNewBook={onClickNewBook}
                        onClickReset={onClickReset}
                        textLength={textLength}/>
            </Collapse>
            <Collapse 
                title='Instructions'
                isOpen={isOpen}
                onClick={handleClick}>
                    <ul id='instructions'>
                        <li>Click 'New Book' or 'New Section' if you're not happy with the current text selection</li>
                        <li>Set the text length from short to long</li>
                        <li>Click and drag into the right field</li>
                        <li>Enjoy writing your poem!</li>
                    </ul>
            </Collapse>
        </header>
    );
}

/* no idea why but using onToggle which is the actual eventlistener
the <details> tag uses didn't work.
also needed the event.preventDefault() so the content would
render correctly */