let gameState;
let backgroundImg = [];
let gameNameText;
let mouseWasPressed;
let loadingTime;
let notified;

let homeIcon, replayIcon, settingsIcon, iconW, iconH;

//Booleans regarding settings
let onSetting, readingHowToPlay, readingHowToControls, reading;

//Strings regarding info
let howToPlay, howToControls;

function preload() {
	loadingTime = 0;
	notified = false;
	//Loading all assets
	loadPlayer();
	loadThrowingKnife();
	loadPlatformAssets();

	//Loading background layers
	for (let i = 0; i < 3; i++) {
		append(backgroundImg, loadImage("infiltrator/assets/background/scene_0" + i + ".png"));
		backgroundImg[i].resize(width, height);
	}

	//Loading game name 
	gameNameText = loadImage("infiltrator/assets/text/gameName.png");

	//Loading home icon and replay icon
	homeIcon = loadImage("infiltrator/assets/gameover/home_icon.png");
	replayIcon = loadImage("infiltrator/assets/gameover/replay_icon.png");
	settingsIcon = loadImage("infiltrator/assets/intro/settings_icon.png");

	setInterval(() => {
		if (notified === false) {
			if (loadingTime > 1750) {
				alert("This is taking a while...\nTry refreshing the browser.");
				notified = true;
			} else {
				loadingTime++;
			}
		}
	})
}

function setup() {
	notified = true;
	createCanvas(1000, 700);
	setupPlayer();
	setupPlatform();
	setupThrowingKnife();

	gameState = "intro";
	mouseWasPressed = false;

	iconW = 75;
	iconH = 75;

	onSetting = false;
	readingHowTo = false;
	reading = false;

	howToPlay = "Elite Ninja, your mission is to infiltrate fortified enemy bases.\nOnce inside there is no exit, you must make it onto the hovering platform at the end of the base.\n\nKeep in mind you can only stand on top of the white platforms.\nMake sure you are alligned with the center of the platform or you might slip\nIf a platform is too far try to spam jump.\nIf you fall, you will be punctured by sharp spikes at the bottom of the base and essentially die\n\nClick on screen to dismiss";

	howToControls = "--Controls--\nW key | UP Arrow - Jump\nA Key | LEFT Arrow - Move Left\nD Key | RIGHT Arrow  - Move Right\n\n--Extras--\nIf you are trying to get on top of a platform\nsimply get the Ninjas head above the white ledge and he will automatically begin to climb.\n\nClick on screen to dismiss";
}

function draw() {
	switch (gameState) {
		case "intro":
			drawIntro(width / 2, height / 2, mouseX - width / 2, mouseX / 7 - width / 7, mouseX / 20 - width / 20);
			break;
		case "game":
			drawGame();
			break;
		case "gameover":
			drawGame();
			drawGameover();
			break;
	}

	if (mouseIsPressed) mouseWasPressed = true;
	if (!mouseIsPressed && mouseWasPressed) mouseWasPressed = false;
}

