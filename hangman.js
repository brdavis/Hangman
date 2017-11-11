/*	Set Up Canvas for Hangman	*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 3;
        
// creates a blank canvas
function blankCanvas() {
	ctx.clearRect(0,0,200,150);
};   

// sets up the gallows 
function gallows() {
	ctx.moveTo(30,0);
        ctx.lineTo(100,0);
        ctx.moveTo(100,0);
        ctx.lineTo(100,14);
        ctx.moveTo(30,0);
        ctx.lineTo(30,100);
        ctx.moveTo(5,100);
        ctx.lineTo(55,100);
        ctx.stroke();
};
 
// sets up the hangman body parts for each incorrect guess 
function head() {
	ctx.beginPath();
        ctx.arc(100,25,12,0,2*Math.PI);
        ctx.stroke();
};

function body() {
        ctx.moveTo(100,35);
        ctx.lineTo(100,70);
        ctx.stroke();
};

function leftArm() {
        ctx.moveTo(100,55);
        ctx.lineTo(75,40);
        ctx.stroke();
};
        
function leftHand() {
        ctx.moveTo(75,40);
        ctx.lineTo(75,30);
        ctx.stroke();
};
         
function rightArm() {
        ctx.moveTo(100,55);
        ctx.lineTo(125,40);
        ctx.stroke();
};

function rightHand() {
        ctx.moveTo(125,40);
        ctx.lineTo(125,30);
        ctx.stroke();
};
 
function leftLeg() {
        ctx.moveTo(100,70);
        ctx.lineTo(75,85);
        ctx.stroke();
};

function leftFoot() {
        ctx.moveTo(75,85);
        ctx.lineTo(65,85);
        ctx.stroke();
};

function rightLeg() {
        ctx.moveTo(100,70);
        ctx.lineTo(125,85);
        ctx.stroke();
};

function rightFoot() {
        ctx.moveTo(125,85);
        ctx.lineTo(135,85);
        ctx.stroke();
};

// creates the blank spaces for each letter of the gameword 
function letterBlanks(x,y){
        ctx.moveTo(x,130);
        ctx.lineTo(y,130);
        ctx.stroke();
};
   
//writes the correct letter of the gameword in the appropriate blank space 
function fillLetters(letter,x) {
        ctx.font = "20px Comic Sans";
        ctx.fillText(letter,x,125);
} 
 
/*	START GAME	*/

// gamewords for each level        
var levelOne= ["vex", "aver", "zeal", "infer"];
var levelTwo = [ "banal", "depict", "eulogy", "dearth", "imply", "fawn"];
var levelThree= ["guile", "mitigate", "extant", "catalyst", "lucid", "dogged", "cadge", "abscond"];
var levelFour= ["caprice", "diffident","esoteric", "depredation", "barefaced", "antipathy", "tractable", "ephemeral", "corporal", "enigma"];
var levelFive=["amalgamate", "conflagration", "iconoclast", "improvidence","pulchritudinous", "nefarious", "sagacious", "antediluvian", "gossamer","audacious", "ponderous", "ineffable"];

// determine gameword
var index = prompt("Welcome to Hangman! What level(1-5) would you like to play?");        
var levels= [levelOne, levelTwo, levelThree, levelFour, levelFive];
var wordChoices= levels[index - 1]
var gameWord = wordChoices[Math.floor(Math.random()*wordChoices.length)];
        
// starts game 
function startGame() {
	var playerConfirmation = confirm("Do you want to play?");
        if (playerConfirmation === true) {
        	document.getElementById("idResult").innerHTML =("Let's play! Pick a level to start with!");
            	gallows();
            	createLetterBlanks();
          } else {
          	document.getElementById("idResult").innerHTML("Okay, maybe next time!");
          }
};

// shows what the word is, for debugging
function showGameword() {
	document.getElementById("idShowGameword").innerHTML = gameWord;
};         
        
/*	draws and fills in blank array for word in gamespace	*/
function createLetterBlanks() {
	var lettersLength = gameWord.length * 15
        for(i = 5; i < lettersLength; i+=15) {
        	letterBlanks(i,i+10);
        }
};

function fillLetterBlanks(count) {
	var xValue = (count * 15) + 5;
        var letterValue = gameWord[count];
        fillLetters(letterValue, xValue);
};
        
function fillInWholeWord() {
	for(i=0; i < gameWord.length; i++) {
         	fillLetterBlanks(i);
         }
};
      
/*	Guessing the whole word 	*/
function guessWord() {
	var guess = prompt("What is your guess for the word?");
        if (guess === gameWord) {
        	document.getElementById("idResult").innerHTML = "That's correct!"; 
         	gameOver("won");
        } else {
                document.getElementById("idResult").innerHTML = "That's not it, keep guessing!";
                addBodyPart();
        }
};
        
/*	Guessing individual letters of the gameword	*/
var length = gameWord.length; 
var wrongGuesses = [];
var numberOfMissedGuesses = -1;
var hangmanArray = [head, body, leftArm, leftHand, rightArm, rightHand, leftLeg, leftFoot, rightLeg, rightFoot];
var guessedWordCount = 0;
        
function guessLetter() {
	var guess =  prompt("Guess a letter!");
        var letters = [];

        for (i = 0; i < length; i++) {
        	if (guess === gameWord[i]) {
              		letters.push(i);
            	}
        }

        if (letters[0] != null) {
        	document.getElementById("idResult").innerHTML = "That's correct!";
            	lettersLength= letters.length;
            	for (j=0; j < lettersLength; j++) {
              		fillLetterBlanks(letters[j]);
              		guessedWordCount++;
            	}
                if (guessedWordCount === gameWord.length){
         		gameOver("won");
		}
         } else {
         	document.getElementById("idResult").innerHTML = "That's not a correct letter, keep guessing!";
            	wrongGuesses.push(guess);
            	document.getElementById("idArrayOfWrongGuesses").innerHTML = wrongGuesses;
            	addBodyPart();   
         } 
};

function addBodyPart() {
	numberOfMissedGuesses++;
        if (numberOfMissedGuesses === hangmanArray.length) {
        	gameOver("lost");
        }
        var bodyPart = hangmanArray[numberOfMissedGuesses];                                                                    
        bodyPart();
};

/*	game over	*/
        
function gameOver(status) {
	fillInWholeWord();
        var ending = "You " + status + "! Do you want to play again?";
        var playAgain= confirm(ending);
        if (playAgain === true) {
        	location.reload()
        } else {
        	blankCanvas();  
            	document.getElementById("idResult").innerHTML=("Okay, see you next time!");
        }
};
       
     
