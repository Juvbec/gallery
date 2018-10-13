const BOOK_PLACEHOLDER = "https://via.placeholder.com/150x200";
const PAGE_SIZE = 6;

var gCurrPageNo = 0;
var gBooks = [];

function createBooks() {
    gBooks = [
        createBook("Hitchhikers guide to the Galexy", 20, BOOK_PLACEHOLDER),
        (createBook("Harry Potter", 15, BOOK_PLACEHOLDER)),
        (createBook("1984", 10, BOOK_PLACEHOLDER)),
        (createBook("Thus Spoke Zaratustra", 40, BOOK_PLACEHOLDER)),
        (createBook("The Hunger Games", 20, BOOK_PLACEHOLDER)),
        (createBook("To Kill a Mockingbird", 15, BOOK_PLACEHOLDER)),
        (createBook("Lord Of The Rings", 20, BOOK_PLACEHOLDER)),
        (createBook("Pride and Prejudice", 30, BOOK_PLACEHOLDER))
    ]
}
function createBook(name, price, imgUrl) {
  return {
    id: makeId(),
    name: name,
    price: price,
    imgUrl: imgUrl,
    rating: {currRate: 0,numOfRates: 0}
  };
}
function getBooks() {
  var fromBookIdx = gCurrPageNo * PAGE_SIZE;
  return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE);
}
function getBookById(bookId) {
    return gBooks.find(function(book){
        return book.id === bookId;
    })
}
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(car){
        return car.id === bookId;
    })
    gBooks.splice(bookIdx, 1)

}
function addBook(book) {
    gBooks.push(book);
}
function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function(book){
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
}
function goNextPage(isNext) {
    if(isNext) gCurrPageNo++;
    else gCurrPageNo--;
}