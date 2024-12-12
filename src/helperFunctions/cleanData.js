/* book data copied from gutendex.com using this query:
/books/?author_year_end=1900&copyright=false&languages=en&mime_type=text%2Fplain&topic=fiction */

import data from '../assets/bookData.json' assert { type: 'json'};

/* map through the results array and with destructuring only return the
values im interested in */

const bookData = data.results.map(({ id, title, authors }) => {
    return {
        id: id,
        title: title,
        authors: authors.map(({ name }) => ({ name }))
    }
});

export default bookData;