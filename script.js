var bookLookApp = function(){

  var booksObj = {
    books : []
  };

  //book object
  function book(title, authore, description, imageUrl, numOfPages){
    this.title = title;
    this.authore = authore;
    this.description = description;
    this.imageUrl = imageUrl;
    this.numOfPages = numOfPages;
  }

  //create a book object and push it into the books array
  function createBook(title, authore, description, imageUrl, numOfPages){
    var tempBook = new book(title, authore, description, imageUrl, numOfPages)
    booksObj.books.push(tempBook);
  }

  //render the screen to show all books in the array
  function renderBooks(){
    $('.respons-block').empty();
    var source = $('#respons-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObj);
    $('.respons-block').append(newHTML);
  }

  //validate input filed
  function validateText($input){

  $input.parent().removeClass('has-error');
  $input.attr("placeholder", "ISBN number");

  if($input.val() != ""){
    return true;
  }else{
    $input.parent().addClass('has-error');
    $input.attr("placeholder", "You must enter an ISBN number");
    return false;   
  }
}

$.ajaxSetup({
    beforeSend:function(){
        // show gif here, eg:
        $(".demo").easyOverlay("start");
    },
    complete:function(){
        // hide gif here, eg:
        $(".demo").easyOverlay("stop");
    }
});

//fetch book info from google api
var fetch = function(isbnNum) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum,
    dataType: "json",
    success: function(data) {

      parseBookData(data);
      app.renderBooks();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
};

//parse json respons, create book obj and push it into the array
function parseBookData(data){
  var title = data.items[0].volumeInfo.title;
  var description = data.items[0].volumeInfo.description;
  var pageCount = data.items[0].volumeInfo.pageCount;
  var imageLink = data.items[0].volumeInfo.imageLinks.smallThumbnail;
  var authors = [];
  for(var i = 0; i < data.items[0].volumeInfo.authors.length; i++){
    authors.push(data.items[0].volumeInfo.authors[i]);
  }
  app.createBook(title, authors, description, imageLink, pageCount);
}



  return {
    validateText: validateText,
    fetch: fetch,
    parseBookData: parseBookData,
    createBook: createBook,
    renderBooks:renderBooks
  }

};




var app = bookLookApp();




$('.search-button').on('click', function(){
  event.preventDefault();

  var $isbnNumber = $('#isbn-number');
  if(app.validateText($isbnNumber)){
    app.fetch($isbnNumber.val());
    $('input').val('');
  }
});

