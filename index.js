const quiz = [
    {
        question: "Capital of India?",
        options: ["Mumbai", "Delhi", "Pune", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    }
];

let current = 0;
let score = 0;

function loadQuestion() {
    let q = quiz[current];

    document.getElementById("question").innerText = q.question;
    document.getElementById("result").innerText = "";

    let buttons = "";

    q.options.forEach(option => {
        buttons += `
            <button onclick="checkAnswer('${option}')">
                ${option}
            </button>`;
    });

    document.getElementById("options").innerHTML = buttons;
}

function checkAnswer(option) {
    if(option === quiz[current].answer){
        score++;
        document.getElementById("result").innerHTML = "✅ Correct!";
    }
    else{
        document.getElementById("result").innerHTML =
            `❌ Wrong! Correct Answer: ${quiz[current].answer}`;
    }

    current++;

    setTimeout(() => {
        if(current < quiz.length){
            loadQuestion();
        }
        else{
            let percentage = (score / quiz.length) * 100;

            document.getElementById("question").innerHTML =
                "🎉 Quiz Completed!";
            document.getElementById("options").innerHTML = "";
            document.getElementById("result").innerHTML =
                `Score: ${score}/${quiz.length}<br>
                 Percentage: ${percentage}%`;
        }
    }, 1200);
}

loadQuestion();