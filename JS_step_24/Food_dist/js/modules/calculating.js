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

export default calculating;