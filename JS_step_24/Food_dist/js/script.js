window.addEventListener('DOMContentLoaded', () => {
	const calculating = require('./modules/calculating'),
		forms = require('./modules/forms'),
		modal = require('./modules/modal'),
		slider = require('./modules/slider'),
		tabs = require('./modules/tabs'),
		timer = require('./modules/timer'),
		cards = require('./modules/cards');

	calculating();
	forms();
	modal();
	slider();
	tabs();
	timer();
	cards();
});


