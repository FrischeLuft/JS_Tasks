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