/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

const personalMovieDB = {
	count: 0,
	movies: {},
	actors: {},
	genres: [],
	privat: false,
	start: function () {
		this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

		while (this.count == '' || this.count == null || isNaN(this.count)) {
			this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
		}
	},

	rememberMyFilms: function () {
		for (let i = 0; i < 2; i++) {
			let q1, q2;
			do {
				q1 = prompt('Один из последних просмотренных фильмов?', '').trim();
				q2 = +prompt('На сколько оцените его?', '');
			} while (q1 === '' || isNaN(q2) || q1 === null || q2 === 0 || 50 < q1.length);
			this.movies[q1] = q2;
		}
	},

	detectPersonalLevel: function () {
		if (this.count < 10) {
			console.log('Просмотрено довольно мало фильмов');
		} else if (30 > this.count && this.count > 10) {
			console.log('Вы класический зритель');
		} else if (this.count > 30) {
			console.log('Вы киноман');
		} else {
			console.log('Произошла ошибка');
		}
	},

	showMyDB: function (property) {
		if (property === 'privat' && this[property] === false) {
			console.log(this);
		} else {
			console.log('Error showMyDB');
		}
	},

	writeYourGenres: function () {
		for (let i = 1; i <= 3; i++) {
			let q3;
			do {
				q3 = prompt(`"Ваш любимый жанр под номером ${i}"`);
			} while (q3 == null || q3 === '');
			this.genres.push(q3);
		}

		this.genres.forEach((genre, i) => {
			console.log(`'Любимый жанр ${i + 1} - это ${genre}'`);
		});
	},


	toggleVisibleMyDB: function () {
		if (this.privat) {
			this.privat = false;
		} else {
			this.privat = true;
		}
	}
};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB('privat');
personalMovieDB.writeYourGenres();
personalMovieDB.toggleVisibleMyDB();

