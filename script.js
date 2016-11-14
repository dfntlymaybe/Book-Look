var bookLookApp = function(){

  var booksObj = {
    books : []
  };

  function book(title, authore, description, imageUrl, numOfPages, minPerDay){
    this.title = title;
    this.authore = authore;
    this.description = description;
    this.imageUrl = imageUrl;
    this.daysToRead = calcRead(numOfPages, minPerDay)
  }

  function calcRead(numOfPages, minPerDay){
    return Math.ceil(numOfPages/minPerDay);
  };

  function createBook(title, authore, description, imageUrl, numOfPages, minPerDay){
    var tempBook = new book(title, authore, description, imageUrl, numOfPages, minPerDay)
    booksObj.books.push(tempBook);
  }

  function renderBooks(){
    $('.respons-block').empty();
    var source = $('#respons-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObj);
    $('.respons-block').append(newHTML);
  }

  return {
    createBook: createBook,
    renderBooks:renderBooks
  }

};


var app = bookLookApp();

//Test dummy books
// app.createBook("the 1st book", "monkey boy", "shitty book", "http://www.clipartkid.com/images/157/best-online-collection-of-free-to-use-clipart-contact-us-privacy-Q634MZ-clipart.jpg", 284, 15)
// app.createBook("the 2nd book", "tighty whity", "bongo mongo", "http://www.clipartkid.com/images/557/big-book-clipart-big-book-clip-art-JvPjUB-clipart.png", 315, 17)



$('.search-button').on('click', function(){
  event.preventDefault();

  var title = $('#book-title').val();
  var authore = $('#book-authore').val();
  var description = $('#book-description').val();
  var imageUrl = $('#image-url').val();
  var numOfPages = $('#number-of-pages').val();
  var minPerDay = $('#minutes-you-read-per-day').val();

 app.createBook(title, authore, description, imageUrl, numOfPages, minPerDay);
 app.renderBooks();

  $('input').val('');
  
});