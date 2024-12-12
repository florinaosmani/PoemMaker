import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      let [fetchText, fetchTitle, fetchAuthor] = await fetchBook();
      setBook(fetchText);
      let [firstSection, index] = editBook(fetchText, textLength);
      setSection(firstSection);
      setPrevIndex(index);
      setTitle(fetchTitle);
      setAuthor(fetchAuthor);
    }
    fetchData();
  }, [newBook]);

  const handleTextLengthChange = (newLength) => {
    setTextLength(newLength);
    let [lengthChangeSection, index] = editBook(book, newLength, prevIndex);
    setSection(lengthChangeSection);
  };

  const handleNewSection = () => {
    let [newSection, newIndex] = editBook(book, textLength);
    setSection(newSection);
    setPrevIndex(newIndex);
  }
  
  const handleNewBook = () => {
    setNewBook(prev => !prev);
  }

  const [dragText, setDragText] = useState('');

  const handleSelect = () => {
    let selection = window.getSelection();
    let startIndex = selection.getRangeAt(0).startOffset;
    let endIndex = selection.getRangeAt(0).endOffset;

    if(startIndex !== endIndex) {
      if(Array.isArray(section)) {
        setSection(prev => prev.map(item => React.isValidElement(item) ? item.props.children : item).join(''));
      }

      let sectionBeginning = section.substring(0, startIndex);
      let selectedSection = section.substring(startIndex, endIndex);
      let sectionEnd = section.substring(endIndex);
      
      setSection([
        sectionBeginning,
        <span draggable>{selectedSection}</span>,
        sectionEnd
      ]);
    }
  }
  
  handleDrag
  return (
    <div id='app'>
      <Header 
        onTextLengthChange={handleTextLengthChange}
        onClickNewSection={handleNewSection}
        onClickNewBook={handleNewBook}
        textLength={textLength}/>
        <div id='columnContainer'>
          <Column id='book'>
            <div className='authorCard padding'>
              <p>{title}</p>
              <p>{author}</p>
            </div>
            <div className='bookText padding'>
              <p
                onMouseUp={handleSelect}>
                  {section}
              </p>
            </div>
          </Column>
          <Column id='poem'>
            <div className='padding'>
              <p>I will be the poem!</p>
            </div>
          </Column>
        </div>
    </div>
  );
}

export default App;
