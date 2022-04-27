const setWindowSize = () => {
	const windowW = window.innerWidth;
	const windowH = window.innerHeight;
	document.documentElement.style.setProperty("--window-w-full", windowW.toString()+"px");
	document.documentElement.style.setProperty("--window-h-full", windowH.toString()+"px");
}
export default setWindowSize;