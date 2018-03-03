const timelimit = 30;
let correct = 0;
let incorrect = 0;
var currentQuestion = 0;

var triviaData = {
    questions: ['What year was the Sega DreamCast realeased ?',
        'Who developed the game "DOOM" ?',
        'All your base belongs to who?' 
    ],
    choices: [['A. 1997', 'B. 1998', 'C. 1996', 'D. 2000'],
        ['A. id Software', 'B. Bethesda', 'C. BioWare', 'D. Blizzard'],
        ['A. me', 'B. you?', 'C. George Bush', 'D. us'
    ]],
    answers: ['B. 1998', 'A. id Software', 'D. us']
};


// shorthand for $(document).ready(function() { });
$(function () {
    
    // function-ality
    var screenMan = function (screenName) {
        $(".question").empty();
        $(".choices").empty();
        if(screenName === "start") {
            var startHtml = "<h1> click start</h1>" + "<button class='btn-lg btn-dark startBtn'>Start</button>";
            $(".choices").html(startHtml);
        } else if (screenName === "isRight") {
            var correctHtml = "<h1> Nice Work! </h1>";
            $(".choices").html(correctHtml);
        } else if (screenName === "isWrong") {
            var incorrectHtml = "<h1> wrong, get ready for next question </h1>";
            $(".choices").html(incorrectHtml);
        }
    }

    var formGenerator = function (ques, choices) {
        $(".question").html("<div class='choice'>"+ques+"</div>");
        var choicesHtml = 
        "<div class='choice'>"+choices[0]+"</div>"+
        "<div class='choice'>"+choices[1]+"</div>"+
        "<div class='choice'>"+choices[2]+"</div>"+
        "<div class='choice'>"+choices[3]+"</div>";
        $(".choices").html(choicesHtml);
    }
    screenMan("start");

    var clickedStart = $(".startBtn").on("click", function() {
        // render question and choices
        formGenerator(triviaData.questions[0], triviaData.choices[0]);
    });

    var clickedChoice = $(document).on("click", ".choice", function() {
        if($(this).text() === triviaData.answers[currentQuestion]) {
            screenMan("isRight");
            correct++;
        } else {
            screenMan("isWrong");
            incorrect++;
        }

    });
    var timer = function () {
        var clock = setInterval(timelimit, 1000);
    }









});