import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';
import './App.css';
import Column from './components/Column';
import Header from './components/Header';
import fetchBook from './helperFunctions/fetchBook';
import editBook from './helperFunctions/editBook';


function App() {
  /*all this is needed for first mount i think? */
  const [book, setBook] = useState('');
  const [section, setSection] = useState('');
  const [title, setTitle] = useState ('');
  const [author, setAuthor] = useState ('');
  const [prevIndex, setPrevIndex] = useState(null);
  const [textLength, setTextLength] = useState('short');
  /* idk dont even ask? making a bool for the newBook button so i can reuse the useEffect */
  const [newBook, setNewBook] = useState(true);
  
  /*turning the text into array cos i have no idea how else to do the drag stuff later
  and the shit i tried before made me want to cry */

 /*  const turnToArraySpan = (text) => {
    const arr = text.split(' ');
    const arrWithSpan = arr.map((item, i)=> <span draggable='true' key={i}>{item + ' '}</span>);
    return arrWithSpan;
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const [fetchText, fetchTitle, fetchAuthor] = await fetchBook();
      setBook(fetchText);
      const [firstSection, index] = editBook(fetchText, textLength);
      setSection(firstSection);
      setPrevIndex(index);
      setTitle(fetchTitle);
      setAuthor(fetchAuthor);
    }
    fetchData();
  }, [newBook]);

  const handleNewBook = () => {
    if(poem.length !== 0) {
      alert("oopsie! that's cheating :(! either stick to one book or reset to get a new one!")
    } else {
      setNewBook(prev => !prev);
    }
  };

  const handleNewSection = () => {
    if (poem.length !== 0) {
      alert("oopsie! that's cheating :(! either stick to one section or reset to get a new one!")
    } else {
      const [newSection, newIndex] = editBook(book, textLength);
      setSection(newSection);
      setPrevIndex(newIndex);
    }
  };

  const handleTextLengthChange = (newLength) => {
    setTextLength(newLength);
    const lengthChangeSection = editBook(book, newLength, prevIndex)[0];
    setSection(lengthChangeSection);
  };

  const handleOnDragStart = (event) => {
    const draggedElement = event.target.textContent;
    const index = event.target.className.toString();
    
    event.dataTransfer.setData('elementText', draggedElement);
    event.dataTransfer.setData('indexText', index)
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [poem, setPoem] = useState([]); //every 'element' is an array of the text and the x and y position

  const handleOnDrop = (event) => {
    const draggedElement = event.dataTransfer.getData('elementText');
    const index = event.dataTransfer.getData('indexText');
    const poemDiv = document.getElementById('poemDiv');

    //to have them absolute position to the div not the whole page
    const whatever = poemDiv.getBoundingClientRect();
    const x = whatever.x;
    const y = whatever.y;
    //get either 0 or 41.364 or 82.728 or so on so they can be on a line?
    //actually i did 50 cos i want space inbetween?
   

    const xPosition = event.clientX - x;
    const yPos = event.clientY - y;
    const yPosition = Math.floor(yPos / 50) * 50;


    if(poem.some(arr => arr[3] === index)) {
      const elementsIndex = poem.findIndex(arr => arr[3] === index);
      const elementArr = [draggedElement, xPosition, yPosition, index];
      setPoem(prev => {
        const updatedArr = [...prev];
        updatedArr[elementsIndex] = elementArr;
        return updatedArr;
      });
    } else {
      const elementArr = [draggedElement, xPosition, yPosition, index];
      setPoem(prev => [...prev, elementArr]);
    }
  };

  const handleReset = () => {
    setPoem([]);
  };

  const handleOnDropRemove = (event) => {
    const index = event.dataTransfer.getData('indexText');

    if(poem.some(arr => arr[3] === index)) {
      const elementsIndex = poem.findIndex(arr => arr[3] === index);
      setPoem(prev => {
        const updatedArr = [...prev];
        updatedArr.splice(elementsIndex, 1);
        return updatedArr;
      });
    }
  }

  return (
    <div id='app'>
      <Header 
        onTextLengthChange={handleTextLengthChange}
        onClickNewSection={handleNewSection}
        onClickNewBook={handleNewBook}
        onClickReset={handleReset}
        textLength={textLength}/>
        <div id='columnContainer'>
          <Column id='book'>
            <div className='authorCard padding'>
              <p>{title}</p>
              <p>{author}</p>
            </div>
            <div 
              className='bookText padding'>
                {section.split(/([\s\-_—,.;:"()!?“”']+)/).map((item, i)=> <span 
                                                              draggable='true' 
                                                              key={`book_${i}`}
                                                              className={i}
                                                              onDragStart={handleOnDragStart}>
                                                                {item + ' '}
                                                            </span>)}
            </div>
          </Column>
          <div
              id='removeText'
              onDrop={handleOnDropRemove}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              >
                <p>Remove Text here!</p>
            </div>
          <Column id='poem'>
            <div
              className='poemtext'
              id='poemDiv'
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleOnDrop}>
                {poem.map((item, i) => <span
                                            draggable='true'
                                            key={`poem_${i}`}
                                            onDragStart={handleOnDragStart}
                                            className={item[3]}
                                            style={{
                                              position: 'absolute',
                                              top: `${item[2]}px`,
                                              left: `${item[1]}px`
                                            }}>
                                              {item[0]}
                                            </span>
                )}
            </div>
          </Column>
        </div>
    </div>
  );
}

export default App;
