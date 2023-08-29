const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const readStatusInput = document.getElementById('readStatus');
const bookList = document.getElementById('bookList');
function Book(title,author,yearPublished,readStatus){
    this.author=author
    this.title=title
    this.readStatus=readStatus
    this.yearPublished=yearPublished

    this.getSummary=function(){
        return this.title+' by '+this.author+'.\nPublished on '+this.yearPublished
    }

    this.toggleReadStatus=function(){
        this.readStatus=!this.readStatus
    }
}
//array to store book objects
const library=[]

function displayBooks() {
    bookList.innerHTML = '';
    library.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = book.title;
        
        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        
        const yearElement = document.createElement('p');
        yearElement.textContent = `Year Published: ${book.yearPublished}`;
        
        const readStatusElement = document.createElement('p');
        readStatusElement.textContent = `Read: ${book.readStatus ? 'Yes' : 'No'}`;
        
        const summaryElement = document.createElement('p');
        summaryElement.textContent = book.getSummary();
        
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(yearElement);
        bookCard.appendChild(readStatusElement);
        bookCard.appendChild(summaryElement);
        
        bookList.appendChild(bookCard);
    });
}

function addBookToLibrary() {
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    const readStatus = readStatusInput.checked;

    if (title && author && year) {
        const newBook = new Book(title, author, year, readStatus);
        addBook(newBook);
        clearInputs();
    }
}
function addBook(book) {
    library.push(book);
    displayBooks()
}

function removeLastBook() {
    library.pop();
    displayBooks()
}

function addBookToFront(book) {
    library.unshift(book);
    displayBooks()
}

function removeFirstBook() {
    library.shift();
    displayBooks()
}

function displayBooksByAuthor() {
    const author = authorFilter.value;
    const results = getBooksByAuthor(author);
    displayFilterResults(results);
}

function displayBooksPublishedBefore() {
    const year = parseInt(yearFilter.value);
    const results = getTotalBooksPublishedBefore(year);
    displayFilterResults([`Total books published before ${year}: ${results}`]);
}

function displayBooksByReadStatus() {
    const status = readStatusFilter.checked;
    const statusString = status ? 'read' : 'unread';
    const results = getBooksByReadStatus(status);
    displayFilterResults([`Books marked as ${statusString}: ${results.length}`]);
}

function displayFilterResults(results) {
    const filterResultsElement = document.getElementById('filterResults');
    filterResultsElement.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.textContent = result;
            filterResultsElement.appendChild(resultElement);
        });
    } else {
        const noResultsElement = document.createElement('p');
        noResultsElement.textContent = 'No results match the criteria.';
        filterResultsElement.appendChild(noResultsElement);
    }
}

addSampleBooks();