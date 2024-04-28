let params = new URLSearchParams(document.location.search);
let uuid = params.get("uuid");

fetch(
	`${root}/survey?uuid=${uuid}`, {
		method: "GET",
	}
)
.then(res => res.json())
.then(data => {
	survey = data;
	render_name_surveys(survey);
	render_question(survey);
})
.catch(res => console.error(res));


function render_name_surveys(survey) { // Добавление название опроса в заголовок
    let name_survey = survey["title"];
    
    const text_surveyName = document.createElement('p'); // создание элемента p
    text_surveyName.classList.add('survey_name_p');
    text_surveyName.innerHTML = name_survey; // Добавление текста в элемент p
    const container = document.querySelector('.name_survey'); // получение элемента container, в нём будет содержатся surveyName-название опроса
    container.appendChild(text_surveyName); // добавить элемент с названием опроса в new-survey
}


function render_question(survey) {
    for (let i = 0; i < survey.questions.length; i += 1) {

        let number_question = survey.questions[i]["title"];
        let text_q = survey.questions[i]["text"];
        const div_number_question = document.createElement('div'); // создание элемента div в котором будет номер вопроса
        div_number_question.classList.add('number_of_question_div'+i); //добавление класса этому элемента

        const text_number_question = document.createElement('p'); // создание элемента p с номером вопроса
        const text_question = document.createElement('p'); // создание элемента p где будет сам вопрос
        text_number_question.innerHTML = number_question;
        text_question.innerHTML = text_q; // Тут находится сам вопрос

        text_number_question.classList.add('number_question_p');
        text_question.classList.add('text_question_p');

        div_number_question.appendChild(text_number_question); // добавление в (div  div_number_question) двух элементов, которые показывают номер вопроса и текст вопроса
        div_number_question.appendChild(text_question); // добавление в (div  div_number_question) двух элементов, которые показывают номер вопроса и текст вопроса

        const container = document.querySelector('.list_task'); // получение элемента container, в него будут добавлены  div_number_question

        container.appendChild(div_number_question); // добавить элемент div_number_question (В котором находится и вопрос и текст вопроса) в new-survey
        // и того мы добавили container div в котором содержится что-то типо "Вопрос 1:"
        // далее с помощью цикла я переберу и выведу нужные мне варианты ответа на вопрос

        let count_answer = survey.questions[i]['answers'].length;
        for (let j = 0; j < count_answer; j += 1) { // В этом цикле буду перебирать все возможные варианты ответов
            let answ = survey.questions[i]['answers'][j]; // тут находится сам текст вопроса
            const text_answ = document.createElement('p');
            text_answ.innerHTML = answ; // помещаем  один из ответов на вопрос в файл
            text_answ.classList.add('text_answ_p');

            const container = document.querySelector('.number_of_question_div'+i);

            container.appendChild(text_answ);

        }
    }
}


// let passage_time = survey.time_to_pass*60;
// console.log(passage_time);


// function timer(){
//     const secondsElement = document.getElementById('seconds');

//     // Установить начальные значения
//     let seconds = passage_time;

//     // Создать интервал обновления таймера
//     const interval = setInterval(() => {
//     // Уменьшить секунды
//     seconds--;

//     // Если секунды достигли 0, отправить форму
//     if (seconds  === 0) {

//     }

//     // Обновить отображение таймера
//     secondsElement.innerHTML = seconds.toString().padStart(2, 0); // добавить нули к однозначным значениям секунд
//     }, 1000); // обновлять таймер каждую секунду
// }

// timer();