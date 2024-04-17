let fullscr = 0;

class QuizTracker {
    
	
	openFullscreen() {
        console.log("openFullscreen called");
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
    updateAnswerMenu() {
        console.log("updateAnswerMenu called");

        let menu = document.getElementById('answerMenu');
        menu.innerHTML = '';
        // Determine the number of circles to display based on viewport width
    let numCircles;
    if (window.innerWidth <= 480) { // For mobile devices
        numCircles = 3;
    } else if (window.innerWidth <= 768) { // For tablets
        numCircles = 5;
    } else { // For desktop
        numCircles = 6;
    }

    let start = Math.max(0, this.user_inputs.length - numCircles);
    for (let i = start; i < this.user_inputs.length; i++) {
        let color;
            switch (this.user_inputs[i]) {
                case '+':
                    color = '#82cd37';
                    break;
                case '-':
                    color = 'hsl(0, 94%, 64%)';
                    break;
                case '.':
                    color = '#f7da36';
                    break;
            }
            let circle = document.createElement('ansButton');
            circle.style.backgroundColor = color;
            circle.textContent = i + 1;
            menu.appendChild(circle);
            circle.classList.add('ansButton');
        }
        // Add a "View All" button at the end
        let viewAllButton = document.createElement('button');
        viewAllButton.textContent = 'View All';
        viewAllButton.addEventListener('click', () => this.displayFullAnswerMenu());
        menu.appendChild(viewAllButton);
        // viewAllButton.classList.add(viewAllButton);
    }


    
    // Add a new method to display all the circles in a new blank menu
    displayFullAnswerMenu() {
        console.log("displayFullAnswerMenu called");
        
        // When the results are ready to be displayed
var quizTracker = document.getElementById('quizTracker');
var currentHeight = quizTracker.offsetHeight;
var currentWidth = quizTracker.offsetWidth;

// Set the height to the current height
quizTracker.style.height = currentHeight + 'px';
quizTracker.style.width = currentWidth + 'px';



        let menu = document.getElementById('fullAnswerMenu');
        menu.innerHTML = '';
        for (let i = 0; i < this.user_inputs.length; i++) {
            let color;
            switch (this.user_inputs[i]) {
                case '+':
                    color = '#82cd37';
                    break;
                case '-':
                    color = 'hsl(0, 94%, 64%)';
                    break;
                case '.':
                    color = '#f7da36';
                    break;
            }
            let circle = document.createElement('fullAnsButton');
            circle.style.backgroundColor = color;
            circle.classList.add('ansButton');
            circle.textContent = i + 1;
            menu.appendChild(circle);
        }
        // Add a "Close" button at the end
        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => this.hideFullAnswerMenu());
        // Create a new line
    let br = document.createElement('br');
    menu.appendChild(br);
    
    
    menu.appendChild(closeButton);
    
        // Hide the control panel and results
        document.getElementById('controlPanel').style.display = 'none';
        document.getElementById('results').style.display = 'none';
        document.getElementById('ansCanal').style.display = 'none';

        menu.style.display = 'block';
        // Auto scroll to the bottom
    menu.scrollTop = menu.scrollHeight;
    // Get the fullAnswerMenu element
let fullAnswerMenu = document.getElementById('fullAnswerMenu');

// Check if the transparentDiv already exists
let transparentDiv = document.getElementById('transparentDiv');
if (!transparentDiv) {
    // Create a new div element
    transparentDiv = document.createElement('div');
    transparentDiv.id = 'transparentDiv'; // Set an id for the div

    // Append the div to the body
    document.body.appendChild(transparentDiv);
}

// Get the position of the fullAnswerMenu relative to the viewport
let rect = fullAnswerMenu.getBoundingClientRect();

// Set the style of the div
transparentDiv.style.position = 'absolute'; 
transparentDiv.style.top = rect.top + 'px'; // Use rect.top instead of offsetTop
transparentDiv.style.left = rect.left + 'px'; // Use rect.left instead of offsetLeft
transparentDiv.style.width = fullAnswerMenu.offsetWidth + 'px'; 
transparentDiv.style.height = fullAnswerMenu.offsetHeight + 'px'; 
transparentDiv.style.backgroundColor = 'rgba(150, 0, 0, 0)'; 
transparentDiv.style.overflowY = 'auto'; 
transparentDiv.style.pointerEvents = 'none'; 
transparentDiv.style.boxShadow = 'inset 0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.638)';
transparentDiv.style.borderRadius = '3rem';
transparentDiv.style.mixBlendMode = 'multiply';
transparentDiv.style.display = 'block';

    
    }
    
    

