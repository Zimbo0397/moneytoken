import { bodyOverflow } from './bodyOverflow';

// modals
export const dialog = (function () {
	const triggers = document.querySelectorAll('[data-modal]');

	var clickTrigger = function (event) {
		try {
			event.preventDefault();
			const modalSelector = this.dataset.modal;
			// const target = event.target;
			// target.classList.add('opened');
			if (!modalSelector) {
				console.warn('modal selector is ' + modalSelector);
				return;
			}
			openDialog(modalSelector);
		} catch (error) {
			console.error(error);
		}
	},
	closeTrigger = function (event) {
		var target = event.target;
		if (this === target || target.classList.contains('app-dialog-close')) {
			closeDialog();
		}
	},
	openDialog = function (modalSelector) {
		const modal = document.querySelector(modalSelector);
		if (!modal) {
			console.warn('modal not found ' + modalSelector);
			return;
		}
		modal.classList.add('opening');
		setTimeout(() => {
			modal.classList.add('opened');
		}, 1)
		setTimeout(() => {
			bodyOverflow.fixBody();
			modal.classList.remove('opening');
		}, 300)
		if (!modal.dataset.enabled) {
			modal.addEventListener('click', closeTrigger);
			modal.dataset.enabled = 1;
		}
	},
	closeDialog = function () {
		const target = document.querySelector('.app-dialog.opened')
		const trigger = document.querySelectorAll('[data-modal]');
		trigger.forEach(element => {
			element.classList.remove('opened');
		});
		if (!target) {
			return;
		}
		target.classList.add('clothing');
		setTimeout(() => {
			target.classList.remove('clothing');
			target.classList.remove('opened');
			bodyOverflow.unfixBody();
		}, 300)
	};

	for (let i = 0; i < triggers.length; i++) {
		triggers[i].addEventListener('click', clickTrigger);
	}

	window.addEventListener('keyup', function (event) {
		if (event.keyCode === 27) {
			closeDialog();
		};
	});

	return {
		closeDialog
	};

})();
