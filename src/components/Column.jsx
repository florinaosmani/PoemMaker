import React from 'react';
import './css/Column.css';

export default function Column ({id, children}) {
    return (
        <div
        id={id}
        className='column'>
            {children}
        </div>
    );
}
