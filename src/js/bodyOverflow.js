export const bodyOverflow = (function (body) {
	let scrollTop;
	return {
		fixBody: () => {
			scrollTop = body.scrollTop;
			body
				.classList.add('fixed');
			body
				.style.top = -scrollTop;
		},
		unfixBody: () => {
			body
				.classList.remove('fixed');
			body
				.scrollTop = scrollTop;
		}
	};
})(document.body);
