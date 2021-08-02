//array to store articl"s headings
var headings = [
    "",
    "Good Skill",
    "Beer Yoga",
    "Elephants or Avocados",
    "Bra skicklighet",
    "Beer Yoga",
    "Elefanter eller avokado"
];

//array to store the articls
var articls = [
    "",
    "Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake. Many experienced typists can feel or sense when they have made an error and can hit the Backspace key and make the correction with no increase in time between keystrokes.",
    "A brewery came up with a new way to exercise and it offered beer yoga classes. One class lasted 60 minutes and no more than 12 people could attend the same class. One class cost eight dollars and the price included one beer that people could drink during the class. Some people did not like yoga classes because they were boring for them. But they enjoyed beer yoga, which was more about meeting friends than exercising. It was their time for fun after work. Beer yoga started in the US in 2013 and it appeared in many parts of the world.",
    "Amboseli is a wildlife park. It is on the border between Kenya and Tanzania. 2,000 elephants and many other animals live there. Elephants need a lot of land. Three parks work together. Animals move freely in the parks. Then a company buys a piece of land near Amboseli. The company wants to grow avocados there. Many people love avocados. They are very healthy. Avocados become more popular every year. The farm manager says that many people will get a job on the farm. The farm will block the way between the parks. The elephants will not get to one of the parks. It is bad news for the park.",
    "Många pekskrivare använder också kortkommandon eller snabbtangenter när de skriver på en dator. Detta gör att de kan redigera sitt dokument utan att behöva ta händerna från tangentbordet för att använda en mus. Ett exempel på en kortkommando är att trycka på Ctrl-tangenten plus S-tangenten för att spara ett dokument medan de skriver, eller Ctrl-tangenten plus Z-tangenten för att ångra ett misstag. Många erfarna typister kan känna eller känna när de har gjort ett fel och kan trycka på Backspace-tangenten och göra korrigeringen utan att öka tiden mellan tangenttryckningarna.",
    "Ett bryggeri kom på ett nytt sätt att träna och det erbjöd ölyogakurser. En klass varade i 60 minuter och högst 12 personer kunde delta i samma lektion. En klass kostade åtta dollar och i priset ingår en öl som människor kunde dricka under lektionen. Vissa människor tyckte inte om yogakurser eftersom de var tråkiga för dem. Men de tyckte om ölyoga, som handlade mer om att träffa vänner än att träna. Det var deras tid för skoj efter jobbet. Ölyoga började i USA 2013 och den uppträdde i många delar av världen.",
    "Amboseli är en djurpark. Det är vid gränsen mellan Kenya och Tanzania. 2000 elefanter och många andra djur bor där. Elefanter behöver mycket mark. Tre parker fungerar tillsammans. Djur rör sig fritt i parkerna. Sedan köper ett företag en bit mark nära Amboseli. Företaget vill odla avokado där. Många älskar avokado. De är väldigt friska. Avokado blir mer populär varje år. Gårdschefen säger att många kommer att få jobb på gården. Gården kommer att blockera vägen mellan parkerna. Elefanterna kommer inte till någon av parkerna. Det är dåliga nyheter för parken."
];

//selecting required elements
var article = document.getElementById("article");
var words = document.getElementById("words_count");
var chars = document.getElementById("chars_count");
var inputbox = document.getElementById("typing-field");
var wpm_span = document.getElementById("wpm");
var error_span = document.getElementById("err");
var accuracy_span = document.getElementById("acc");
var time_p = document.getElementById("timer");

var ignoreCase = false;
var flag = true;
var total_errors = 0;
var accuracy = 0;
var wpm = 0;
var timer = 60;

//to store the user choice
function change_case_sensitivity(){
    ignoreCase = document.getElementById("box1").checked;
}

