// This link was the main guide to write the code for this game:
// https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

const matchApp = {};

// Store CARDS in an array with 16 objects, each two are paired are identical.
matchApp.celebrities = [
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'robertDeniro',
        url: 'assets/robertDeniro.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'davidBowie',
        url: 'assets/davidBowie.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'jackNicholson',
        url: 'assets/jackNicholson.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'johnTravolta',
        url: 'assets/johnTravolta.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'tomHanks',
        url: 'assets/tomHanks.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'joaquinPhoenix',
        url: 'assets/joaquinPhoenix.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'tomWaits',
        url: 'assets/tomWaits.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },

    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    },
    {
        id: 'woodyAllen',
        url: 'assets/woodyAllen.jpg',
        alt: '',
        title: 'celebrity card front',
        'aria-label': 'Press enter to see the front side'
    }
]


// 1. Fire shuffle function to randomly shuffle 'celebrities' into 'randomCelebrities'
matchApp.shuffle = function (array) {
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
matchApp.displayCelebrities = (celebrityArray) => {
    celebrityArray.forEach( (celebrityItem) => {
        const listTag = $('<li>').addClass('card').attr('id', celebrityItem.id);
        const buttonBack = `<div class="back face"><img src="assets/camera-icon.jpg" alt="claket icon"></div>`;
        const buttonFront = $('<div>').addClass('front face');
        const image = $('<img>').attr('src', celebrityItem.url).attr('alt', celebrityItem.alt);

        buttonFront.append(image);
        
        listTag.append(buttonBack, buttonFront);
        $('.cardContainer').append(listTag);
    })
}

// 3. When player clicks, the 'selected' class adds to the card that has been clicked and checked if the following clicked card is a match or not
matchApp.userClick = function() {
    $('.cardContainer').on('click', '.card', function() {
        $(this).addClass('show selected')

        if($('.selected').length == 1) {
            matchApp.moveCounter();
        }
        if($('.selected').length == 2) {

            // if cards match
            if($('.selected').first().attr('id') == $('.selected').last().attr('id')) {
                // $('.selected').addClass('wiggle');
                setTimeout(() => {
                    $('.selected').removeClass('selected').addClass('matched');
                    matchApp.checkWin();
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
matchApp.startGame = function() {
    $('.letsPlay').on('click keypress', function() {
        $('.letsPlay').addClass('pressDown');
        $('header').slideUp(2000);
        setTimeout(() => {
            $('.letsPlay').removeClass('pressDown');
            setTimeout(() => {
                $('header').slideUp('slow').addClass('slideUp')
            }, 600)
        }, 2000)
    });
}

// 5. Number of attempts that player makes. Every successful attempt adds one score
let attempt = 0;
matchApp.moveCounter = function() {
    attempt += 1;
    $('.counter').text(attempt);
    if (attempt == 1) {
        matchApp.startTimer();
    }
}

// 6. Variables and Functions for the timer - Timer starts running when the player clicks on a card and stops when the last pair match up.
let $min = $('.minutes');
let $sec = $('.seconds');
let totalSec = 0;

matchApp.startTimer = function() {
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
matchApp.restartGame = function() {
    $('.restartButton').on('click', function() {
        clearInterval(interval);
        totalSec = 0;
        $sec.text('00');
        $min.text('00');
        $('.counter').text('0');
        attempt = 0;
        $('.card').remove();
        let randomCelebrities = matchApp.shuffle(matchApp.celebrities);
        matchApp.displayCelebrities(randomCelebrities);
    });
}

// 8. Function to check if all cards are matched
matchApp.checkWin = function() {
    if ($('.card.matched').length === matchApp.celebrities.length) {
        $('.winMessage').addClass('userWin');
        $('.score').html(`You matched all the celebrities in ${totalSec} seconds with just ${attempt} attempts!!`)
        clearInterval(interval);

        $('.resetButton').on('click', function() {
            clearInterval(interval);
            totalSec = 0;
            $sec.text('00');
            $min.text('00');
            $('.counter').text('0');
            attempt = 0;
            $('.winMessage').removeClass('userWin');
            $('.card').remove();
            let randomCelebrities = matchApp.shuffle(matchApp.celebrities);
            matchApp.displayCelebrities(randomCelebrities);
        });
    }
}

matchApp.init = function() {
    let randomCelebrities = matchApp.shuffle(matchApp.celebrities);
    matchApp.displayCelebrities(randomCelebrities);
    matchApp.startGame();
    matchApp.userClick();
    matchApp.restartGame();
}

$(document).ready(function() {
    matchApp.init();
});






























// ----------------------------




