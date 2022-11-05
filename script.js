const question_text = document.querySelector(".question");

const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const button4 = document.querySelector(".button4");

const buttons1 = document.querySelector(".buttons1");
const buttons2 = document.querySelector(".buttons2");

var questions = [];

fetch("https://opentdb.com/api.php?amount=10&type=multiple")
.then((response)=>response.json())
.then((data) => {
    questions = data.results;
    start_game();
})

var q_index = 0;
function start_game(){
    //console.log(questions)
    question(q_index);
}

function question(index){
    button1.classList.remove("wrong");
    button1.classList.remove("correct");

    button2.classList.remove("wrong");
    button2.classList.remove("correct");

    button3.classList.remove("wrong");
    button3.classList.remove("correct");

    button4.classList.remove("wrong");
    button4.classList.remove("correct");
    var randomIndex = [];
    var wrongAnswers = questions[index].incorrect_answers;
    var answer = questions[index].correct_answer;
    //litle hack to decode special characters hehehe by jason :)
    var txt = document.createElement("textarea");
    txt.innerHTML = questions[index].question;
    question_text.innerHTML = txt.value;

    if(questions[index].type == "multiple"){
        buttons2.style.display = "grid";

        randomIndex.push(Math.floor(Math.random() * (wrongAnswers.length + 1)))
        
        //button1.innerText = wrongAnswers[random];
        for(var i = 0; i < 3; i++){
            var random = Math.floor(Math.random() * (wrongAnswers.length + 1));
            if(randomIndex.includes(random)){
                var include = false;
                var count = 0;
                while(include == false){
                    if(count > 100){
                        break;
                    }
                    var random = Math.floor(Math.random() * (wrongAnswers.length + 1));
                    if(randomIndex.includes(random)){
                        continue;
                    }else{
                        randomIndex.push(random);
                        include = true;
                        console.log("broke because got it")
                        break;
                    }
                    count++
                }
            }else{
                randomIndex.push(random);
            }
            
        }



        console.log(questions[0]);
        var count = 0;
        for(var i = 0; i < randomIndex.length; i++){
            const button = document.querySelector(`.button${randomIndex[i] + 1}`);

            if(i == 0){
                txt.innerHTML = answer;
                button.innerText = txt.value;
                button.id = "";
                button.id="correct-answer";
                button.addEventListener("click",() =>{
                    Clickanswer(1);
                });
            }else{
                txt.innerHTML =wrongAnswers[count];
                button.innerText = txt.value;
                button.id = "";
                button.id = `incorrect-answer-${count}`;
                count++;
                button.addEventListener("click",() =>{
                    Clickanswer(0, button.id);
                });
                
            }
        }

    }else{
        buttons2.style.display = "none";
        document.querySelector(".button1").innerText = "True";
        document.querySelector(".button2").innerText = "False";
    }
}

function Clickanswer(index,id){
    if(index == 1){
        document.getElementById("correct-answer").classList.add("correct");
        setTimeout(() => {
            q_index++;
            if(q_index == 10){
                console.log("done")
            }
            question(q_index); 
        }, 1500);

        
        
    }else{
        document.getElementById("correct-answer").classList.add("correct");
        document.getElementById(id).classList.add("wrong");
        setTimeout(() => {
            q_index++;
            question(q_index); 
        }, 1500);
    }
}