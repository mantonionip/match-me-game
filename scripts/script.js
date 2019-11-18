// This link was the main guide to write the code for this game:
// https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

// Create the app object
const myApp = {};

// Store CARDS in an array with 16 objects, each two are paired and identical.
myApp.celebrities = [
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: 'Illustrated face of Robert Deniro.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: 'Illustrated face of Robert Deniro.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: 'Illustrated face of David Bowie.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: 'Illustrated face of David Bowie.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: 'Illustrated face of Jack Nicholson.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: 'Illustrated face of Jack Nicholson.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: 'Illustrated face of John Travolta.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: 'Illustrated face of John Travolta.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: 'Illustrated face of Tom Hanks.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: 'Illustrated face of Tom Hanks.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: 'Illustrated face of Joaquin Phoenix.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: 'Illustrated face of Joaquin Phoenix.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: 'Illustrated face of Tom Waits.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: 'Illustrated face of Tom Waits.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: 'Illustrated face of Woody Allen.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: 'Illustrated face of Woody Allen.',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    }
]


// 1. The shuffle function to randomly shuffle all CARDS
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

// 2. Function to append the CARD OBJECTS in the DOM and show the CARDS to the user
myApp.displayCelebrities = (celebrityArray) => {
    celebrityArray.forEach( (celebrityItem) => {
        const listTag = $('<li>').addClass('card').attr('id', celebrityItem.id);
        const cardBack = `<div class="back face"><img src="assets/card-bg.png" alt="Illustrated clapperboard icon"></div>`;
        const cardFront = $('<div>').addClass('front face');
        const image = $('<img>').attr('src', celebrityItem.url).attr('alt', celebrityItem.alt);

        cardFront.append(image);
        
        listTag.append(cardBack, cardFront);
        $('.cardContainer').append(listTag);
    })
}

// *** Function to append game's instructions 
myApp.displayInstructions = () => {
    const divTag = $('<div>').addClass('instructionModal');
    const closeButton = $('<i class="fas fa-times closeInstructions" aria-label="Click here to close instructions and play the game"></i>');
    const title = $('<h2>How to Play!</h2>');
    const instructions = $("<p>In this illustrated <span>cinematic</span> journey, take a deep breath, walk through the Hall of Fame, stop on each block, and flip a card. Keep the celebrity's face in mind and find their identical pair. When all cards flips correctly, the result pops up!</p>");
    const icon = $(`<li><img src="assets/mask-favicon.png" alt="illustrated theater mask icon"></li>`)

    divTag.append(closeButton, title, instructions, icon);
    $('.instructions').append(divTag);

    $('.closeInstructions').on('click', function() {
        $('.instructionModal').detach();
    });
}

// 3. When player clicks, the 'selected' class adds to the card that has been clicked and checked if the following clicked card is a match or not
myApp.userClick = function() {
    $('.cardContainer').on('click', '.card', function() {
        $(this).addClass('show selected')

        if($('.selected').length == 1) {
            myApp.moveCounter();
        }
        if($('.selected').length == 2) {

            // if cards match
            if($('.selected').first().attr('id') == $('.selected').last().attr('id')) {
                // $('.selected').addClass('wiggle');
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

// 4. Function with an event listener for when player clicks the gameboard appears
myApp.startGame = function() {
    $('.letsPlay').on('click keypress', function() {
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

// 5. Number of attempts that player makes. Every successful attempt adds one score
let attempt = 0;
myApp.moveCounter = function() {
    attempt += 1;
    $('.counter').text(`Attempts: ${attempt}`);
    if (attempt == 1) {
        myApp.startTimer();
    }
}

// 6. Variables and Functions for the timer - Timer starts running when the player clicks on a card and stops when the last pair match up.
let $min = $('.minutes');
let $sec = $('.seconds');
let totalSec = 0;

myApp.startTimer = function() {
    setTime = function() {
        ++totalSec;
        $sec.text(pad(totalSec % 60));
        $min.text(pad(parseInt(totalSec / 60)));
    }

    pad = function(time) {
        let timeString = time + "";
        if (timeString.length < 2) {
            return '0' + timeString;
        } else {
            return timeString;
        }
    }
    interval = setInterval(setTime, 1000);
}

// 7. Function with an event listener to the restart button that by clicking everything restart
myApp.restartGame = function() {
    $('.restartButton').on('click', function() {
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

// 8. Function to check if all cards are matched
myApp.checkWin = function() {
    if ($('.card.matched').length === myApp.celebrities.length) {
        $('.winMessageContainer').addClass('userWin');
        $('.cardContainer').addClass('reduceOpacity');
        $('.score').html(`You matched all celebrities in <span class="inlineSpan">${totalSec}</span> seconds with just <span class="inlineSpan">${attempt}</span> attempts!!`)
        clearInterval(interval);

        $('.resetButton').on('click', function() {
            clearInterval(interval);
            totalSec = 0;
            $sec.text('00');
            $min.text('00');
            $('.counter').text('0');
            attempt = 0;
            $('.winMessageContainer').removeClass('userWin');
            $('.card').remove();
            $('.cardContainer').removeClass('reduceOpacity');
            let randomCelebrities = myApp.shuffle(myApp.celebrities);
            myApp.displayCelebrities(randomCelebrities);
        });
    }
}

myApp.init = function() {
    let randomCelebrities = myApp.shuffle(myApp.celebrities);
    myApp.displayCelebrities(randomCelebrities);
    myApp.startGame();
    myApp.userClick();
    myApp.restartGame();
}

$(document).ready(function() {
    myApp.init();
});






// ----------------------------
// EXTRA: DISPLAYING Fun Facts 
// myApp.displayFunFacts = () => {
//     const funFactArray = myApp.funFact[myApp.matchedFace];
//     const randomizedIndex = Math.floor(Math.random() * funFactArray.length);

//     const randomFact = funFactArray[randomizedIndex];

//     const factText = `<div class="factInfo"><h3 class="celebrityName" id="celebrityName">${myApp.matchFace}</h3><p class="celebrityFact">${randomFact}</p></div>`;

//     const factCard = $(`<div class="factCard"></div>`);
//     factCard.append(factText);
// }




























