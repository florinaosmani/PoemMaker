import React from 'react';
import './css/Collapse.css';

export default function Collapse ({ title, children, isOpen, onClick }) {
        return (
            <details
                {...(isOpen ? {open: true} : {})}>
                    <summary
                        onClick={onClick}>
                            {title}
                    </summary>
                    {children}
            </details>
        );
}

/*spread operator "copies" values and spreads them another element
within JSX useful to dynamically add attributes.
even though open as an attribute doesn't take true or false
values, within JSX it's needed so it knows its a valid attribute
not just a variable*/