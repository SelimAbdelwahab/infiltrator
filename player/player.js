let px, py, pw, ph, pSpeed, playerHealth, playerScale, playerAlive;

let wKey, aKey, sKey, dKey, spaceKey;

//Idle animation
let playerIdleAni = [], playerIdleAniSeq;

//Run animation
let playerRunAni = [], playerRunAniSeq;

//Jump animation
let playerJumpAni = [], playerJumpAniSeq;

//Climb animation
let playerClimbAni = [], playerClimbAniSeq;

//Throw animation
let playerThrowAni = [], playerThrowAniSeq;

//Glide animation
let playerGlideAni = [], playerGlideAniSeq;

//Death animation
let playerDeadAni = [], playerDeadAniSeq;

//Extras regarding animations
let playerCurrentAni, playerInAnimation, playerAniReady, playerClimbed;

//Booleans regarding player collisions
let playerIsOnAPlatform;
let playerSpikeCollision;

//Extra Booleans
let playerMoveable;

//Gravity
let playerGravity;

function loadPlayer() {
	//Loading idle animation
	for (let i = 0; i < 10; i++) {
		append(playerIdleAni, loadImage("infiltrator/player/animations/idle/Idle__00" + i + ".png"));
	}

	//Loading running animation
	for (let i = 0; i < 10; i++) {
		append(playerRunAni, loadImage("infiltrator/player/animations/run/Run__00" + i + ".png"));
	}

	//Loading jumping animation
	for (let i = 0; i < 10; i++) {
		append(playerJumpAni, loadImage("infiltrator/player/animations/jump/Jump__00" + i + ".png"));
	}

	//Loading climbing animation
	for (let i = 0; i < 10; i++) {
		append(playerClimbAni, loadImage("infiltrator/player/animations/climb/Climb_00" + i + ".png"));
	}

	//Loading throwing animation
	for (let i = 0; i < 10; i++) {
		append(playerThrowAni, loadImage("infiltrator/player/animations/throw/Throw__00" + i + ".png"));
	}

	//Loading gliding animation
	for (let i = 0; i < 10; i++) {
		append(playerGlideAni, loadImage("infiltrator/player/animations/glide/Glide_00" + i + ".png"));
	}

	//Loading death animation
	for (let i = 0; i < 10; i++) {
		append(playerDeadAni, loadImage("infiltrator/player/animations/dead/Dead__00" + i + ".png"));
	}
}

function setupPlayer() {
	px = 0;
	py = 0;
	pw = 50;
	ph = pw;
	pSpeed = 2.3;
	playerHealth = 100;
	playerScale = 1;
	playerAlive = true;

	wKey = false;
	aKey = false;
	sKey = false;
	dKey = false;
	spaceKey = false;

	playerIdleAniSeq = 0;
	playerRunAniSeq = 0;
	playerJumpAniSeq = 0;
	playerClimbAniSeq = 0;
	playerThrowAniSeq = 0;
	playerGlideAniSeq = 0;
	playerDeadAniSeq = 0;

	playerCurrentAni = "glide";
	playerAniTime = 0;
	playerInAnimation = false;
	playerAniReady = true;
	playerClimbed = false;

	//playerGroundCollision = false;
	playerIsOnAPlatform = false;
	playerSpikeCollision = false;

	playerMoveable = true;

	playerGravity = 0.2;
}

function resetPlayer() {
	// px = 0;
	// py = 0;
	// playerHealth = 100;
	// playerAlive = true;
	// playerIsOnAPlatform = false;
	// playerSpikeCollision = false;

	// playerGravity = 0;
	setupPlayer();
}

function callPlayer() {
	showPlayer();
	adjustPlayerAniSeq();
	playerAniTiming();
	playerControl();
	callThrowingKnife();
}

