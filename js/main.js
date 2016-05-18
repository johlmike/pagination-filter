//Put the searchBox into header if the javasript is enable
var $searchDiv    = $('<div class="student-search">');
var $searchInput  = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');
$searchDiv.append( $searchInput );
$searchDiv.append( $searchButton );
$('.page-header').append( $searchDiv );

//append pagination
var $pagination = $('<div class="pagination"></div>');
var $buttonList = $('<ul class="button-list"></ul>');
$pagination.append($buttonList);
$('.page').append($pagination);

//define the correct students list and incorrect one
var $correctStu;
var $incorrectStu;


// //replace ul and li tag with div
// $('.student-list').replaceWith('<div class="student-list">' + $('.student-list').html() + '</div>');
// $('.student-list li').each( function() {
//     $(this).replaceWith('<div class="student-item cf">' + $(this).html() + '</div>');
// });

//append the error message
var $errorMessage = $('<p style="text-align: center;">Sorry. There is no match student. Please try again.</p>');
$('.student-list').append( $errorMessage );
$errorMessage.hide();

//Bind event to the searchInput and searchButton with searchStu function
$searchButton.on('click', searchStu);
$searchInput.on('input', searchStu);

// create a function to let page only show ten students at a time
function sortStu(){
    //delete all buttons in the button-list
    $buttonList.empty();
    //append the nessary buttons to the button-list
    for (var i = 0; i < Math.ceil( $correctStu.length / 10 ); i++) {
        var $anchor;
        var $button = $('<li></li>');

        if( i === 0 ){
            $anchor = $('<a class="active" href="#">' + (i+1) + '</a>');
        } else{
            $anchor = $('<a href="#">' + (i+1) + '</a>');
        }
        $button.append($anchor);
        $buttonList.append($button);
    }
    //bind click event to button with changePage
    $('.button-list a').on('click', changePage);

    //show first ten students
    $correctStu.each( function(index) {
        var $parent = $(this).parents('.student-item');
        if( index < 10){
            $parent.show();
        } else {
            $parent.hide();
        }
    });
}

function changePage(){
    console.log('changePage');
}

//create the searchStu function
function searchStu () {
    console.log('Start Searching!');
    //get user's string
    var searchValue = $searchInput.val();
    searchValue = searchValue.toLowerCase();

    //filter the correct students
    $correctStu = $('.student-item h3').filter(function( index ) {
        if( $(this).text().indexOf( searchValue ) >= 0 ){
            return true;
        }
    });
    //filter the incorrect students
    $incorrectStu = $('.student-item h3').filter(function( index ) {
        if( $(this).text().indexOf( searchValue ) < 0 ){
            return true;
        }
    });

    //show correct students if they have been hidden
    $correctStu.each( function() {
        var $parent = $(this).parents('.student-item');
        if( $parent.css('display') === 'none' ){
            $parent.show();
        }
    });
    //hide incorrect students if they have been display
    $incorrectStu.each( function() {
        var $parent = $(this).parents('.student-item');
        if( $parent.css('display') !== 'none' ){
            $parent.hide();
        }
    });

    //show error message if we cant find match student
    if( $correctStu.length === 0){
        $errorMessage.show();
    } else {
        $errorMessage.hide();
    }
}

searchStu();
sortStu();
