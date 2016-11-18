var bookLookApp = function(){

  var booksObj = {
    books : []
  };

  //book object
  function book(title, authore, description, imageUrl, numOfPages, id){
    this.title = title;
    this.authore = authore;
    this.description = description;
    this.imageUrl = imageUrl;
    this.numOfPages = numOfPages;
    this.id = id;
  };

  //create a book object and push it into the books array
  function createBook(title, authore, description, imageUrl, numOfPages, id){
    var tempBook = new book(title, authore, description, imageUrl, numOfPages, id)
    booksObj.books.push(tempBook); 
  };

  function clearBooksObj(){
    booksObj = {
      books : []
    };
  };

  //render the screen to show all books in the array
  function renderBook(id){
    $('.respons-block').empty();
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObj.books[id]);
    $('.respons-block').append(newHTML);
  };

  //validate input filed
  function validateText($input){

  $input.parent().removeClass('has-error');
  $input.attr("placeholder", "Enter book's name");

  if($input.val() != ""){
    return true;
  }else{
    $input.parent().addClass('has-error');
    $input.attr("placeholder", "You must enter the book's name");
    return false;   
  }
};

  //set the the loading indicator to show while making ajax requests
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


  // //fetch book info from google api
  // var fetch = function(isbnNum) {
  //   $.ajax({
  //     method: "GET",
  //     url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum,
  //     dataType: "json",
  //     success: function(data) {

  //       parseBookData(data);
  //       renderBooks();
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       console.log(textStatus);
  //     }
  //   }); 
  // };


  //fetch book list from google api
  var fetchByName = function(name){
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + name,
      dataType: "json",
      success: function(data) {

        parseBooklist(data);
        debugger;
        renderBooksList();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };

  //render the screen to show all books in the array
  function renderBooksList(){
    $('.respons-block').empty();

    var source = $('#books-list-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObj);
    $('.respons-block').append(newHTML);

    $('.book-link').on('click', function(){
      event.preventDefault();
      debugger;
      var id = $(this).parent().data("id");
      renderBook(id);
    });
  };

  //parse json respons, create book obj and push it into the array
  function parseBooklist(data){
    if(data.items){
      for(var j = 0; j < data.items.length; j++){

        var title = data.items[j].volumeInfo.title;
        var id = j;
        
        if(data.items[j].volumeInfo.description){
          var description = data.items[j].volumeInfo.description;
        }else{
          var description = "Description NOT found"
        }
        if(data.items[j].volumeInfo.pageCount){
          var pageCount = data.items[j].volumeInfo.pageCount;
        }else{
          var pageCount = "NOT FOUND"
        }
        if(data.items[j].volumeInfo.imageLinks){
          var imageLink = data.items[j].volumeInfo.imageLinks.smallThumbnail;
        }else{
          var imageLink = "Image NOT found"
        }
        if(data.items[j].volumeInfo.authors){
          var authors = data.items[j].volumeInfo.authors;
        }else{
          var authors = "NOT found"
        }
        
        createBook(title, authors, description, imageLink, pageCount, id);
      }
      
    }else{
      alert("NAME NOT FOUND");
    }
    
  };





  // //parse json respons, create book obj and push it into the array
  // function parseBookData(data){
  //   if(data.items){
  //     var title = data.items[0].volumeInfo.title;
  //     var description = data.items[0].volumeInfo.description;
  //     var pageCount = data.items[0].volumeInfo.pageCount;
  //     var imageLink = data.items[0].volumeInfo.imageLinks.smallThumbnail;
  //     var authors = [];
  //     for(var i = 0; i < data.items[0].volumeInfo.authors.length; i++){
  //       authors.push(data.items[0].volumeInfo.authors[i]);
  //     }
  //     createBook(title, authors, description, imageLink, pageCount);
  //   }else{
  //     alert("Book not found");
  //   }
    
  // };


  return {
    validateText: validateText,
    fetch: fetch,
    fetchByName: fetchByName,
    clearBooksObj: clearBooksObj
  };

};



var app = bookLookApp();




$('.search-button').on('click', function(){
  event.preventDefault();
  app.clearBooksObj();
  debugger;
  var $nameInput = $('#book-name');

  if(app.validateText($nameInput)){
    app.fetchByName($nameInput.val());
    $('#book-name').val('');
  }
});

