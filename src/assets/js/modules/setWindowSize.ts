const setWindowSize = () => {
	const windowW = window.innerWidth;
	const windowH = window.innerHeight;
	document.documentElement.style.setProperty("--window-w-full", `${windowW}px`);
	document.documentElement.style.setProperty("--window-h-full", `${windowH}px`);
}
export default setWindowSize;