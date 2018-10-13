function init() {
  createBooks();
  renderBooks();
}

function renderBooks() {
  var books = getBooks();
  console.log("Books", books);

  var strHtmls = books.map(function(book, idx) {
    return `
            <tr>
                <th scope="row">${idx}</th>
                <td>${book.name}</td>
                <td>${book.price}</td>
                <td><button class="btn btn-success" onclick="onBookDetails('${
                  book.id
                }')" data-toggle="modal" data-target="#detailModal">read</button></td>
                <td><button class="btn btn-primary" onclick="onUpdateBook('${
                  book.id
                }')">update</button></td>
                <td><button class="btn btn-danger" onclick="onDeleteBook('${
                  book.id
                }')">delete</button></td>
            </tr>
        `;
  });
  $(".table tbody").html(strHtmls.join(""));
}

function onUpdateBook(bookId) {
  console.log("Updating book:", bookId);
  var newPrice = +prompt("Price?");
  updateBook(bookId, newPrice);
  renderBooks();
}

function onBookDetails(bookId) {
  var book = getBookById(bookId);
  console.log("Book", book);

  var $bookDetails = $(".modal-content");
  $bookDetails.find(".modal-title").text(book.name);
  $bookDetails.find(".modal-body h1").text(book.rating.currRate);
  $bookDetails.find(".modal-body img").attr("src", book.imgUrl);
  var rateBtn = $bookDetails.find(".btn-primary")
  rateBtn.off('click')
  rateBtn.click(function() {

    // var rating = book.rating;
    var newRate = $("#BookRating").val();
    book.rating.currRate =
      (book.rating.currRate*book.rating.numOfRates + +newRate) / ++book.rating.numOfRates;
  });
}
function onDeleteBook(bookId) {
  console.log("deleting book:", bookId);
  deleteBook(bookId);
  renderBooks();
}
function readAndAddNewBook() {
  var name = prompt("enter the name of the new book");
  var price = +prompt("enter the price of the new book");
  if (
    typeof name === "string" &&
    name.trim() != "" &&
    typeof price === "number" &&
    !isNaN(price)
  ) {
    addBook(createBook(name, price, BOOK_PLACEHOLDER));
  } else {
    alert("invalid input");
  }
}

function onNextPage(isNext) {
  goNextPage(isNext);
  renderBooks();
}

// 3.141592653589793238462643383279502841971693993751058209749445923078164062862089986280348253421170679821480865132823