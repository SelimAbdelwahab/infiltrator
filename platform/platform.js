//Since the asset I am using has the tiles be multiple images I'll have to use multiple arrays
let platW, platH;
let platSpawnableY = [];

//Background tiles
let platformBackground = [];

//Platform tiles
let platformTile1 = [], platformTile1X = [], platformTile1Y = [], platformTile1Order = [], plat1ID = [];
let platformTile2 = [], platformTile2X = [], platformTile2Y = [], platformTile2Order = [], plat2ID = [];
let supportTile1 = [], supportTile2 = [];

let platCollision = [];

//Extra tiles
let platformSpikes;

//Final tile;
let finaleTile, finaleTileX, finaleTileY, finalPlatID;

//End animation
let endPlatAni;

//Random tile generator
let randomTile = [], randomTileIndex;

function loadPlatformAssets() {
	//Getting background frames
	for (let i = 1; i <= 7; i++) {
		append(platformBackground, loadImage("infiltrator/platform/background/BGTile (" + i + ").png"));
	}

	//Platform tile 1 assets
	for (let i = 1; i <= 3; i++) {
		append(platformTile1, loadImage("infiltrator/platform/tiles/Tile (0" + i + ").png"));
	}

	//Platform tile 2 assets
	for (let i = 12; i <= 14; i++) {
		append(platformTile2, loadImage("infiltrator/platform/tiles/Tile (" + i + ").png"));
	}

	//Support tile assets
	for (let i = 4; i <= 6; i++) {
		append(supportTile1, loadImage("infiltrator/platform/tiles/Tile (0" + i + ").png"));
	}

	for (let i = 9; i <= 11; i++) {
		if (i < 10) {
			append(supportTile2, loadImage("infiltrator/platform/tiles/Tile (0" + i + ").png"));
		} else {
			append(supportTile2, loadImage("infiltrator/platform/tiles/Tile (" + i + ").png"));
		}
	}

	//Platform spike asset
	platformSpikes = loadImage("infiltrator/platform/tiles/Spike.png");

	//Final platform asset
	finaleTile = loadImage("infiltrator/platform/tiles/Tile (15).png");
}

function setupPlatform() {
	platW = 50;
	platH = platW;

	for (let y = 150; y < 500; y += platH) {
		append(platSpawnableY, y);
	}
}

function callPlatform() {
	drawBackground();
	drawTiles();
}

//Generates the level
function generateLevel() {
	endPlatAni = false;
	randomTileIndex = 0;
	let platIDIndex = 0;

	for (let x = 0; x < width; x += platW) {

		append(randomTile, round(random(1, 2), 0));

		if (randomTile[randomTileIndex] === randomTile[randomTileIndex - 1]) {
			randomTile[randomTileIndex] = round(random(1, 2), 0);
		}

		switch (randomTile[randomTileIndex]) {
			case 1:
				let y1A = random(platSpawnableY);
				let y1B = random(platSpawnableY);
				let y1C = random(platSpawnableY);

				append(platformTile1X, x);
				append(platformTile1X, x + platW);
				append(platformTile1X, x + platW * 2);

				append(platformTile1Y, y1A);
				append(platformTile1Y, y1B);
				append(platformTile1Y, y1C);

				append(platformTile1Order, 0);
				append(platformTile1Order, 1);
				append(platformTile1Order, 2);

				append(plat1ID, platIDIndex);
				append(plat1ID, platIDIndex + 1);
				append(plat1ID, platIDIndex + 2);

				append(platCollision, false);
				append(platCollision, false);
				append(platCollision, false);

				platIDIndex += 3;
				x += platW * 3;
				break;
			case 2:
				let y4A = random(platSpawnableY);
				let y4B = random(platSpawnableY);
				let y4C = random(platSpawnableY);

				append(platformTile2X, x);
				append(platformTile2X, x + platW);
				append(platformTile2X, x + platW * 2);

				append(platformTile2Y, y4A);
				append(platformTile2Y, y4B);
				append(platformTile2Y, y4C);

				append(platformTile2Order, 0);
				append(platformTile2Order, 1);
				append(platformTile2Order, 2);

				append(plat2ID, platIDIndex);
				append(plat2ID, platIDIndex + 1);
				append(plat2ID, platIDIndex + 2);

				append(platCollision, false);
				append(platCollision, false);
				append(platCollision, false);

				platIDIndex += 3;
				x += platW * 3;
				break;
		}
		randomTileIndex++;
	}

	finaleTileX = width - platW;
	finaleTileY = random(platSpawnableY);
	finalPlatID = platIDIndex + 1;
	append(platCollision, false)
}

