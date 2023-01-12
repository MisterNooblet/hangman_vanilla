"use strict";

/*
Hangman game - By Artyom Ribakov / Appleseeds pre-bootcamp.
This version Interacts with the user using Prompts and alerts in a loop.
Geek mode challange done. 
Please run it through an index.html including this code in a js.
Live version for making your life easier- https://thehollow.xyz/
Pushed:03/10/22 20:08
*/

//A bank of words to pick from
let wordbank = [
  "javascript",
  "appleseeds",
  "arrays",
  "strings",
  "constants",
  "variables",
];

let solution = []; //An array to hold the solution.
const maxBloopers = 10; //Max Mistakes a player can make.
let bloopers = 0; //A variable to hold the amount of mistakes the player has currently made.
let guessed = []; //An array of guessed letters.
let wordStatus = []; //Status of the word.
let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

//Getting to know the player
let playerName = window.prompt("Hello player, what is your name?");

//Player greeting
alert("Hello " + playerName + " lets play a game of Hangman (X.X) Shall we?");

//The main function runs in a loop untill one of the conditions is met > loss || victory
function mainGame() {
  for (bloopers = 0; bloopers < 11; bloopers) {
    //recieve input from user and force to lowerCase()
    remove(
      prompt(
        "Mistakes:" +
          bloopers +
          "/" +
          maxBloopers +
          " \nAvailable letters:" +
          letters +
          "\n" +
          wordStatus
      ).toLowerCase()
    );
    //if bloopers reached max terminate
    if (bloopers === maxBloopers) {
      return;
    }
    //if player solved the word terminate
    else if (wordStatus === solution) {
      return;
    }
  }
}

//Handling the input from main game dialog and updating according to input.
let remove = function (removeID) {
  let index = letters.indexOf(removeID);
  let windex = solution.indexOf(removeID);
  //if Input letter is in the letters array as well is present in the solution remove from letters array and call guessWord func
  if (index > -1 && windex > -1) {
    letters.splice(index, 1); //remove the letter from letters array
    guessed.indexOf(removeID) === -1 ? guessed.push(removeID) : null; //push the letter to guessed array
    guessedWord();
    checkIfGameWon();
    //else if letter is in letters array but is not present in our solution add a blooper point and check if game is over
  } else if (index > -1 && !solution.includes(removeID)) {
    letters.splice(index, 1); //remove the letter from letters array
    bloopers++; //add a blooper to users score
    checkIfGameLost();
    // if the input contains more than one letter execute full word solution method
  } else if (removeID.length > 1) {
    //if input equals to the solution execute whole word function
    if (removeID === solution) {
      wordStatus = removeID;
      wholeword();
      return;
      //else start comparing letter by letter and do operations as follows:
    } else {
      //create a new array from the players input
      let splitremoveID = [...removeID];

      // start the for loop untill all letters from input are checked.
      for (let XX = 0; XX <= splitremoveID.length - 1; XX++) {
        //variables to hold the index of currently checked letter.
        let splitindex1 = letters.indexOf(splitremoveID[XX]);
        let splitindex2 = solution.indexOf(splitremoveID[XX]);
        //first condition executes if the letter is present in the letters array and inside the solution.
        if (splitindex1 > -1 && splitindex2 > -1) {
          letters.splice(splitindex1, 1);
          guessed.indexOf(splitremoveID[XX]) === -1
            ? guessed.push(splitremoveID[XX])
            : null;
          guessedWord();
          checkIfGameWon();
          //check if letter is present in available letters aray but is not present in the solution
        } else if (splitindex1 > -1 && !solution.includes(splitremoveID[XX])) {
          letters.splice(splitindex1, 1); //remove the letter from letters array
          bloopers++; //add a blooper
          checkIfGameLost();
        }
      }
    }
    //else alert the player the letter was used or player has provided invalid input.
  } else {
    alert("Letter already used or Number/Symbol used! No score lost!");
  }
};

//A function to pick a random word from wordbank array.
function randomWord() {
  solution = wordbank[Math.floor(Math.random() * wordbank.length)];
}

//Compares  wordStatus array and solution array to congratulate the player.
function checkIfGameWon() {
  if (wordStatus === solution) {
    alert("Congratulations " + playerName + " you win this time!");
    return;
  }
}

//Player has guessed the entire word , congratulates the player and stops the applicaton.

function wholeword() {
  alert("Congratulations " + playerName + " you have guessed the entire word!");
  return;
}

//Compares bloopers vs maxbloopers and lets the player know he has lost if the condition is true
function checkIfGameLost() {
  if (bloopers === maxBloopers || bloopers > maxBloopers) {
    alert(
      "Too bad, youre dead (X.x) " + playerName + " The answer was:" + solution
    );
    return;
  }
}

//Updating wordStatus
function guessedWord() {
  wordStatus = solution
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " * "))
    .join("");
}
//Game initialization
randomWord();
guessedWord();
mainGame();
