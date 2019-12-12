// Scripts start here

// Create the app object
const myApp = {};

// Store CARDS in an array with 16 objects, each two are paired and identical.
myApp.celebrities = [
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: 'Illustrated face of Robert Deniro.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: 'Illustrated face of Robert Deniro.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: 'Illustrated face of David Bowie.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: 'Illustrated face of David Bowie.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: 'Illustrated face of Jack Nicholson.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: 'Illustrated face of Jack Nicholson.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: 'Illustrated face of John Travolta.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: 'Illustrated face of John Travolta.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: 'Illustrated face of Tom Hanks.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: 'Illustrated face of Tom Hanks.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: 'Illustrated face of Joaquin Phoenix.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: 'Illustrated face of Joaquin Phoenix.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: 'Illustrated face of Tom Waits.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: 'Illustrated face of Tom Waits.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },

    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: 'Illustrated face of Woody Allen.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    },
    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: 'Illustrated face of Woody Allen.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the other side of the card'
    }
]

// 1. Function for when player clicks to start the match
myApp.startGame = function () {
    $('.letsPlay').on('click keypress', function () {
        $('.startButton').addClass('pressDown');
        $('header').slideUp(2000);
        setTimeout(() => {
            $('.letsPlay').removeClass('pressDown');
            setTimeout(() => {
                $('header').slideUp('slow').addClass('slideUp')
            }, 600)
        }, 2000)
        setTimeout(() => {
            myApp.displayInstructions();
        }, 2000);
    });
}

// 2. Function to append instructions of the game
myApp.displayInstructions = () => {
    // Making a div with content to insert the instruction into the DOM
    const divTag = $('<div>').addClass('instructionModal');
    const closeButton = $('<i class="fas fa-times closeInstructions" aria-label="Click here to close instructions and play the game"></i>');
    const title = $('<h2>How to Play!</h2>');
    const instructions = $("<p>In this illustrated <span>cinematic</span> journey, take a deep breath, walk through the Hall of Fame, stop on each block, and flip a card. Keep the celebrity's face in mind and find their identical pair. When all cards flips correctly, the result pops up!</p>");
    const icon = $(`<li><img src="assets/maskFavicon.png" alt="illustrated theater mask icon"></li>`)

    // Appending the content into the DOM
    divTag.append(closeButton, title, instructions, icon);
    setTimeout(() => {
        // instruction appears in 200 milliseconds
        $('.instructions').append(divTag);
        // Click cross button to close instruction page and start the game
        $('.closeInstructions').on('click', function () {
            $('.instructionModal').detach();
        });
    }, 200);

}

// 3. Method to append CARD OBJECTS in the DOM and show all CARDS to the player 
myApp.displayCelebrities = (celebrityArray) => {
    // for each item in array 'celebrities'
    celebrityArray.forEach((celebrityItem) => {
        const listTag = $('<li>').addClass('card').attr('id', celebrityItem.id);
        const cardBack = `<div class="back face"><img src="assets/cardBg.png" alt="Illustrated clapperboard icon"></div>`;
        const cardFront = $('<button>').addClass('front face').attr('title', celebrityItem.title).attr('aria-label', celebrityItem['aria-label']);
        const image = $('<img>').attr('src', celebrityItem.url).attr('alt', celebrityItem.alt);
        
        cardFront.append(image);
        
        listTag.append(cardBack, cardFront);
        $('.cardContainer').append(listTag);
    })
}

// 4. When player clicks, the 'selected' class adds to the card that has been clicked and check if the following clicked card is a match - Every card has an on-click event
myApp.userClick = function() {
    $('.cardContainer').on('click', '.card', function() {
        $(this).addClass('show selected')

        if($('.selected').length == 1) {
            myApp.runCounter();
        }

        if($('.selected').length == 2) {

            // if cards match
            if($('.selected').first().attr('id') == $('.selected').last().attr('id')) {
                setTimeout(() => {
                    $('.selected').removeClass('selected').addClass('matched');
                    myApp.checkWin();
                }, 1000)

            // if cards don't match
            } else {
                setTimeout(() => {
                    $('.card').removeClass('show selected');
                }, 1000)
            }  
            
        // temporarily disable clicking on cards        
        } else if ($('.selected').length >= 3) {
            $(this).removeClass('show selected');
        }
    });
}



// 5. Number of attempts a player makes. Every successful attempt increments one score
let attempt = 0;
myApp.runCounter = function() {
    attempt += 1;
    $('.counter').text(`Attempts: ${attempt}`);
    if (attempt == 1) {
        myApp.startTimer();
    }
}

// 6. Timer's variables and functions - Timer starts running when player clicks on a card and stops when the last pair of cards match up.
let $min = $('.minutes');
let $sec = $('.seconds');
let totalSec = 0;

myApp.startTimer = function() {
    gadget = function(time) {
        let timeString = time + "";
        if (timeString.length < 2) {
            return '0' + timeString;
        } else {
            return timeString;
        }
    }

    setTime = function() {
        ++totalSec;
        $sec.text(gadget(totalSec % 60));
        $min.text(gadget(parseInt(totalSec / 60)));
    }

    interval = setInterval(setTime, 1000);
}

// 7. Function to check if all cards are matched
myApp.checkWin = function() {
    if ($('.card.matched').length === myApp.celebrities.length) {
        // winning message pops up 
        $('.winMessageContainer').addClass('userWin');
        $('.cardContainer').addClass('reduceOpacity');
        $('.score').html(`You matched celebrities in <span class="inlineSpan">${totalSec}</span> seconds with only <span class="inlineSpan">${attempt}</span> attempts!`)
        clearInterval(interval);

        // If all cards matched reset the counter and timer
        $('.resetButton').on('click', function() {
            clearInterval(interval);
            totalSec = 0;
            $sec.text('00');
            $min.text('00');
            $('.counter').text('Attempt: 0');
            attempt = 0;
            $('.winMessageContainer').removeClass('userWin');
            $('.card').remove();
            $('.cardContainer').removeClass('reduceOpacity');
            let randomCelebrities = myApp.shuffle(myApp.celebrities);
            myApp.displayCelebrities(randomCelebrities);
        });
    }
}

// 8. Function with the restart button to restart the game
myApp.playAgain = function () {
    // on click of playAgain
    $('.restartButton').on('click', function () {
        clearInterval(interval);
        totalSec = 0;
        $sec.text('00');
        $min.text('00');
        $('.counter').text('0');
        attempt = 0;
        $('.card').remove();
        let randomCelebrities = myApp.shuffle(myApp.celebrities);
        myApp.displayCelebrities(randomCelebrities);
    });
}

// 9. The shuffle function to randomly shuffle all CARDS -- Fisher-Yates (aka Knuth) Shuffle
myApp.shuffle = function (array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Function: Init
// Initializing myApp
myApp.init = function() {
    let randomCelebrities = myApp.shuffle(myApp.celebrities);
    myApp.displayCelebrities(randomCelebrities);
    myApp.startGame();
    myApp.userClick();
    myApp.playAgain();
}

$(function() {
    myApp.init();
});
// Scripts end here