//Resets the level
function resetLevel() {
	for (let i = 0; i < randomTile.length; i++) {
		shorten(randomTile);
	}

	for (let i = 0; i < platformTile1X.length; i++) {
		shorten(platformTile1X);
		shorten(platformTile1X);
		shorten(platformTile1X);

		shorten(platformTile1Y);
		shorten(platformTile1Y);
		shorten(platformTile1Y);

		shorten(platformTile1Order);
		shorten(platformTile1Order);
		shorten(platformTile1Order);

		shorten(plat1ID);
		shorten(plat1ID);
		shorten(plat1ID);

		shorten(platCollision);
		shorten(platCollision);
		shorten(platCollision);
	}

	for (let i = 0; i < platformTile2.length; i++) {
		shorten(platformTile2X);
		shorten(platformTile2X);
		shorten(platformTile2X);

		shorten(platformTile2Y);
		shorten(platformTile2Y);
		shorten(platformTile2Y);

		shorten(platformTile2Order);
		shorten(platformTile2Order);
		shorten(platformTile2Order);

		shorten(plat2ID);
		shorten(plat2ID);
		shorten(plat2ID);

		shorten(platCollision);
		shorten(platCollision);
		shorten(platCollision);
	}

	shorten(platCollision);
}

//Draws the background
function drawBackground() {
	imageMode(CORNER);
	for (let x = 0; x < width; x += platW) {
		if (x === width / 2 || x === width / 2 - platW) {
			image(platformBackground[0], x, 0, platW, platH);
		} else {
			image(platformBackground[1], x, 0, platW, platH);
		}
	}

	for (let x = 0; x < width; x += platW) {
		for (let y = 50; y < height; y += platH) {
			image(platformBackground[2], x, y, platW, platH);
			image(platformBackground[3], x + platW, y, platW, platH);
		}
	}
}