//Displays the intro
function drawIntro(x, y, offset1, offset2, offset3) {
	background(33, 47, 60);
	cursor();
	imageMode(CENTER);

	//Images for background
	image(backgroundImg[0], x + offset1, y, width, height);
	image(backgroundImg[0], x + offset1 + width, y, width, height);
	image(backgroundImg[0], x + offset1 - width, y, width, height);
	image(backgroundImg[1], x + offset2, y, width + 100, height);
	image(backgroundImg[2], x + offset3, y, width + 100, height);

	//Game name text
	image(gameNameText, width / 2, 100, 300, 100);

	//Play button
	rectMode(CENTER);
	strokeWeight(3);
	if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > 575 && mouseY < 675 && reading === false) {
		fill(200);
		stroke(0);
		rect(width / 2, 625, 200, 100, 20);
		if (!mouseIsPressed && mouseWasPressed) {
			gameState = "game";
			resetLevel();
			resetPlayer();
			generateLevel();
			mouseWasPressed = false;
		}
	} else {
		fill(255);
		stroke(0);
		rect(width / 2, 625, 200, 100, 20);
	}
	customeText("BEGIN", width / 2, 625, 0, 20);

	//Settings button
	imageMode(CORNER);
	image(settingsIcon, 25, 25, iconW, iconH);
	if (mouseX > 62.5 - iconW * 0.625 && mouseX < 62.5 + iconW * 0.625 && mouseY > 62.5 - iconH * 0.625 && mouseY < 62.5 + iconH * 0.625 && reading === false) {
		noFill();
		stroke(255);
		rectMode(CORNER);
		rect(62.5 - iconW * 0.625, 62.5 - iconH * 0.625, iconW * 1.25, iconH * 1.25);
		if (!mouseIsPressed && mouseWasPressed) {
			onSetting = true;
			mouseWasPressed = false;
		}
	}

	if (onSetting) {
		rectMode(CORNER);
		noStroke();
		fill(0, 0, 0, 50);
		rect(0, 0, width, height);
		fill(255, 255, 255, 200);
		rect(width / 2 - 150, height / 2 - 200, 300, 400);
		reading = true;

		if (mouseX < width / 2 - 150 || mouseX > width + 150) {
			if (!mouseIsPressed && mouseWasPressed) {
				print(true);
				onSetting = false;
				reading = false;
				mouseWasPressed = false;
			}
		}

		//Title
		customeText("SETTINGS", width / 2, height / 2 - 145, 0, 40);

		//How to play button
		customeText("HOW TO PLAY", width / 2, height / 2 - 40, 0, 34);
		if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 - 75 && mouseY < height / 2 - 20) {
			noFill();
			stroke(255);
			rect(width / 2 - 150, height / 2 - 75, 300, 60);
			if (!mouseIsPressed && mouseWasPressed) {
				onSetting = false;
				readingHowToPlay = true;
				readingHowToControls = false;
				reading = true;
				mouseWasPressed = false;
			}
		}

		//Controls button
		customeText("CONTROLS", width / 2, height / 2 + 70, 0, 34);
		if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 + 35 && mouseY < height / 2 + 90) {
			noFill();
			stroke(255);
			rect(width / 2 - 150, height / 2 + 35, 300, 60);
			if (!mouseIsPressed && mouseWasPressed) {
				onSetting = false;
				readingHowToPlay = false;
				readingHowToControls = true;
				reading = true;
				mouseWasPressed = false;
			}
		}
	}

	rectMode(CORNER);
	if (readingHowToPlay) {
		fill(255, 255, 255, 200);
		rect(0, 0, width, height);
		customeText(howToPlay, width / 2, height / 2, 0, 20);
		if (!mouseIsPressed && mouseWasPressed) {
			onSetting = false;
			readingHowToPlay = false;
			readingHowToControls = false;
			reading = false;
			mouseWasPressed = false;
		}
	} else if (readingHowToControls) {
		fill(255, 255, 255, 200);
		rect(0, 0, width, height);
		customeText(howToControls, width / 2, height / 2, 0, 20);
		if (!mouseIsPressed && mouseWasPressed) {
			onSetting = false;
			readingHowToPlay = false;
			readingHowToControls = false;
			reading = false;
			mouseWasPressed = false;
		}
	}
}

//Displays game
function drawGame() {
	background(200);
	noCursor();
	callPlatform();
	callPlayer();
}

//Displays game over 
function drawGameover() {
	cursor();
	rectMode(CORNER);
	noStroke();
	fill(0, 0, 0, 50);
	rect(0, 0, width, height);
	fill(255, 255, 255, 200);
	rect(width / 2 - 150, height / 2 - 200, 300, 400);

	//Drawing replay button
	image(replayIcon, width / 2 - iconW / 2, height / 2 - 40, iconW, iconH);
	if (mouseX > width / 2 - iconW * 0.625 && mouseX < width / 2 + iconW * 0.625 && mouseY > height / 2 - 2.5 - iconH * 0.625 && mouseY < height / 2 - 2.5 + iconH * 0.625) {
		noFill();
		stroke(255);
		rect(width / 2 - iconW * 0.625, height / 2 - 2.5 - iconH * 0.625, iconW * 1.25, iconH * 1.25);
		if (!mouseIsPressed && mouseWasPressed) {
			gameState = "game";
			resetLevel();
			resetPlayer();
			generateLevel();
			mouseWasPressed = false;
		}
	}

	//Drawing home button
	image(homeIcon, width / 2 - iconW / 2, height / 2 + 70, iconW, iconH);
	if (mouseX > width / 2 - iconW * 0.625 && mouseX < width / 2 + iconW * 0.625 && mouseY > height / 2 + 107.5 - iconH * 0.625 && mouseY < height / 2 + 107.5 + iconH * 0.625) {
		noFill();
		stroke(255);
		rect(width / 2 - iconW * 0.625, height / 2 + 107.5 - iconH * 0.625, iconW * 1.25, iconH * 1.25);
		if (!mouseIsPressed && mouseWasPressed) {
			gameState = "intro";
			mouseWasPressed = false;
		}
	}

	customeText("MISSION\nFAILED", width / 2, height / 2 - 120, 0, 40);
}

//Function uses less code
function customeText(content, x, y, fillColor, size) {
	noStroke();
	fill(fillColor);
	textAlign(CENTER, CENTER);
	textSize(size);
	text(content, x, y);
}