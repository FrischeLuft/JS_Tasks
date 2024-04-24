/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
	movies: [
		'Логан',
		'Лига справедливости',
		'Ла-ла лэнд',
		'Одержимость',
		'Скотт Пилигрим против...',
		'Армагедон'
	]
};

movieDB.movies.sort();

const interactiveList = document.querySelector('.promo__interactive-list');
interactiveList.innerHTML = '';
let count = 1;
movieDB.movies.forEach(function (item) {
	let li = document.createElement('li');
	li.textContent = `${count}. ${item}`;
	li.classList.add('promo__interactive-item');

	interactiveList.appendChild(li);
	count++;
});

const promoElements = document.getElementsByClassName('promo__adv');
const promoArray = Array.from(promoElements);

promoArray.forEach(item => {
	item.remove();
});

const genre = document.querySelector('.promo__genre');
genre.textContent = 'драма';

const newImageBg = 'img/bg.jpg';
const promoBg = document.querySelector('.promo__bg');
promoBg.style.backgroundImage = `url(${newImageBg})`;

