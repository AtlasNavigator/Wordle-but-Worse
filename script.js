    const { rword } = require('rword'); // Random word generator
    let answer = getAnswer(); //todo make this random word
    const board = document.getElementById('board');
    const textBox = document.querySelector('input');
    const submitButton = document.getElementById('enter');
    const restartButton = document.getElementById('restart');
    const gameOverMessage = document.getElementById('game-over');

    let currentGuessNumber = 0;
    let randomAnswer = answer[Math.floor(Math.random()*answer.length)];

    function getAnswer(){
    // Generate 5 different 5 letter words
    let wordGen = rword.generate(5, { length: 5 });
    let randomNumber = Math.floor(Math.random()*wordGen.length)
    let answer = wordGen[randomNumber].split("")
    console.log(answer);
    return answer
}


    restartButton.addEventListener('click', function(e){
    location.reload();
})

    submitButton.addEventListener('click', function(e){
    let guess = textBox.value;
    textBox.value = "";
    if (guess.length !== 5){
    return //don't accept words that aren't 5 letters long
}
    //todo clear the textbox once you hit submit

    //render guess to the board
    writeGuess(guess) //todo create this function

    currentGuessNumber++

    // check for win
    if (guess.toUpperCase() === randomAnswer.toUpperCase()){
    gameOverMessage.textContent = 'You won!!!';
    submitButton.remove();
    textBox.remove();
    return
}

    // check for loss
    if (currentGuessNumber >= board.children.length) {
    gameOverMessage.textContent = `You lost :( The word was ${randomAnswer}.`;
    submitButton.remove();
    textBox.remove();
    return
}
})

    function writeGuess(guess){
    //build our match array so we easily see what matches
    let matchArray = buildMatchArray(guess) //todo create function that turns words into arrays

    //identify the current tr tag
    let currentGuessRow = board.children[currentGuessNumber];
    //identify the columns for each letter in that row
    let columns = currentGuessRow.children

    for (let i = 0; i<matchArray.length; i++){
    let column = columns[i];
    column.textContent = guess[i].toUpperCase();

    if (matchArray[i] === 2){ //perfect match
    column.classList.add('correct');
}   else if (matchArray[i] === 1){  //in word, wrong spot
    column.classList.add('in-word');
}   else {
    column.classList.add('incorrect'); //no match
}
}
}

    function buildMatchArray(guess){
    guess = guess.toUpperCase();
    let randomAnswerAsArray = [];
    let matchArray = [0, 0, 0, 0, 0]; //assume no match to start
    for (let i = 0; i < randomAnswer.length; i++){
    let letter = randomAnswer[i].toUpperCase();
    randomAnswerAsArray.push(letter);
}

    //find exact matches
    for (let i = 0; i < guess.length; i++){
    let letter = guess[i];
    if (letter === randomAnswer[i]){
    randomAnswerAsArray[i] = null; //remove letter to prevent matching it as yellow, too
    matchArray[i] = 2; //indicate we found a match
}
}

    //find in-word matches and misses
    for (let i = 0; i < guess.length; i++){
    let letter = guess[i];
    let index = randomAnswerAsArray.indexOf(letter);

    //if letter not in remaining letters, move on to next letter
    if (index === -1){
    continue
}

    //remove letter to prevent matching in other positions
    randomAnswerAsArray[index] = null;
    //mark it yellow as it is in the word but not in the correct spot
    matchArray[i] = 1
}
    return matchArray
}
