/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculating.js":
/*!***********************************!*\
  !*** ./js/modules/calculating.js ***!
  \***********************************/
/***/ ((module) => {

function calculating() {
	const genderItems = document.querySelectorAll('#gender .calculating__choose-item');
	const heightInput = document.getElementById('height');
	const weightInput = document.getElementById('weight');
	const ageInput = document.getElementById('age');
	const activityItems = document.querySelectorAll('[data-activity]');
	const resultElement = document.querySelector('.calculating__result span');

	let gender;
	let activity;

	const activityCoefficients = {
		'низкая активность': 1.2,
		'невысокая активность': 1.375,
		'умеренная активность': 1.55,
		'высокая активность': 1.725
	};

	//Универсальная функция для обработки кликов
	function handleItemClick(items, type) {
		items.forEach(item => {
			item.addEventListener('click', () => {
				items.forEach(item => item.classList.remove('calculating__choose-item_active'));
				item.classList.add('calculating__choose-item_active');
				const value = item.textContent.trim().toLocaleLowerCase();
				localStorage.setItem(type, value);
				if (type === 'activity') {
					activity = value;
				} else if (type === 'gender') {
					gender = value;
				}

				calculateCalories();
			});
		});
	}

	handleItemClick(genderItems, 'gender');
	handleItemClick(activityItems, 'activity');

	//Обработчик событий: рост, вес, возраст
	function handleInput(inputElement, type) {
		inputElement.addEventListener('input', () => {
			localStorage.setItem(type, inputElement.value);

			calculateCalories();
		});
	}

	handleInput(heightInput, 'height');
	handleInput(weightInput, 'weight');
	handleInput(ageInput, 'age');


	//Получение элементов из localStorage: пол; 
	function loadFromLocalStorage() {
		const savedGender = localStorage.getItem('gender');
		if (savedGender) {
			gender = savedGender;
			genderItems.forEach(item => {
				item.classList.remove('calculating__choose-item_active');
				if (item.textContent.trim().toLowerCase() === savedGender) {
					item.classList.add('calculating__choose-item_active');
				}
			});
		}

		//Получение элементов из localStorage: активность;
		const savedActivity = localStorage.getItem('activity');
		if (savedActivity) {
			activity = savedActivity;
			activityItems.forEach(item => {
				item.classList.remove('calculating__choose-item_active');
				if (item.textContent.trim().toLowerCase() == savedActivity) {
					item.classList.add('calculating__choose-item_active');
				}
			});
		}

		//Получение элементов из localStorage: рост, вес, возраст;

		const savedHeight = localStorage.getItem('height');
		if (savedHeight) {
			heightInput.value = savedHeight;
		}

		const savedWeight = localStorage.getItem('weight');
		if (savedWeight) {
			weightInput.value = savedWeight;
		}

		const savedAge = localStorage.getItem('age');
		if (savedAge) {
			ageInput.value = savedAge;
		}

		calculateCalories();
	}

	//Функция загрузки данных при загрузке страницы
	loadFromLocalStorage();


	// Функция для расчета калорий
	function calculateCalories() {
		const height = parseFloat(heightInput.value);
		const weight = parseFloat(weightInput.value);
		const age = parseFloat(ageInput.value);

		let isValid = true;

		if (isNaN(height) || height <= 0 || heightInput.value.match(/\D/g)) {
			heightInput.style.border = '1px solid red';
			isValid = false;
		} else {
			heightInput.style.border = 'none';
		}

		if (isNaN(weight) || weight <= 0 || weightInput.value.match(/\D/g)) {
			weightInput.style.border = '1px solid red';
			isValid = false;
		} else {
			weightInput.style.border = 'none';
		}

		if (isNaN(age) || age <= 0 || ageInput.value.match(/\D/g)) {
			ageInput.style.border = '1px solid red';
			isValid = false;
		} else {
			ageInput.style.border = 'none';
		}

		if (!isValid) {
			resultElement.textContent = '0';
			return;
		}

		let bmr;

		if (gender === 'женщина') {
			bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
		} else if (gender === 'мужчина') {
			bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
		} else {
			resultElement.textContent = 'Пожалуйста выберите пол';
			return;
		}

		const activityCoefficient = activityCoefficients[activity];
		if (activityCoefficient) {
			bmr *= activityCoefficient;
			resultElement.textContent = bmr.toFixed(0);
		} else {
			resultElement.textContent = 'Пожалуйста выберите активность';
		}
	}
}

module.exports = calculating;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {

	class MenuItem {
		constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => element.classList.add(className));
				element.classList.add('menu__item');
			}
			element.innerHTML = `
			<img src="${this.src}" alt="${this.alt}" />
			<h3 class="menu__item-subtitle">${this.subtitle}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
			<div class="menu__item-cost">Цена:</div>
			<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			`;
			this.parent.append(element);
		}
	}

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display:block;
			margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div class="modal__close" data-close>&times;</div>
		<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {

	const triggerModal = document.querySelectorAll('[data-modal]'), modalWindow = document.querySelector('.modal');

	function openModal() {
		modalWindow.style.display = 'block';
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	triggerModal.forEach(modal => {
		modal.addEventListener('click', openModal);
	});

	function closeModal() {
		modalWindow.style.display = 'none';
		document.body.style.overflow = '';
	}

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});



	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.style.display === 'block') {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;


	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		setActiveDot(slideIndex - 1);
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;


		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		setActiveDot(slideIndex - 1);
	});

	//Dots

	const generalWrapper = document.querySelector('.offer__slider');
	generalWrapper.style.position = 'relative';

	const carouselIndicator = document.createElement('div');
	carouselIndicator.classList.add('carousel-indicators');

	generalWrapper.appendChild(carouselIndicator);

	const slidesCount = slides.length;

	for (let i = 0; i < slidesCount; i++) {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		carouselIndicator.appendChild(dot);
	}

	const dots = document.querySelectorAll('.dot');
	const pictures = document.querySelectorAll('.offer__slide');
	const sliderContainer = document.querySelector('.offer__slider-inner');

	const slideWidth = pictures[0].clientWidth;

	function setActiveDot(activeIndex) {
		dots.forEach((dot, index) => {
			if (index === activeIndex) {
				dot.classList.add('active');
				current.textContent = `0${index + 1}`;
			} else {
				dot.classList.remove('active');
			}
		});
	}

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			sliderContainer.style.transform = `translateX(${-slideWidth * index}px)`;
			setActiveDot(index);
		});
	});

	sliderContainer.style.transform = 'translateX(0px)';
	dots[0].classList.add('active');

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
	const deadline = '2024-05-30';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
	const calculating = __webpack_require__(/*! ./modules/calculating */ "./js/modules/calculating.js"),
		forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
		modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
		slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
		tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

	calculating();
	forms();
	modal();
	slider();
	tabs();
	timer();
	cards();
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map