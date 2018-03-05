let timeLimit = 30;
let correct = 0;
let incorrect = 0;
let blank = 0;
var currentQuestion = 0;

var triviaData = {
    questions: ['What year was the Sega DreamCast realeased ?',
        'Who developed the game "DOOM" ?',
        'All your base belongs to who?' 
    ],
    choices: [['A. 1997', 'B. 1998', 'C. 1996', 'D. 2000'],
        ['A. id Software', 'B. Bethesda', 'C. BioWare', 'D. Blizzard'],
        ['A. me', 'B. you?', 'C. George Bush', 'D. us']
    ],
    answers: ['B. 1998', 'A. id Software', 'D. us']
};

var screenMan = function (screenName) {
    $(".question").empty();
    $(".choices").empty();
    if(screenName === "start") {
        $(".resetBtn").hide();
        var startHtml = "<h1> click start</h1>";
        $(".choices").html(startHtml);
    } else if (screenName === "isRight") {
        var correctHtml = "<h1> Nice Work! </h1>";
        $(".choices").html(correctHtml);
    } else if (screenName === "isWrong") {
        var incorrectHtml = "<h1> wrong, get ready for next question </h1>";
        $(".choices").html(incorrectHtml);
    } else if(screenName === "timeUp") {
        var timeHtml = "<h1> you didn't answer within the time limit!<h1>";
        $(".choices").html(timeHtml);
    } else if(screenName === "results") {
        resultsHtml = "<h1>Quiz Complete!</h1>" +
        "<h2>Results</h2>"+"<hr>"+
        "<div class='row'><div class='col'><h3>Correct: </h3><br>"+
        "<h3>Incorrect: </h3><br>"+
        "<h3>insufficent<br> time: </h3></div>"+
        "<div class='col text-right'><h3>"+ correct + "</h3><br><h3>"+ incorrect + "</h3><br><br><h3>"+ blank + "</h3></div></div>"; 

        $(".choices").html(resultsHtml);
        $(".resetBtn").show();
    }
}
var toLoopOrNotToLoop = function() {
    currentQuestion++;
    timeLimit = 30;

    if(currentQuestion === triviaData.questions.length) {
        screenMan("results");
    } else {
        setTimeout(() => {
            formGenerator(triviaData.questions[currentQuestion], triviaData.choices[currentQuestion]);
        }, 5000);
    }
}

var timer = function(prompt) {
    if(prompt === "start") {
        $(".timer").show().html("<h3>30 sec");
        updateClock = setInterval( function() {
            if(timeLimit > 0) {
                timeLimit--;
            } else if(timeLimit === 0) {
                timer("stop");
                screenMan("timeUp");
                blank++;
                toLoopOrNotToLoop();
            }
            $(".timer").html("<h3>" +timeLimit+ " sec</h3>");
        }, 1000);
    }
    if(prompt === "stop") {
        clearInterval(updateClock);
        $(".timer").hide();
    }
}

var formGenerator = function (ques, choices) {
    timer("start");
    $(".question").html("<h2 class='display-2'>"+ques+"</h2>");
    var choicesHtml = 
    "<h3 class='choice'>"+choices[0]+"</h3>"+
    "<h3 class='choice'>"+choices[1]+"</h3>"+
    "<h3 class='choice'>"+choices[2]+"</h3>"+
    "<h3 class='choice'>"+choices[3]+"</h3>";
    $(".choices").html(choicesHtml);
}
// shorthand for $(document).ready(function() { });
$(function () {
    //  Quiz logic
    screenMan("start");

    var clickedButton = $("button").on("click", function() {
        if($(this).hasClass("resetBtn")) {
            correct, incorrect, currentQuestion = 0;
            $(".resetBtn").hide();           
        }
        $(".startBtn").hide();
        formGenerator(triviaData.questions[currentQuestion], triviaData.choices[currentQuestion]);
    });

    var clickedChoice = $(document).on("click", ".choice", function() {
        timer("stop");

        if($(this).text() === triviaData.answers[currentQuestion]) {
            screenMan("isRight");
            correct++;
        } else {
            screenMan("isWrong");
            incorrect++;
        }
        toLoopOrNotToLoop();
    });
});