    // Add a new method to hide the full answer menu
    hideFullAnswerMenu() {
        console.log("hideFullAnswerMenu called");

        let menu = document.getElementById('fullAnswerMenu');
        menu.style.display = 'none';
    
        // Show the control panel and results
        let controlPanel = document.getElementById('controlPanel');
        controlPanel.style.display = 'flex';
        controlPanel.style.flexDirection = 'row'; // Add this line
        document.getElementById('ansCanal').style.display = 'block';

        document.getElementById('results').style.display = 'block';
        // Set the height to the current height
quizTracker.style.height = '';
quizTracker.style.width = '';
transparentDiv.style.display = 'none';

    }
    goFullscreen() {
        console.log("goFullscreen called");

        this.openFullscreen();
    }
    aFullscreen() {
        console.log("aFullscreen called");

        if (fullscr === 0) {
            this.openFullscreen();
            document.getElementById('ansCanal').style.display = 'block';
            fullscr = 1;
            
            
        }

        
    }
    
    constructor() {
        this.questions_attempted = 0;
        this.questions_not_attempted = 0;
        this.correct_answers = 0;
        this.incorrect_answers = 0;
        this.user_inputs = [];
		this.history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        this.correct_answer_value = Number(localStorage.getItem("correct_answer_value")) || 5; // default value
        this.incorrect_answer_value = Number(localStorage.getItem("incorrect_answer_value")) || -1; // default value
    }
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
	reset() {
        this.history.push({
            timestamp: new Date().toISOString(),
            results: {
                questions_attempted: this.questions_attempted,
                questions_not_attempted: this.questions_not_attempted,
                correct_answers: this.correct_answers,
                incorrect_answers: this.incorrect_answers,
                total_marks: this.calculate_total_marks(),
                max_marks: this.calculate_max_marks(),
                percentage: this.calculate_percentage(),
                nonnegative_percentage: this.calculate_nonnegative_percentage()
            }
        });
        localStorage.setItem('quizHistory', JSON.stringify(this.history));
        this.questions_attempted = 0;
        this.questions_not_attempted = 0;
        this.correct_answers = 0;
        this.incorrect_answers = 0;
        this.user_inputs = [];
        this.display_results();
    }
    display_history() {
        let historyText = this.history.map((entry, index) => 
            `Quiz ${index + 1} (${new Date(entry.timestamp).toLocaleString()}):\n` +
            `Questions Attempted: ${entry.results.questions_attempted}\n` +
            `Questions Not Attempted: ${entry.results.questions_not_attempted}\n` +
            `Correct Answers: ${entry.results.correct_answers}\n` +
            `Incorrect Answers: ${entry.results.incorrect_answers}\n` +
            `Total Marks: ${entry.results.total_marks}/${entry.results.max_marks}\n` +
            `Percentage: ${entry.results.percentage.toFixed(2)}%\n` +
            `Nonnegative Percentage: ${entry.results.nonnegative_percentage.toFixed(2)}%\n`
        ).join('\n');
        let blob = new Blob([historyText], {type: "text/plain;charset=utf-8"});
        let url = URL.createObjectURL(blob);
        window.open(url);
    }
    update_correct_answers() {
        this.correct_answers += 1;
        this.questions_attempted += 1;
        this.user_inputs.push('+');
        this.display_results();
        this.updateAnswerMenu();
    }
    update_incorrect_answers() {
        this.incorrect_answers += 1;
        this.questions_attempted += 1;
        this.user_inputs.push('-');
        this.display_results();
        this.updateAnswerMenu();
    }
    update_not_attempted() {
        this.questions_not_attempted += 1;
        this.user_inputs.push('.');
        this.display_results();
        this.updateAnswerMenu();
    }
     calculate_positive_marks() {
        return this.correct_answers * this.correct_answer_value;
    }
    calculate_negative_marks() {
        return this.incorrect_answers * this.incorrect_answer_value;
    }
    calculate_total_marks() {
        return this.calculate_positive_marks() + this.calculate_negative_marks();
    }
    calculate_max_marks() {
        return (this.questions_attempted + this.questions_not_attempted) * this.correct_answer_value;
    }
    calculate_percentage() {
        return (this.calculate_total_marks() / this.calculate_max_marks()) * 100;
    }
    calculate_nonnegative_percentage() {
        return (this.calculate_positive_marks() / this.calculate_max_marks()) * 100;
    }
    display_results() {
    let total_marks = this.calculate_total_marks();
    let max_marks = this.calculate_max_marks();
    let percentage = (total_marks / max_marks) * 100;
    let nonnegative_percentage = (this.calculate_positive_marks() / max_marks) * 100;

    let resultsText = `
        Quiz Results\n
        Questions Attempted: ${this.questions_attempted}\n
        Questions Not Attempted: ${this.questions_not_attempted}\n
        Correct Answers: ${this.correct_answers}\n
        Incorrect Answers: ${this.incorrect_answers}\n
        Positive Marks: ${this.calculate_positive_marks()}\n
        Negative Marks: ${this.calculate_negative_marks()}\n
        Total Marks: ${total_marks}/${max_marks}\n
        Percentage: ${percentage.toFixed(2)}%\n
        If No Negative Marking: ${this.calculate_positive_marks()}/${max_marks}\n
        Nonnegative Percentage: ${nonnegative_percentage.toFixed(2)}%\n`;

    let blob = new Blob([resultsText], {type: "text/plain;charset=utf-8"});
    let url = URL.createObjectURL(blob);

    document.getElementById('results').innerHTML = `
        <div id="tableWrapper" class="tab">
            <table>
                <tr><th colspan="3" class="embossed">Quiz Results</th></tr>
                <tr><td>Questions Attempted:</td><td>${this.questions_attempted}</td><td>Questions Not Attempted:</td><td>${this.questions_not_attempted}</td></tr>
                <tr><td>Correct Answers:</td><td>${this.correct_answers}</td><td>Incorrect Answers:</td><td>${this.incorrect_answers}</td></tr>
                <tr><td>Positive Marks:</td><td>${this.calculate_positive_marks()}</td><td>Negative Marks:</td><td>${this.calculate_negative_marks()}</td></tr>
                <tr><th colspan="3" class="embossed">Total Marks</th></tr>
                <tr><td colspan="2">${total_marks}/${max_marks}</td></tr>
                <tr><td colspan="2">${percentage.toFixed(2)}%</td></tr>
                <tr><th colspan="3" class="embossed">If No Negative Marking</th></tr>
                <tr><td colspan="2">${this.calculate_positive_marks()}/${max_marks}</td></tr>
                <tr><td colspan="2">${nonnegative_percentage.toFixed(2)}%</td></tr>
        

            </table>
             
        </div>`;
        
}



}

