let handle1 = null,
	handle2 = null;

export function showMessage (ele, text, time = 4000, delay = 0) {
	clearTimeout(handle1);

	handle1 = setTimeout(() => {
		ele.innerHTML = text;
		ele.style.opacity = 100;

		clearTimeout(handle2);

		handle2 = setTimeout(() => {
			ele.style.opacity = 0;
		}, time);
	}, delay);
}