// Function that displays the player. 
function showPlayer() {
	imageMode(CORNER);
	switch (playerCurrentAni) {
		case "idle":
			if (playerIdleAniSeq < playerIdleAni.length) {
				if (playerAniReady) {
					playerIdleAniSeq++;
					playerAniTime = millis();
				}
			} if (playerIdleAniSeq >= playerIdleAni.length) {
				playerIdleAniSeq = 0;
				playerAniTime = millis();
			}

			image(playerIdleAni[playerIdleAniSeq], px, py, pw, ph);
			break;
		case "run":
			if (playerRunAniSeq < playerRunAni.length) {
				if (playerAniReady) {
					playerRunAniSeq++;
					playerAniTime = millis();
				}
			} if (playerRunAniSeq >= playerRunAni.length) {
				playerRunAniSeq = 0;
				playerAniTime = millis();
			}

			image(playerRunAni[playerRunAniSeq], px, py, pw, ph);
			break;
		case "jump":
			if (playerJumpAniSeq < playerJumpAni.length) {
				if (playerAniReady) {
					playerJumpAniSeq++;
					playerAniTime = millis();
				}
			} if (playerJumpAniSeq >= playerJumpAni.length) {
				playerJumpAniSeq = 0;
				playerAniTime = millis();
			}

			if (playerJumpAniSeq < 5) {
				py -= 2;
			}

			image(playerJumpAni[playerJumpAniSeq], px, py, pw, ph);
			break;
		case "climb":
			if (playerClimbAniSeq < playerClimbAni.length) {
				if (playerAniReady) {
					playerClimbAniSeq++;
					playerAniTime = millis();
				}
			} if (playerClimbAniSeq >= playerClimbAni.length) {
				playerClimbAniSeq = 0;
				playerAniTime = millis();
			}

			image(playerClimbAni[playerClimbAniSeq], px, py, pw, ph);
			break;
		case "throw":
			if (playerThrowAniSeq < playerThrowAni.length) {
				if (playerAniReady) {
					playerThrowAniSeq++;
					playerAniTime = millis();
				}
			} if (playerThrowAniSeq >= playerThrowAni.length) {
				playerThrowAniSeq = 0;
				playerInAnimation = false;
				playerAniTime = millis();
			}
			if (playerThrowAniSeq === 3 && playerAniReady) {
				append(numOfThrowingKnife, numOfThrowingKnife.length);
				append(tkX, px);
				append(tkY, py + ph / 3);
			}

			image(playerThrowAni[playerThrowAniSeq], px, py, pw, ph);
			break;
		case "glide":
			if (playerGlideAniSeq < playerGlideAni.length) {
				if (playerAniReady) {
					playerGlideAniSeq++;
					playerAniTime = millis();
				}
			} if (playerGlideAniSeq >= playerGlideAni.length) {
				playerGlideAniSeq = 0;
				playerAniTime = millis();
			}

			image(playerGlideAni[playerGlideAniSeq], px, py, pw, ph);
			break;
		case "dead":
			if (playerDeadAniSeq != 9) {
				if (playerAniReady) {
					playerDeadAniSeq++;
					playerAniTime = millis();
				}
			}

			image(playerDeadAni[playerDeadAniSeq], px, py, pw, ph);
			break;
	}
}

//If the animation doesn't equal the options it will set the sequence to 0
function adjustPlayerAniSeq() {
	if (playerCurrentAni != "idle") {
		playerIdleAniSeq = 0;
	} if (playerCurrentAni != "run") {
		playerRunAniSeq = 0;
	} if (playerCurrentAni != "jump") {
		playerJumpAniSeq = 0;
	} if (playerCurrentAni != "climb") {
		playerClimbAniSeq = 0;
	} if (playerCurrentAni != "throw") {
		playerThrowAniSeq = 0;
	} if (playerCurrentAni != "glide") {
		playerGlideAniSeq = 0;
	} if (playerCurrentAni != "dead") {
		playerDeadAniSeq = 0;
	}
}

//Function for animation timing
function playerAniTiming() {
	switch (playerCurrentAni) {
		case "idle":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "run":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "jump":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "climb":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "throw":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "glide":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
		case "dead":
			if (millis() - playerAniTime > 100) {
				playerAniReady = true;
			} else {
				playerAniReady = false;
			}
			break;
	}
}

