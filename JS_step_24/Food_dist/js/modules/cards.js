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

export default cards;