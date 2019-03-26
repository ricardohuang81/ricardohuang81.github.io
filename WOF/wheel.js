Array.prototype.randomize = function () {
    var i = this.length;
    if (i === 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = this[i];
        var tempj = this[j];
        this[i] = tempj;
        this[j] = tempi;
    }
};

Array.prototype.toObject = function () {
    var o = {};
    for (var i = 0; i < this.length; i++) {
        o[this[i]] = '';
    }
    return o;
};

function bindEvent(el, eventName, eventHandler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

function div(parent, className) {
    var r = document.createElement('div');
    r.className = className;
    parent.appendChild(r);
    return r;
}
var WordDisplay = (function () {
    var display = document.getElementById('display'),
        characters;

    function WordDisplay(puzzle) {
        characters = [];
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
        }
        var word = div(display, 'word');
        for (var i = 0; i < puzzle.length; ++i) {
            if (puzzle[i] == ' ') {
                characters.push(div(display, 'space'));
                word = div(display, 'word');
            } else {
                characters.push(div(word, 'letter'));

            }
        }
        div(display, 'clear');
    }
    WordDisplay.prototype.showLetter = function (i, letter) {
        characters[i].innerHTML = letter;
    };
    return WordDisplay;
})();
var Wheel = (function () {
    var wheel = document.getElementById('wheel'),
        wheelValues = [5000, 600, 500, 300, 500, 800, 550, 400, 300, 900, 500, 300, 900, 0, 600, 400, 300, -2, 800, 350, 450, 700, 300, 600],
        spinTimeout = false,
        spinModifier = function () {
            return Math.random() * 10 + 20;
        },
        modifier = spinModifier(),
        slowdownSpeed = 0.5,
        prefix = (function () {
            if (document.body.style.MozTransform !== undefined) {
                return "MozTransform";
            } else if (document.body.style.WebkitTransform !== undefined) {
                return "WebkitTransform";
            } else if (document.body.style.OTransform !== undefined) {
                return "OTransform";
            } else {
                return "";
            }
        }()),
        degreeToRadian = function (deg) {
            return deg / (Math.PI * 180);
        };

    function Wheel(){}

    Wheel.prototype.rotate = function (degrees) {
        var val = "rotate(-" + degrees + "deg)";
        if (wheel.style[prefix] !== undefined) wheel.style[prefix] = val;
        var rad = degreeToRadian(degrees % 360),
            filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + rad + ", M12=-" + rad + ", M21=" + rad + ", M22=" + rad + ")";
        if (wheel.style.filter !== undefined) wheel.style.filter = filter;
        wheel.setAttribute("data-rotation", degrees);
    };

    Wheel.prototype.addEventListener = function (eventName, eventHandler) {
        wheel.addEventListener(eventName, eventHandler, false);
    }

    Wheel.prototype.spin = function (callback, amount) {
        var _this = this;
        clearTimeout(spinTimeout);
        modifier -= slowdownSpeed;
        if (amount === undefined) {
            amount = parseInt(wheel.getAttribute('data-rotation'), 10);
        }
        this.rotate(amount);
        if (modifier > 0) {
            spinTimeout = setTimeout(function () {
                _this.spin(callback, amount + modifier);
            }, 1000 / 5);
        } else {
            var dataRotation = parseInt(wheel.getAttribute('data-rotation'), 10);
            modifier = spinModifier();
            var divider = 360 / wheelValues.length;
            var offset = divider / 2;
            var wheelValue = wheelValues[Math.floor(Math.ceil((dataRotation + offset) % 360) / divider)];
            switch (wheelValue) {
                case 0:
                    return callback(0);
                case -1:
                    return callback("FREE SPIN!");
                case -2:
                    return callback("LOSE A TURN!");
                default:
                    return callback(wheelValue);
            }
        }
    };
    return Wheel;
})();

