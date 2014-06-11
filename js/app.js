/***** Samantha Stallings *****/
/***** Hot or Cold App *****/


$(document).ready( function() {
	
	/********** VARIABLE DECLARATION **********/
	var priorGuesses = [];
	var priorGuessList;
	var randomNumber;
	var guessCounter;
	var userGuess;
	var guessScreen;
	var match = false;
	var thermo;

	/********** APP FUNCTIONALITY **********/

	newGame();


	// Submit user's chosen number
	$( "form" ).submit( function( event ){
		event.preventDefault();

		if( !match ) {
			userGuess = +$( '#userGuess' ).val();
			clearText();
			setFocus();
			haveUsedNumber( userGuess, priorGuesses );
			priorGuessList = $( 'p#guessList' );
			priorGuessList.text( 'Previous guesses: '+priorGuesses.join());
			
			guessScreen = checkGuess( userGuess );
				if( !guessScreen ) {
					guessCounter++;
					changeCount( guessCounter );
					guessScreen = changeTemp( Math.abs( randomNumber - userGuess ));
				}
		} else {
			changeFeedback( "You already won, start a new game" );
			};
	});



//********** FUNCTION DECLARATIONS **********//

	//Screen user input to be sure it follows rules of game
	function checkGuess( userGuess ) {
		if ( isNaN( userGuess )) {
			changeFeedback( "Nope, enter a number please!" );
			return true;
		} else if ( userGuess < 1 || userGuess > 100 ) {
			changeFeedback( "Your number should be between 1 and 100" );
			return true;
		} else if( $.trim( userGuess ) == '' ){
			changeFeedback( "Enter your guess below!" );
			return true;
		} else {
			return false;
		};
	}

	// Function to check if a number has already been guessed
	function haveUsedNumber(userGuess, guesses) {
    	if(guesses.indexOf(userGuess) == -1 ) {
        	guesses.push(userGuess);	
    	} else {
      		changeFeedback("Try a number you haven't guessed yet!");
      		preventDefault();
    	}
  	}

	//Changes image class and message based on how far user guess is from answer
	function changeTemp( guessGap ) {
		var thermo = $(".thermometer");

		if ( guessGap == 0 ){
			changeFeedback( "You got it!" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('red');
			match = true;
			return false;
		} else if ( guessGap <= 3 ) {
			changeFeedback( "You're on fire" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('red');
			return true;
		} else if ( guessGap <= 7 ) {
			changeFeedback( "You're burning hot " );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('dark-orange');
			return true;
		} else if ( guessGap <= 12 ) {
			changeFeedback( "You're getting hot" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('yellow');
			return true;
		} else if ( guessGap <= 20 ) {
			changeFeedback( "You're getting warmer" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('light-green');
			return true;
		} else if ( guessGap <= 30 ) {
			changeFeedback( "You're getting cold" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('aqua');
			return true;
		} else if ( guessGap <= 40 ) {
			changeFeedback( "You're about to freeze!" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('blue');
			return true;
		} else {
			changeFeedback( "You're frozen solid!" );
			thermo.removeClass('red aqua blue dark-blue yellow light-green dark-orange');
			thermo.addClass('dark-blue');
			return true;
		}
	}

	//resets everthing for new game to begin
	function newGame() {
		guessScreen = true;
		guessCounter = 0;
		//once the user guess = the random number, reset this to true
		match = false;
		$( 'p#guessList' ).text('');
		changeFeedback( 'Guess a number below' );
		changeCount( guessCounter );
		randomNumber = numberGenerator();
		setFocus();
		clearText();
	}

	//updates the counter text shown in the box
	function changeCount ( count ) {
		$( '#count' ).text( guessCounter );
	}

	//Random number generator
	function numberGenerator(){
		var numberGenerated = Math.floor(( Math.random() * 100 ) + 1 );
			return numberGenerated;
	}

	//focus on input box
	function setFocus() {
		document.getElementById( "userGuess" ).focus();
	}

	//clear input box after submit
	function clearText() {
		$('#userGuess').val('');
	}

	//Display information box
  	$( ".what" ).click( function() {
    	$( ".overlay" ).fadeIn( 1000 );
  	});

  	//Hide information box
  	$( "a.close" ).click( function() {
  		$( ".overlay" ).fadeOut( 1000 );
  	});

  	//update messages shown to users
  	function changeFeedback( feedback ) {
  		$( '#feedback' ).text( feedback );
  	};

	//*********Event Handlers***********//
	//Creates a new game on click
	$( '.new' ).click( function( event ) {
		event.preventDefault();
		newGame();
	});
});


