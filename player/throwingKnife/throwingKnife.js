let throwingKnifeImg;
let numOfThrowingKnife = [];
let tkX = [], tkY = [], tkW, tkH, tkSpeed;


//Loads the throwingKnife image
function loadThrowingKnife() {
	throwingKnifeImg = loadImage("infiltrator/player/throwingKnife/Kunai.png");
}

//Declares the variables
function setupThrowingKnife() {
	angleMode(DEGREES);
	tkW = 20;
	tkW = tkY;
	tkSpeed = 7;
}

//Function will be called inside function callPlayer
function callThrowingKnife() {
	showThrowingKnife();
	throwingKnifeAct();
}

//Displays all throwing knifes
function showThrowingKnife() {
	tkW = 15;
	tkH = tkW;
	for (let i = 0; i < numOfThrowingKnife.length; i++) {
		image(throwingKnifeImg, tkX[i], tkY[i], tkW, tkH);
	}
}

//The functionality of the throwing knives
function throwingKnifeAct() {
	if (keyIsDown(13)) {
		print(numOfThrowingKnife.length);
	}

	for (let i = 0; i < numOfThrowingKnife.length; i++) {
		tkX[i] += tkSpeed;
	}
}