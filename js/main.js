//Student Name: Ya-Chen Lin
//Checked devices: Galaxy Note 5 with Chrome( Work Well )
//Checked browsers: Chrome、Edge、IE11(will block js automatically)、firefox
//The page will show the whole list normally if javascript has been blocked
//main.js work well on 64 or 44 contects

//Put the searchBox into header if the javasript is enable
var $searchDiv    = $('<div class="student-search">');
var $searchInput  = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');
$searchDiv.append($searchInput);
$searchDiv.append($searchButton);
$('.page-header').append($searchDiv);

//append pagination
var $pagination = $('<div class="pagination"></div>');
var $buttonList = $('<ul class="button-list"></ul>');
$pagination.append($buttonList);
$('.page').append($pagination);

//define the correct students list and incorrect one
var $correctStu;
var $incorrectStu;

//append the error message (default: hide)
var $errorMessage = $('<p style="text-align: center;">Sorry. There is no match student. Please try again.</p>');
$('.student-list').append($errorMessage);
$errorMessage.hide();

//Bind event to the searchInput and searchButton with searchStu function
$searchButton.on('click', searchStu);
$searchInput.on('input', searchStu);

// create a function to let page only show ten students at a time
function sortStu() {
    //delete all buttons in the button-list
    $buttonList.empty();
    //append the nessary buttons to the button-list
    for (var i = 0; i < Math.ceil($correctStu.length / 10); i++) {
        var $anchor;
        var $button = $('<li></li>');

        if (i === 0) {
            $anchor = $('<a class="active" href="#">' + (i + 1) + '</a>');
        } else {
            $anchor = $('<a href="#">' + (i + 1) + '</a>');
        }
        $button.append($anchor);
        $buttonList.append($button);
    }
    //bind click event to button with changePage
    $('.button-list a').on('click', changePage);

    //show first ten students
    $correctStu.each(function(index) {
        var $parent = $(this).parents('.student-item');
        if (index < 10) {
            $parent.slideDown();
        } else {
            $parent.slideUp();
        }
    });
}

//create the function for changing the page
function changePage() {
    //delete all button's active class
    $('.button-list a').removeClass('active');

    //change the button's class to active
    $(this).addClass('active');

    //get the page number
    var pageNum = parseInt( $(this).text() );

    //show ten student's according to pageNum and show others
    $correctStu.each(function(index) {
        var $parent = $(this).parents('.student-item');
        if ( index >= (pageNum-1) * 10 && index < pageNum * 10 ) {
            $parent.slideDown();
        } else {
            $parent.slideUp();
        }
    });
}

//create the function for searching students
function searchStu() {
    //get user's string
    var searchValue = $searchInput.val().toLowerCase();

    //filter the correct students
    $correctStu = $('.student-item h3').filter(function(index) {
        if ($(this).text().indexOf(searchValue) >= 0) {
            return true;
        }
    });
    //filter the incorrect students
    $incorrectStu = $('.student-item h3').filter(function(index) {
        if ($(this).text().indexOf(searchValue) < 0) {
            return true;
        }
    });

    //show correct students if they have been hidden
    $correctStu.each(function() {
        var $parent = $(this).parents('.student-item');
        if ($parent.css('display') === 'none') {
            $parent.fadeIn();
        }
    });
    //hide incorrect students if they have been display
    $incorrectStu.each(function() {
        var $parent = $(this).parents('.student-item');
        if ($parent.css('display') !== 'none') {
            $parent.fadeOut();
        }
    });

    //show error message if we cant find match student
    if ($correctStu.length === 0) {
        $errorMessage.fadeIn();
    } else {
        $errorMessage.fadeOut();
    }

    //do sortStu after we found the correct students
    sortStu();
}

//do searchStu one time when the page finish loading
searchStu();
