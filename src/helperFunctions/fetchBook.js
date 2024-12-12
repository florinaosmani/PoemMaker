import bookData from "./cleanData.js";

const fetchBook = async () => {
    let randIndex = Math.floor(Math.random() * bookData.length);
    let id = bookData[randIndex].id;

    try {
        const response = await fetch(`https://corsproxy.io/?url=https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`);
        if(response.ok) {
            let text = await response.text();
            let arr = text.split(/\*\*\*.*?\*\*\*/);
            let normalizedText = arr[1].replace(/\r\n|\r|\n/g, '\n');
            let removeChapterText = normalizedText.replace(/\bchapter\b\s+([0-9]+|[IVXLCDM]+)/gi, '');
            return [removeChapterText, bookData[randIndex].title, bookData[randIndex].authors[0].name];
        }
        throw new Error("Couldn't fetch the book");
    } catch (e) {
        console.log(e);
    }
}

export default fetchBook;