//change the article when the selected item from the dropdown list change
function change_article() {
    let list = document.getElementById("list");
    chosen_article = list.value;
    let header = document.getElementsByTagName("h2");

    header[0].innerText = headings[chosen_article];
    article.innerText = articls[chosen_article];
    //display how many words and chararcters each articl is
    words.innerText = articls[chosen_article].split(" ").length;
    chars.innerText = articls[chosen_article].length;

    inputbox.focus();
    if(!flag)reset_timer();
}


// separate each character and make an element out of each of them to individually style them
function prepare_article() {
    let temp = article.innerText;
    article.innerText = "";
    temp.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    article.appendChild(charSpan);
    });
    spans = article.childNodes;
}

function update_timer() {

    //calculate number of words per minute
    wpm = Math.round(article.innerText.substr(0,inputbox.value.length).split(" ").length/(60-timer) *60);
    if (timer > 0) {
        // change some style of the timer text just once
        if (timer == 60) {
            time_p.style.color = "red";
            time_p.style.backgroundColor = "cyan";
        }
        //decrement timer by 1 sec
        timer--;
        if (timer > 9)
            time_p.innerText = timer;
        else
        {
            time_p.innerText = "0" + String(timer);
        }
        // display wpm each 5 second to avoid disturbe user's eyes
        if(timer%5 == 0){
            wpm_span.innerText = wpm;
        }
    }
    // when times out
    else
    {
        time_p.innerText = "00";
        wpm_span.innerText = wpm;
        finish_test();
    }
}

//begin time interval
function start_timer() {
    if(flag){
        time_interval = setInterval(update_timer, 1000);
        flag = false;
    }
}

//process chararcters typed and updata data collected
function process_typed_char(){
    if(timer>0)
    {
        prepare_article();
        total_errors = 0;
        //compare the entered chars with original text
        inputbox.value.split('').forEach((char, i) => {
            let temp_typed_char = char;
            let temp_text_char = spans[i].innerText;
            if(ignoreCase)
            {
                temp_typed_char = temp_typed_char.toLowerCase();
                temp_text_char = temp_text_char.toLowerCase();
            }
            if(temp_typed_char == temp_text_char)
            {
                spans[i].className = "correct";
            }
            else
            {
                total_errors++;
                if(temp_text_char == " ")
                spans[i].className = "wrong-space";

                else
                spans[i].className = "wrong";
            }
        });
        let input = inputbox.value;
        let inputLength = input.length;
        //diplay errors count
        error_span.innerText = total_errors;
        //claculate accuracy and display it
        accuracy = Math.round(((inputLength - total_errors)/inputLength) *100) + "%";
       if(inputLength > 0)
           accuracy_span.innerText = accuracy;
       else
           accuracy_span.innerText = "--%"

    }
}

//finish up the test
function finish_test(){
    //terminate time interval
    clearInterval(time_interval);
    //remove focus from input field
    inputbox.blur();
}

// clean up variables values and prepare for another round
function reset_timer(){
    finish_test();
    inputbox.value="";
    time_p.innerText = "00:60";
    time_p.style.color = "cyan";
    time_p.style.backgroundColor = "";
    error_span.innerText = "0";
    accuracy_span.innerText = "100%";
    wpm_span.innerText = "0"
    flag  = true;
    total_errors = 0;
    accuracy = 0;
    wpm = 0;
    timer = 60;
    prepare_article();
    inputbox.focus();
}

//show English text and opitons in the dropdown list and hide the Swedish
function to_english(){
    en = document.getElementsByClassName('en');
    sw = document.getElementsByClassName('sw');
    for (let i = 0; i < 3; i++) {
        en[i].style.display = "block";
        sw[i].style.display = "none";
    }
}

//show Swedish text and opitons in the dropdown list and hide the English
function to_swedish(){
    let en = document.getElementsByClassName('en');
    let sw = document.getElementsByClassName('sw');
    for (let i = 0; i < 3; i++) {
        en[i].style.display = "none";
        sw[i].style.display = "block";
    }
}
