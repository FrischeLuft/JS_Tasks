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