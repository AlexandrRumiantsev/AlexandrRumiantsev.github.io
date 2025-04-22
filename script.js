// https://snipp.ru/js/translit-js?ysclid=m9sbwo8hpr476750400
// https://api.agify.io/?name=%D0%BC%D0%B0%D1%80%D1%83%D1%81%D1%8F - не работает с русскими
// https://api.genderize.io/?name=%D0%BC%D0%B0%D1%80%D1%83%D1%81%D1%8F
// https://api.nationalize.io/?name=%D0%BC%D0%B0%D1%80%D1%83%D1%81%D1%8F

function translit(word){
	var answer = '';
	var converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
		'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
	};
 
	for (var i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}
 
	return answer;
}


async function  start() {
	const nameInput = document.getElementById('name')
	const name = translit(nameInput.value);

	Promise.all([
		await fetch(`https://api.agify.io/?name=${name}`), 
		await fetch(`https://api.genderize.io/?name=${name}`), 
		await fetch(`https://api.nationalize.io/?name=${name}`)
	])
	.then(responses => Promise.all(responses.map(res => res.json())))
	.then((values) => {
		console.log(values);

		const ageInput = document.getElementById('age');
		ageInput.value = values[0].age;

		const genderInput = document.getElementById('gender')
		genderInput.value = values[1].gender

	  	const nationaliteSelect = document.getElementById('national')
		// Предварительно очищаем селект
	  	nationaliteSelect.innerHTML = '';
	  	
		// Заполняем селект
		values[2].country.forEach(option => {
		    let opt = document.createElement('option'); 
		    opt.value = option.country_id;                   
		    opt.textContent = option.country_id;             
		    nationaliteSelect.appendChild(opt);   
		});
	});

};

document.getElementById('fillOut').addEventListener('click', (e) => {
	e.preventDefault();
	start();
})
