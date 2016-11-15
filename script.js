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

function validateText($input){
  debugger;
  if($input.val() != ""){
    return true;
  }else{
    var field = "";
    switch($input.attr('id')){

      case 'book-title':
      field = "title";
      break;

      case 'book-authore':
      field = "authore";
      break;

      case 'book-description':
      field = "description";
      break;

      case 'image-url':
      field = "image-url";
      break;
    }

    $input.parent().addClass('has-error');
    $input.attr("placeholder", "You must enter a " + field);
    return false;
  }
}

function validateNum($input){
  if($input.val() != "" && !isNaN($input.val())){
    return true;
  }else{
    var field = "";
    switch($input.attr('id')){

      case 'number-of-pages':
      field = "number of pages";
      break;

      case 'minutes-you-read-per-day':
      field = "minutes you read per day";
      break;
    }

    $input.parent().addClass('has-error');
    $input.val('');
    $input.attr("placeholder", "You must enter a " + field);

    return false;
  }
}

function validateForm($title, $authore, $description, $imageUrl, $numOfPages, $minPerDay){

  var validTitle = validateText($title);
  var validAuthore = validateText($authore);
  var validDesc = validateText($description);
  var validImage = validateText($imageUrl);
  var validNum = validateNum($numOfPages);
  var validMin = validateNum($minPerDay);
  if(validTitle && validAuthore && validDesc && validImage && validNum && validMin){
    return true;
  }else{
    return false;
  }
}



var app = bookLookApp();

//Test dummy books
 app.createBook("the 1st book", "monkey boy", "shitty book", "http://www.clipartkid.com/images/157/best-online-collection-of-free-to-use-clipart-contact-us-privacy-Q634MZ-clipart.jpg", 284, 15)
 app.createBook("the 2nd book", "tighty whity", "bongo mongo", "http://www.clipartkid.com/images/557/big-book-clipart-big-book-clip-art-JvPjUB-clipart.png", 315, 17)



$('.search-button').on('click', function(){
  event.preventDefault();

  var $title = $('#book-title');
  var $authore = $('#book-authore');
  var $description = $('#book-description');
  var $imageUrl = $('#image-url');
  var $numOfPages = $('#number-of-pages');
  var $minPerDay = $('#minutes-you-read-per-day');



  if(validateForm($title, $authore, $description, $imageUrl, $numOfPages, $minPerDay)){
    app.createBook($title.val(), $authore.val(), $description.val(), $imageUrl.val(), $numOfPages.val(), $minPerDay.val());
    app.renderBooks();

    $('input').val('');
    
  }

 
  
});