//Function takes key input
function playerKeyInput() {
	if (playerMoveable) {
		if (keyIsDown(87) || keyIsDown(38)) {
			wKey = true;
		} else {
			wKey = false;
		}

		if (keyIsDown(65) && px > 1 || keyIsDown(37) && px > 1) {
			aKey = true;
			px -= pSpeed;
			playerScale = -1;
		} else {
			aKey = false;
		}

		if (keyIsDown(83) || keyIsDown(40)) {
			sKey = true;
		} else {
			sKey = false;
		}

		if (keyIsDown(68) && px < width - 1 || keyIsDown(39) && px < width - 1) {
			dKey = true;
			px += pSpeed;
		} else {
			dKey = false;
		}
	} else {
		wKey = false;
		aKey = false;
		sKey = false;
		dKey = false;
	}

	if (keyIsDown(32)) {
		spaceKey = true;
	} else {
		spaceKey = false;
	}

	for (let i = 0; i < platCollision.length; i++) {
		if (i === platCollision.length - 1) {
			if (platCollision[i] === false && platCollision[i - 1] === false && platCollision[i - 2] === false && platCollision[i - 3] === false && platCollision[i - 4] === false && platCollision[i - 5] === false && platCollision[i - 6] === false && platCollision[i - 7] === false && platCollision[i - 8] === false && platCollision[i - 9] === false && platCollision[i - 10] === false && platCollision[i - 11] === false && platCollision[i - 12] === false && platCollision[i - 13] === false && platCollision[i - 14] === false && platCollision[i - 15] === false && platCollision[i - 16] === false) {
				// if (platCollision[i] === false && platCollision[i - j] === false) {
				playerIsOnAPlatform = false;
				py += playerGravity;
				pSpeed = 1.5;
				playerGravity += 0.0175;
			} else {
				playerIsOnAPlatform = true;
				pSpeed = 2.3;
				playerGravity = 0.2;
			}
		}
	}
}

//Function that controls the player based on Booleans
function playerControl() {
	playerKeyInput();

		if (playerAlive === false) {
		gameState = "gameover";
	}

	if (aKey && playerIsOnAPlatform || dKey && playerIsOnAPlatform) {
		if (wKey === false) {
			return playerCurrentAni = "run";
		}
	} else if (wKey) {
		return playerCurrentAni = "jump";
	} else if (spaceKey) {
		return playerCurrentAni = "throw";
	} else {
		if (playerIsOnAPlatform) {
			return playerCurrentAni = "idle";
		} else {
			return playerCurrentAni = "glide";
		}
	}
}

//Function that takes x, y coordinates and detects collisions
function playerColissionWithGround(groundX, groundY, groundW, groundH, groundID, finalPlat) {
	if (keyIsDown(13)) px = groundX;

	if (playerSpikeCollision === false) {
		if ((px + pw / 1.5 >= groundX) && ((px + pw / 1.5 - pw * 0.3) <= (groundX + groundW)) && (py + ph >= groundY) && (py <= groundY)) {

			let hitPlayerY = round(py + ph, 0);
			let hitGroundY = round(groundY, 0);

			if (finalPlat) {
				endPlatAni = true;
				playerMoveable = false;
				px = finaleTileX;
				py = finaleTileY - ph;
				playerCurrentAni = "idle";
			} else {
				endPlatAni = false;
			}

			if (hitPlayerY == hitGroundY) {
				playerClimbed = true;
				playerMoveable = true;
				platCollision[groundID] = true;
				py = groundY - ph;
			} else if (playerClimbed === false && py > groundY - ph && (px <= groundX + groundW / 2)) {
				py--;
				playerCurrentAni = "climb";
				if (px + pw / 2 > groundX + groundW / 2) {
					px--;
				} else {
					px++;
				}
				playerMoveable = false;
				platCollision[groundID] = true;
				pSpeed = 0;
			}

			// if (finalPlat === false) {
				return platCollision[groundID] = true;
			// } else {
			// 	playerGravity = 0.2;
			// }
		} else {
			playerClimbed = false;
			playerMoveable = true;

			// if (finalPlat === false) {
				return platCollision[groundID] = false;
			// } else {
				// playerGravity = 0.2;
			// }
		}
	} 
}

print

//Will be called in the platform function
function playerColissionWithSpikes(spikesY) {
	if (py + ph >= spikesY) {
		playerSpikeCollision = true;
		playerMoveable = false;
		playerCurrentAni = "dead";
		playerAlive = false;
		py = spikesY - ph;
	} else {
		playerSpikeCollision = false;
	}
}