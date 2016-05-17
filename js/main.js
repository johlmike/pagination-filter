//Put the searchBox into header if the javasript is enable
var $searchDiv    = $('<div class="student-search">');
var $searchInput  = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');
$searchDiv.append( $searchInput );
$searchDiv.append( $searchButton );
$('.page-header').append( $searchDiv );

//Bind event to the searchInput and searchButton with searchStu function
$searchButton.on('click', searchStu);
$searchInput.on('input', searchStu);

//create the searchStu function
function searchStu () {
    //get user's string
    var searchValue = $searchInput.val();

    //filter the correct students
    var $correctStu = $('.student-item h3').filter(function( index ) {
        if( $(this).text().indexOf( searchValue ) >= 0 ){
            return true;
        }
    });
    //filter the incorrect students
    var $incorrectStu = $('.student-item h3').filter(function( index ) {
        if( $(this).text().indexOf( searchValue ) < 0 ){
            return true;
        }
    });

    //show correct students if they have been hidden
    $correctStu.each( function() {
        if( $(this).parents('.student-item').css('display') === 'none' ){
            $(this).parents('.student-item').fadeIn();
        }
    });
    //hide incorrect students if they have been display
    $incorrectStu.each( function() {
        if( $(this).parents('.student-item').css('display') !== 'none' ){
            $(this).parents('.student-item').fadeOut();
        }
    });

    //show error message if we cant find match student
    if( $correctStu.length === 0){

    }
}