//Draws the platform
function drawTiles() {
	imageMode(CORNER);
	//Drawing the tiles 1
	for (let i = 0; i < platformTile1X.length; i++) {

		for (let y = platformTile1Y[i]; y < height; y += platH) {
			let x = platformTile1X[i];
			if (platformTile1Order[i] === 0) {
				image(supportTile1[0], x, y, platW, platH);
			} else if (platformTile1Order[i] === 2) {
				image(supportTile1[2], x, y, platW, platH);
			} else {
				image(supportTile1[1], x, y, platW, platH);
			}
		}

		image(platformTile1[platformTile1Order[i]], platformTile1X[i], platformTile1Y[i], platW, platH);

		if (endPlatAni === false) {
			if (platformTile1Y[i] === platformTile1Y[i + 1] && platformTile1Order[i] != 2) {
				playerColissionWithGround(platformTile1X[i], platformTile1Y[i], platW * 2, platH, plat1ID[i], false);
			} else {
				playerColissionWithGround(platformTile1X[i], platformTile1Y[i], platW, platH, plat1ID[i], false);
			}
		}

		//Animation when player is over final platform
		if (endPlatAni) {
			platformTile1X[i] += 5;

			//Checks to see where the previous platform Y is at and acends/decends accordingly
			if (platformTile1Order[i] === 1) {

				if (platformTile1Y[i] !== platformTile1Y[i - 1]) {
					if (platformTile1Y[i] > platformTile1Y[i - 1]) {
						platformTile1Y[i] -= 2;
					} else {
						platformTile1Y[i] += 2;
					}
					if (abs(platformTile1Y[i] - platformTile1Y[i - 1]) < 1.5) {
						platformTile1Y[i] = platformTile1Y[i - 1];
					}
				}
			}

			if (platformTile1Order[i] === 2) {
				if (platformTile1Y[i] !== platformTile1Y[i - 2]) {
					if (platformTile1Y[i] > platformTile1Y[i - 2]) {
						platformTile1Y[i] -= 2;
					} else {
						platformTile1Y[i] += 2;
					}
					if (abs(platformTile1Y[i] - platformTile1Y[i - 2]) < 1.5) {
						platformTile1Y[i] = platformTile1Y[i - 2];
					}
				}
			}
		}
	}

	//Drawing the tiles 2
	for (let i = 0; i < platformTile2X.length; i++) {

		for (let y = platformTile2Y[i]; y < height; y += platH) {
			let x = platformTile2X[i];
			if (platformTile2Order[i] === 0) {
				image(supportTile1[0], x, y, platW, platH);
			} else if (platformTile1Order[i] === 2) {
				image(supportTile1[2], x, y, platW, platH);
			} else {
				image(supportTile1[1], x, y, platW, platH);
			}
		}
		image(platformTile2[platformTile2Order[i]], platformTile2X[i], platformTile2Y[i], platW, platH);

		if (endPlatAni === false) {
			if (platformTile2Y[i] === platformTile2Y[i + 1] && platformTile2Order[i] != 2) {
				playerColissionWithGround(platformTile2X[i], platformTile2Y[i], platW * 2, platH, plat2ID[i], false);
			} else {
				playerColissionWithGround(platformTile2X[i], platformTile2Y[i], platW, platH, plat2ID[i], false);
			}
		}

		if (endPlatAni) {
			platformTile2X[i] += 5;

			if (platformTile2Order[i] === 1) {
				if (platformTile2Y[i] !== platformTile2Y[i - 1]) {
					if (platformTile2Y[i] > platformTile2Y[i - 1]) {
						platformTile2Y[i] -= 2;
					} else {
						platformTile2Y[i] += 2;
					}
					if (abs(platformTile2Y[i] - platformTile2Y[i - 1]) < 1.5) {
						platformTile2Y[i] = platformTile2Y[i - 1];
					}
				}
			}
			if (platformTile2Order[i] === 2) {
				if (platformTile2Y[i] !== platformTile2Y[i - 2]) {
					if (platformTile2Y[i] > platformTile2Y[i - 2]) {
						platformTile2Y[i] -= 2;
					} else {
						platformTile2Y[i] += 2;
					}
					if (abs(platformTile2Y[i] - platformTile2Y[i - 2]) < 1.5) {
						platformTile2Y[i] = platformTile2Y[i - 2];
					}
				}
			}
		}
	}

	//Drawing finale tile
	image(finaleTile, finaleTileX, finaleTileY, platW, platH);
	playerColissionWithGround(finaleTileX, finaleTileY, platW, platH, finalPlatID, true);

	//After the final platform reaches the top it resets the level
	if (endPlatAni) {
		if (finaleTileX > 0) {
			finaleTileX -= 5;
		} else {
			if (finaleTileY - ph > 0) {
				finaleTileY -= 5;
			} else {
				resetLevel();
				generateLevel();
				playerMoveable = true;
			}
		}
	}

	//Drawing spike tiles
	for (let x = 0; x < width; x += platW) {
		image(platformSpikes, x, 550, platW, platH);
		playerColissionWithSpikes(600);
		for (let y = 600; y < height; y += platH) {
			if (x === 0) {
				image(supportTile1[0], x, y, platW, platH);
			} else if (x === width - platW) {
				image(supportTile1[2], x, y, platW, platH);
			} else {
				image(supportTile1[1], x, y, platW, platH);
			}
		}
	}
}