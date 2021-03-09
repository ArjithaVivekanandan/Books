var data=fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves/source=string")
data.then((book)=>{
    return book.json();
}).then((final)=>{
    console.log(final);
});
