import React from 'react';
import Button from './Button';
import './css/Form.css';

export default function Form ({ onTextLengthChange, onClickNewSection, onClickNewBook, textLength }) {
    return (
        <form>
            <div 
                className='buttonContainer' 
                id='newContainer'>
                    <Button 
                        buttonText={'New Book'}
                        className={'newBook new'}
                        onClickNewBook={onClickNewBook}/>
                    <Button
                        className={'newSection new'} 
                        buttonText={'New Section'}
                        onClickNewSection={onClickNewSection}/>
            </div>
            <div 
                className='buttonContainer'
                id='lengthContainer'>
                    <Button 
                        onTextLengthChange={onTextLengthChange}
                        className={textLength === "short" ? "length active" : "length"}
                        buttonText={'Short'}
                        val={'short'}/>
                    <Button
                        onTextLengthChange={onTextLengthChange} 
                        className={textLength === "medium" ? "length active" : "length"}
                        buttonText={'Medium'}
                        val={'medium'}/>
                    <Button
                        onTextLengthChange={onTextLengthChange}
                        className={textLength === "long" ? "length active" : "length"}
                        buttonText={'Long'}
                        val={'long'}/>
            </div>
        </form>
    );
}