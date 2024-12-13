import fetchBook from "./fetchBook.js";

//set length from short to long
function setLength (len) {
    let textLength;
    switch (len) {
        case 'short':
            textLength = 500;
            break;
        case 'medium' :
            textLength = 700;
            break;
        case 'long':
            textLength = 900;
            break;
        }
    return textLength;
}

/* takes the book and the length and makes a substring starting at a random
character, then looks for the first and last ' ' space within that substring
and then finally returns a substring starting and ending with a space */

function editBook (book, len, prevIndex) {
    let textLength = setLength(len);
    let startIndex;

    //the added 10000 is so hopefully no chapter indexes will be included
    /* added if clause if there's a prevIndex so you don't get a new section every time */
    if (!prevIndex) {
        startIndex = Math.floor(Math.random() * book.length) + 10000;
    } else {
        startIndex = prevIndex;
    }
    
    /*making sure the end is 5000 characters away from the actual end of the book
    just to be safe in case there's books with indexes or stuff at the end */
    if((startIndex + textLength) > (book.length - 5000)) {
        startIndex =- 5000;
    }

    let subBook = book.substring(startIndex, (startIndex + textLength));
    let lastSpaceIndex = subBook.lastIndexOf(' ');
    let firstSpaceIndex = subBook.indexOf(' ');
    let subBookWholeWords = subBook.substring(firstSpaceIndex, lastSpaceIndex).trim();

    return [subBookWholeWords, startIndex];
}

export default editBook;