var WheelGame = (function () {
    var wheel = new Wheel(),
        vowels = ['A', 'E', 'I', 'O', 'U'],
        wordDisplay,
        spinWheel = document.getElementById('spin'),
        buyVowel = document.getElementById('vowel'),
        newButton = document.getElementById('newpuzzle'),
        money = document.getElementById('money'),
        solve = document.getElementById('solve');

    function WheelGame(puzzles) {
        var _this = this;
        this.puzzles = puzzles;
        this.puzzles.randomize();
        this.currentMoney = 0;
        this.puzzleSolved = false;

        bindEvent(buyVowel, "click", function () {
            if (_this.currentMoney > 200) {
                if (_this.createGuessPrompt("ENTER A VOWEL", true) !== false) {
                    _this.currentMoney -= 200;
                    _this.updateMoney();
                }
            } else {
                alert("YOU NEED $200 TO BUY A VOWEL!");
            }
        });
        bindEvent(newButton, "click", function () {
            _this.currentMoney = 0;
            _this.updateMoney();
            _this.newRound();
        });
        var spinTheWheel = function () {
            wheel.spin(function (valueSpun) {
                if (isNaN(valueSpun)) {
                    alert(valueSpun);
                } else {
                    if (valueSpun === 0) {
                        alert("OH NO, YOU'RE BANKRUPT!");
                        _this.currentMoney = 0;
                    } else {
                        var amountFound = _this.createGuessPrompt(valueSpun);
                        _this.currentMoney += (valueSpun * amountFound);
                    }
                    _this.updateMoney();
                }
            });
        };
        bindEvent(spinWheel, "click", spinTheWheel);
        bindEvent(wheel, "click", spinTheWheel);

        function arrays_equal(a, b) {
            return !(a < b || b < a);
        }

        bindEvent(solve, "click", function () {
            if (!_this.puzzleSolved) {
                var solve = prompt("WHAT DO YOU GOT?");
                if (solve) {
                    guess = solve.toUpperCase().split("");
                    if (arrays_equal(guess, _this.currentPuzzleArray)) {
                        for (var i = 0; i < guess.length; ++i) {
                            _this.guessLetter(guess[i], false, true);
                        }
                    }
                    if (!_this.puzzleSolved) {
                        alert("NOT QUITE, MY FRIEND, KEEP AT IT!");
                    }
                }
            }
        });
        this.startRound(0);
    }

    WheelGame.prototype.updateMoney = function () {
        money.innerHTML = this.currentMoney;
    };

    WheelGame.prototype.guessLetter = function (guess, isVowel, solvingPuzzle) {
        var timesFound = 0;
        solvingPuzzle = solvingPuzzle === undefined ? false : true;
        if (guess.length && !this.puzzleSolved) {
            if (!solvingPuzzle && !isVowel && (guess in vowels.toObject())) {
                alert("CAN'T GUESS A VOWEL RIGHT NOW!");
                return false;
            }
            if (!solvingPuzzle && isVowel && !(guess in vowels.toObject())) {
                alert("CAN'T GUESS A CONSONANT RIGHT NOW!");
                return false;
            }
            if (guess in this.guessedArray) {
                return 0;
            }
            for (var i = 0; i < this.currentPuzzleArray.length; ++i) {
                if (guess == this.currentPuzzleArray[i]) {
                    wordDisplay.showLetter(i, guess);
                    ++timesFound;
                }
            }
            if (timesFound > 0) {
                this.guessedArray.push(guess);
                if (this.guessedArray.length == this.lettersInPuzzle.length) {
                    alert("YOU WON WHEEL OF FORTUNE 😍🤗😁");
                    this.puzzleSolved = true;
                }
            }
            return timesFound;
        }
        return false;
    };

    var guessTimes = 0;
    WheelGame.prototype.createGuessPrompt = function (valueSpun, isVowel) {
        
        isVowel = isVowel === undefined ? false : true;
        if (!this.puzzleSolved) {
            var letter;
            if (isVowel) {
                letter = prompt("PLEASE ENTER A VOWEL", "");
            } else {
                letter = prompt("YOU SPUN $" + valueSpun + ", PLEASE ENTER A CONSONANT!");
            }
            
            if (letter) {
                var guess = letter.toUpperCase().charAt(0);
                var timesFound = this.guessLetter(guess, isVowel);
                if (timesFound === false) {
                    ++guessTimes;
                    if (guessTimes < 5) {
                        return this.createGuessPrompt(valueSpun, isVowel);
                    }
                }
                guessTimes = 0;
                return timesFound;
            } else {
                ++guessTimes;
                if (guessTimes < 5) {
                    return this.createGuessPrompt(valueSpun, isVowel);
                } else {
                    guessTimes = 0;
                }
            }
        }
        return false;
    };

    WheelGame.prototype.newRound = function () {
        var round = ++this.round;
        if (round < this.puzzles.length) {
            this.startRound(round);
        } else {
            alert("No more puzzles!");
        }
    };

    WheelGame.prototype.startRound = function (round) {
        this.currentMoney = 0;
        this.round = round;
        this.lettersInPuzzle = [];
        this.guessedArray = [];
        this.puzzleSolved = false;
        this.currentPuzzle = this.puzzles[this.round].toUpperCase();
        this.currentPuzzleArray = this.currentPuzzle.split("");
        for (var i = 0; i < this.currentPuzzleArray.length; i++) {
            if (!(this.currentPuzzleArray[i] in this.lettersInPuzzle)) {
                this.lettersInPuzzle.push(this.currentPuzzleArray[i]);
            }
        }
        wordDisplay = new WordDisplay(this.currentPuzzleArray);
    };

    return WheelGame;
})();

var Game = new WheelGame([
    "doctor strange", "avengers", "jeopardy",
    "marvel cinematic universe", "dc universe", "saturday night live", "vanna white", "stan lee",
    "shazam", "michael jordan", "robert mueller"
]);