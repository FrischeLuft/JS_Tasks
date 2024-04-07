/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFilms;

function start() {
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

	while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
		numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
	}
}

start();

const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false
};

function rememberMyFilms() {
	for (let i = 0; i < 2; i++) {
		let q1, q2;
		do {
			q1 = prompt('Один из последних просмотренных фильмов?', '');
			q2 = +prompt('На сколько оцените его?', '');
		} while (q1 === '' || isNaN(q2) || q1 === null || q2 === 0 || 50 < q1.length);
		personalMovieDB.movies[q1] = q2;
	}
}

rememberMyFilms();

function detectPersonalLevel() {
	if (personalMovieDB.count < 10) {
		console.log('Просмотрено довольно мало фильмов');
	} else if (30 > personalMovieDB.count && personalMovieDB.count > 10) {
		console.log('Вы класический зритель');
	} else if (personalMovieDB.count > 30) {
		console.log('Вы киноман');
	} else {
		console.log('Произошла ошибка');
	}
}

detectPersonalLevel();

function showMyDB(property) {
	if (property === 'privat' && personalMovieDB[property] === false) {
		console.log(personalMovieDB);
	} else {
		console.log('Error showMyDB');
	}
}

showMyDB('privat');

function writeYourGenres() {
	for (let i = 1; i <= 3; i++) {
		let q3 = prompt(`"Ваш любимый жанр под номером ${i}"`);
		if (isNaN(q3) && q3 !== null && q3 !== undefined && q3 !== '') {
			personalMovieDB['genres'].push(q3);
		} else {
			console.log('Error writeYourGenres');
		}
	}
}

writeYourGenres();