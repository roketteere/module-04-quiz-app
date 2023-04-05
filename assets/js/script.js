// Test and make sure our script loaded at page load/reload
console.log('Logging');

// declare global variables
var timerTime = 300;
var currentQuestionIndex = 0;
var correct = null;
var clicked = null;
var amount = 10;
// score variable to keep track of score
var highScore = 0;
var score = 0;
// Create variable to hold user input initials
var inputedInitials =[];
var scored = [];
// create an array to hold all the questions asked
var questionsAsked = [];
// loaded questions and answers
var loadedQuiz = [];

var quizQuestions = fetch('assets/json/questions.json').then((response) => response.json()).then((data) => {
    var newData  = JSON.stringify(data);
    localStorage.setItem('quiz-data', newData);
    loadedQuiz = JSON.parse(localStorage.getItem('quiz-data'));
    if('quiz-data' )
    console.log('newData', newData);
    if('user-data'){
        scoreCard.textContent = localStorage('user-score')
    }
   
  
});

// get our start button
var startButton = document.querySelector('#start');
var stopButton = document.querySelector('#stop');

// get hidden container reference variables
var quizContainer = document.querySelector('#quiz');
var timerContainer = document.querySelector('#timer-container');
var infoContainer = document.querySelector('#info');

// Get all other elements needed as reference variables (variables we created and named whatever we wanted so that we can access them in the html document)
var pageTitle = document.querySelector('#title');
var questionBox = document.querySelector('#question');
var answerOne = document.querySelector('#a1');
var answerTwo = document.querySelector('#a2');
var answerThree = document.querySelector('#a3');
var answerFour = document.querySelector('#a4');

// Create array to hold answers
var question =[answerOne, answerTwo, answerThree, answerFour];
var timer = document.querySelector('#timer');
var scoreCard = document.querySelector('#score');
var userInitials = document.querySelector('#initials');

// string variable that holds the #score and pre-formatting
var scoreText = `Final Score: ${score}`;

//  Create a string variable to display the userInitials data
var inputedInitialsText = `User Initials: ${inputedInitials}`;

// function display questions
function loadStoredQuiz(loadedQuiz){
    loadedQuiz = JSON.parse(localStorage.getItem('quiz-data'));
    rounds = loadedQuiz.quiz.length;
    
}

// function to display answers
function insertQuizItems(loadedQuiz, currentQuestionIndex){
    questionBox.textContent = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].question);
    answerOne.textContent = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].answers[0]);
    answerTwo.textContent = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].answers[1]);
    answerThree.textContent = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].answers[2]);
    answerFour.textContent = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].answers[3]);
    correct = JSON.stringify(loadedQuiz.quiz[currentQuestionIndex].correctAnswer);
    questionsAsked.push(questionBox.textContent)
    return parseInt(correct) ;


    
}

// Create a startQuiz() function
function displayQuiz(){
    startButton.setAttribute('style', 'display:none;');
    quizContainer.setAttribute('style', 'display:flex;');
    timerContainer.setAttribute('style', 'display:flex;');
    infoContainer.setAttribute('style', 'display:flex;');
    console.log('Quiz Displayed!');
    
}

// function that starts the timer
function timerStart(){
    displayQuiz();
    correct = insertQuizItems(loadedQuiz,currentQuestionIndex);
    var timeInterval = setInterval (() => {
        if(timerTime > 0){
            timerTime--;
            timer.textContent = `Time remaining: ${timerTime}`;
            console.log(`Time remaining: ${timerTime}`);
        }
       
        else if(timerTime === 0 || questionsAsked.length ===  10){
            clearInterval(timeInterval);
            timerTime = 300;
            highScore = (score + timerTime);
            if(questionsAsked.length === 10){
                console.log("Quiz Completed Calculating Results!");
            }
            inputedInitials.push(prompt('Please enter Initials'));
            for(i=0;i<inputedInitials.length;i++){
                userInitials.textContent = inputedInitials[i];
            }
            scoreCard.textContent = highScore;
            localStorage.setItem('user-score', highScore);
            localStorage.setItem('user-initials',userInitials[-1]);
            

        }
        
    }, 1000);
    console.log('Timer Started!');
    
}
// add event listener to start button
answerOne.addEventListener('click', function (event){
    clicked = 0;
    if(correct == clicked){
        if(questionsAsked.length === 10){
            timerTime = 0;
            return;
        }
        currentQuestionIndex++;
        score++;
        correct = insertQuizItems(loadedQuiz,currentQuestionIndex);
        console.log('Correct!');
    }else console.log('Incorrect');
    

});
// add event listener to start button
answerTwo.addEventListener('click', function (event){
    clicked = 1;
    if(correct == clicked ){
        
        if(questionsAsked.length === 10){
            timerTime = 0;
            return;
        }
        currentQuestionIndex++;
        score++;
        correct = insertQuizItems(loadedQuiz,currentQuestionIndex);
        console.log('Correct!');
    }else {
        score--;
        console.log('Incorrect');
    }
    
});
// add event listener to start button
answerThree.addEventListener('click', function (event){
    clicked = 2;
    if(correct == clicked){
        if(questionsAsked.length === 10){
            timerTime = 0;
            return;
        }
        currentQuestionIndex++;
        score++;
        correct = insertQuizItems(loadedQuiz,currentQuestionIndex);
        console.log('Correct!');
    }else {
        score--;
        console.log('Incorrect');
    }
});
// add event listener to start button
answerFour.addEventListener('click', function (event){
    clicked = 3;
    if(correct == clicked){
        
        if(questionsAsked.length === 10){
            timerTime = 0;
            return;
        }
        currentQuestionIndex++;
        score++;
        correct = insertQuizItems(loadedQuiz,currentQuestionIndex);
        console.log('Correct!');
    }else {
        score--;
        console.log('Incorrect');
    }
    
    
});
// add event listener to start button
startButton.addEventListener('click', function (event){
    timerStart();
    console.log('Started');
    
});


