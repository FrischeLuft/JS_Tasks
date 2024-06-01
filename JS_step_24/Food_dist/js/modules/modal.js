function openModal(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.style.display = 'block';
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
	clearInterval(modalTimerId);
}

function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.style.display = 'none';
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const triggerModal = document.querySelectorAll(triggerSelector),
		modalWindow = document.querySelector(modalSelector);



	triggerModal.forEach(modal => {
		modal.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});



	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});



	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.style.display === 'block') {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export { closeModal };
export { openModal };