let quiz = new QuizTracker();

function updateCorrectAnswers() {
    quiz.update_correct_answers();
    if (document.getElementById('fullAnswerMenu').style.display === 'block') {
        quiz.displayFullAnswerMenu();
    }
}

function updateIncorrectAnswers() {
    quiz.update_incorrect_answers();
    if (document.getElementById('fullAnswerMenu').style.display === 'block') {
        quiz.displayFullAnswerMenu();
    }
}

function updateNotAttempted() {
    quiz.update_not_attempted();
    if (document.getElementById('fullAnswerMenu').style.display === 'block') {
        quiz.displayFullAnswerMenu();
    }
}
document.getElementById('answerMenuButton').addEventListener('click', () => {
    console.log("answerMenuButton clicked");

    let menu = document.getElementById('ansCanal');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
    
});

// document.getElementById('closeButton').addEventListener('click', () => {
//     console.log("closeButton clicked");

//     document.getElementById('fullAnswerMenu').style.display = 'none';
// });
document.getElementById('fullScreen').addEventListener('click', () => quiz.goFullscreen());
document.getElementById('resetButton').addEventListener('click', () => quiz.reset());
document.getElementById('historyButton').addEventListener('click', () => quiz.display_history());
document.getElementById('closeButton').addEventListener('click', () => quiz.hideFullAnswerMenu());
document.getElementById('settingsButton').addEventListener('click', () => {
    let correct_value = prompt("Enter the value for a correct answer:", quiz.correct_answer_value);
    let incorrect_value = prompt("Enter the value for an incorrect answer:", quiz.incorrect_answer_value);
    if (correct_value !== null && incorrect_value !== null) {
        quiz.correct_answer_value = Number(correct_value);
        quiz.incorrect_answer_value = Number(incorrect_value);
        localStorage.setItem("correct_answer_value", correct_value);
        localStorage.setItem("incorrect_answer_value", incorrect_value);
    }
});
