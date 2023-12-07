
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

function calculateDivision(calculatorNumber) {
    var num1 = parseFloat(document.getElementById('num1_' + calculatorNumber).value);
    var num2 = parseFloat(document.getElementById('num2_' + calculatorNumber).value);
    var resultElement = document.getElementById('result_' + calculatorNumber);

    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
        var result;

        if (calculatorNumber === 1) {
            // Calculator 1 conditions
            result = (num1 / num2) * 100;

            if (result > 8) {
                resultElement.style.color = 'green';
                resultElement.innerText = 'Результат: ' + result.toFixed(2) + '% - Оптимальне!';
            } else if (result > 1) {
                resultElement.style.color = 'orange';
                resultElement.innerText = 'Результат: ' + result.toFixed(2) + '% - Незадовільне!';
            } else {
                resultElement.style.color = 'red';
                resultElement.innerText = 'Результат: ' + result.toFixed(2) + '% - Критичний!';
            }
        } else if (calculatorNumber === 2) {
            // Calculator 2 conditions
            result = num1 / num2;

            resultElement.style.color = 'black';
            resultElement.innerText = 'Результат: ' + result.toFixed(2) + ` грошових одиниць`;
        }

    } else if (num2 === 0) {
        resultElement.style.color = 'red';
        resultElement.innerText = 'Неможливо поділити на 0!';
    } else {
        resultElement.style.color = 'black';
        resultElement.innerText = 'Будь ласка, ведіть правильні числа.';
    }
}

const quizData = [
    {
      question: 'Як впливає страховий ринок на економіку країни?',
      options: ['Збільшує загальний ризик', 'Знижує економічну активність', 'Зменшує фінансові ризики і сприяє стабільності', 'Має мінімальний вплив на економіку'],
      answer: 'Зменшує фінансові ризики і сприяє стабільності',
    },
    {
      question: 'Які існують форми страхування?',
      options: ['Життя і ризикове', 'Добровільне та обов’язкове', 'Майнове, особисте, відповідальності', 'Медичне та від нещасних випадків'],
      answer: 'Добровільне та обов’язкове',
    },
    {
      question: 'Як визначається ступінь проникнення страхування в економіці країни?',
      options: ['Вартість найбільшого страхового поліса', 'Кількість страхових компаній у країні', ' Відсоток населення, яке використовує страхові послуги', 'Загальний обсяг страхових виплат'],
      answer: 'Відсоток населення, яке використовує страхові послуги',
    },
    {
      question: 'Що таке перестрахування?',
      options: ['Страхування для розважальних заходів', 'Страхування тільки для бізнесу', 'Страхування, придбане страховими компаніями', 'Страхування на випадок рідкісних подій'],
      answer: 'Страхування, придбане страховими компаніями',
    },
    {
      question: 'Що означає термін "страхові премії ?',
      options: [
        'Спеціальний податок на страхові послуги',
        'Відсоток річних прибутків страхової компанії від усіх укладених полісів',
        'Ринковий курс валют для страхових послуг',
        'Сума грошей, яку страхувальники сплачують за страхові послуги',
      ],
      answer: 'Сума грошей, яку страхувальники сплачують за страхові послуги',
    },
   
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();

