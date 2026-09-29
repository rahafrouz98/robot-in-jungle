//Game Project-Part6
//Code lines between //Start and //End are produced by Hamed Rahafrouz.
// Other code lines outside of the //start and //End body are assisted by the course lecture material

let isLeft;
let isRight;
let isFalling;
let isPlummeting;
let newLevelCameraSet;
let isParachuting;
let isHunted;
let isIncontactwithEnemy;
let isFreeFalling;
let isGameOverSoundPlayed;
let isGameStartedOver;

let gameChar_x;
let gameChar_y;
let gameCharSpeed_Y;
let floorPos_y;
let trees;
let cameraPosx;
let cameraPosy;
let lives;
let canyons;
let clouds;
let mountains;
let collectables;
let gamescenery_length;
let game_level_length;
let game_scenery_height;
let gameChar_max_X;
let score;
//battery_inventory is the collected scores in the current level.
// It is used to identify the elligibility to turn the beamlight on and go to next level
let battery_inventory;
let beam_lights;
let current_level_start_x;
let current_level;
let fly_boards;
let riden_fly_board_index;
let enemy_in_contact_index;
let stars;
let enemies;
//timers
let hunted_time;
let level_acheived_time;
let jumped_time;
let faild_beam_light_time;
let free_falling_time;
//sounds
let jumpSound;
let pintSound;
let fallSound;
let huntedSound;
let beamLightSound;
let beamLightFailSound;
let gameOverSound;

function preload() {
    soundFormats("mp3", "wav");
    // the sounds are sourced from https://freesound.org/, and all are under the Creative Commons License.
    jumpSound = loadSound("sounds/350898__cabled_mess__jump_c_08.wav");
    pointSound = loadSound("sounds/253172__suntemple__retro-bonus-pickup-sfx.wav");
    fallSound = loadSound("sounds/84327__splashdust__sadwhisle.wav");
    huntedSound = loadSound("sounds/488663__nodgez__shock_two.wav");
    beamLightSound = loadSound("sounds/399315__vendarro__signal-ring-1.wav");
    beamLightFailSound = loadSound("sounds/548003__sieuamthanh__anlonlaser3_2.wav");
    gameOverSound = loadSound("sounds/159408__noirenex__life-lost-game-over.wav");

    jumpSound.setVolume(1);
    pointSound.setVolume(0.1);
    fallSound.setVolume(1);
    huntedSound.setVolume(0.1);
    beamLightSound.setVolume(0.1);
    beamLightFailSound.setVolume(0.1);
    gameOverSound.setVolume(0.1);
}
function setup() {
    createCanvas(1024, 600);
    floorPos_y = (height * 3) / 4;
    lives = 3;
    score = 0;
    game_scenery_height = 1200;
    isGameStartedOver = true;
    startGame();
}

function draw() {
    //#############################################Scenery Extending  ######################################
    //Determine if the scenery is extended based on the maximum x that character has achieved.
    // If the charachter reaches new maximum x, the scenery needs to be exteded
    if (gameChar_x > gameChar_max_X) {
        gameChar_max_X = gameChar_x;
    }
    //Extend the scenery and its components when charechter reaches to the second half of current level
    //Extending code is generating unlimited random scenery as game character approches to the right
    if (
        gameChar_max_X > current_level_start_x + game_level_length / 2 &&
        gamescenery_length - gameChar_x < game_level_length
    ) {
        //extend scenery length
        gamescenery_length += game_level_length;
        //Add four mountains to the extended scenery
        for (let i = 0; i < 4; i++) {
            mountains.push(
                new Mountain(random(gamescenery_length - game_level_length, gamescenery_length), random(1.2, 3)),
            );
        }
        //Add collectable objects to the extended scenery
        let NCES = min((current_level + 1) * 2, 8); //number of collectables for extended scenery. its max is limited to  8.
        for (let i = 0; i < NCES; i++) {
            //collectables will be placed in a range between 100 units lower than scenery height and 50 units higher than floor
            collectables.push(
                new Collectable(
                    random(gamescenery_length - game_level_length, gamescenery_length),
                    random(height - game_scenery_height + 100, floorPos_y - 50),
                ),
            );
        }
        // add six trees to the exyended scenery
        for (let i = 0; i < 6; i++) {
            trees.push(
                new Tree(
                    random(gamescenery_length - game_level_length, gamescenery_length),
                    floorPos_y,
                    random(0.6, 2),
                ),
            );
        }
        //add four clouds for the extended scenery
        for (let i = 0; i < 4; i++) {
            let new_cloud = new Cloud(
                random(gamescenery_length - game_level_length, gamescenery_length),
                random(height / 8, height / 6),
                random(-0.3, -0.6),
                random(300, 700),
                [255, 255, 255, 255],
            );
            clouds.push(new_cloud);
        }
        //add canyons and enemies to the extended scenery
        //Canyon should not be placed at the end of levels where light beams are placed. To prevent this placed the canyon 100 units after the start of the newly added scenery
        //Number of canyons for extended scenery equal to the current level number and after level 4 it remains 4.
        //enemies will be displayed at level 2 with number of 1. Number of enemies will be increased by one
        // as new level is acheived until level 4. From level 4, maximum number of enemies will be three.
        //the correspondent level for the extended scenery is equal to current_leve+1
        //From level 4, the speed of enemies will be increased by one for each new levels.

        if (current_level + 1 == 2) {
            canyons.push(
                new Canyon(
                    random(gamescenery_length - game_level_length + 100, gamescenery_length - game_level_length / 2),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(gamescenery_length - game_level_length / 2, gamescenery_length - 100),
                    random(width / 30, width / 15),
                ),
            );
            if (canyons[canyons.length - 1].x - canyons[canyons.length - 2].x > 250) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 2].x + canyons[canyons.length - 2].holeSize / 2 + 50,
                        canyons[canyons.length - 1].x - canyons[canyons.length - 1].holeSize / 2 - 50,
                    ),
                );
            } else {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 1].x + canyons[canyons.length - 1].holeSize / 2 + 50,
                        gamescenery_length - 20,
                    ),
                );
            }
        } else if (current_level + 1 == 3) {
            canyons.push(
                new Canyon(
                    random(
                        gamescenery_length - game_level_length + 100,
                        gamescenery_length - (2 * game_level_length) / 3,
                    ),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(
                        gamescenery_length - (2 * game_level_length) / 3,
                        gamescenery_length - game_level_length / 3,
                    ),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(gamescenery_length - game_level_length / 3, gamescenery_length - 100),
                    random(width / 30, width / 15),
                ),
            );
            //add the first enemy between first and second canyon if there is enough space between them. otherwise add it between second and third canyons
            if (canyons[canyons.length - 2].x - canyons[canyons.length - 3].x > 250) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 3].x + canyons[canyons.length - 3].holeSize / 2 + 50,
                        canyons[canyons.length - 2].x - canyons[canyons.length - 2].holeSize / 2 - 50,
                    ),
                );
            } else if (canyons[canyons.length - 1].x - canyons[canyons.length - 2].x > 250) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 2].x + canyons[canyons.length - 2].holeSize / 2 + 50,
                        canyons[canyons.length - 1].x - canyons[canyons.length - 1].holeSize / 2 - 50,
                    ),
                );
            }
            //add the second enemy between second and third canyons if there is not enemy added there already and if it is wide enough.
            if (
                canyons[canyons.length - 1].x - canyons[canyons.length - 2].x > 250 &&
                enemies[enemies.length - 1].x < canyons[canyons.length - 2].x
            ) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 2].x + canyons[canyons.length - 2].holeSize / 2 + 50,
                        canyons[canyons.length - 1].x - canyons[canyons.length - 1].holeSize / 2 - 50,
                    ),
                );
            } else {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 1].x + canyons[canyons.length - 1].holeSize / 2 + 50,
                        gamescenery_length - 20,
                    ),
                );
            }
        } else {
            canyons.push(
                new Canyon(
                    random(
                        gamescenery_length - game_level_length + 100,
                        gamescenery_length - (3 * game_level_length) / 4,
                    ),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(
                        gamescenery_length - (3 * game_level_length) / 4,
                        gamescenery_length - (2 * game_level_length) / 4,
                    ),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(
                        gamescenery_length - (2 * game_level_length) / 4,
                        gamescenery_length - game_level_length / 4,
                    ),
                    random(width / 30, width / 15),
                ),
            );
            canyons.push(
                new Canyon(
                    random(gamescenery_length - game_level_length / 4, gamescenery_length - 100),
                    random(width / 30, width / 15),
                ),
            );

            //add the first enemy between first and second canyon if there is enough space between them. otherwise add it between second and third canyons
            if (canyons[canyons.length - 3].x - canyons[canyons.length - 4].x > 250) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 4].x + canyons[canyons.length - 4].holeSize / 2 + 50,
                        canyons[canyons.length - 3].x - canyons[canyons.length - 3].holeSize / 2 - 50,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            } else {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 3].x + canyons[canyons.length - 3].holeSize / 2 + 50,
                        canyons[canyons.length - 2].x - canyons[canyons.length - 2].holeSize / 2 - 50,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            }
            //add the second enemy between second and third canyons if there is not enemy added there already, and if it is wide enough.
            if (
                canyons[canyons.length - 2].x - canyons[canyons.length - 3].x > 250 &&
                enemies[enemies.length - 1].x < canyons[canyons.length - 3].x
            ) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 3].x + canyons[canyons.length - 3].holeSize / 2 + 50,
                        canyons[canyons.length - 2].x - canyons[canyons.length - 2].holeSize / 2 - 50,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            } else if (canyons[canyons.length - 1].x - canyons[canyons.length - 2].x > 250) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 2].x + canyons[canyons.length - 2].holeSize / 2 + 50,
                        canyons[canyons.length - 1].x - canyons[canyons.length - 1].holeSize / 2 - 50,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            }
            //add the third enemy between second and third canyons if there is not enemy added there already, and if it is wide enough.
            if (
                canyons[canyons.length - 1].x - canyons[canyons.length - 2].x > 250 &&
                enemies[enemies.length - 1].x < canyons[canyons.length - 2].x
            ) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 2].x + canyons[canyons.length - 2].holeSize / 2 + 50,
                        canyons[canyons.length - 1].x - canyons[canyons.length - 1].holeSize / 2 - 50,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            } else if (gamescenery_length - canyons[canyons.length - 1].x > 200) {
                enemies.push(
                    new Enemy(
                        canyons[canyons.length - 1].x + canyons[canyons.length - 1].holeSize / 2 + 50,
                        gamescenery_length - 20,
                    ),
                );
                enemies[enemies.length - 1].speed = current_level;
            }
        }
        //Add two fly boards for level 2 and level 3, one in each half of extended scenery
        if (current_level + 1 == 2 || current_level + 1 == 3) {
            fly_boards.push(
                new FlyBoard(
                    random(gamescenery_length - game_level_length, gamescenery_length - game_level_length / 2),
                    random(400, height - game_scenery_height),
                ),
            );
            fly_boards.push(
                new FlyBoard(
                    random(gamescenery_length - game_level_length / 2, gamescenery_length),
                    random(400, height - game_scenery_height),
                ),
            );
        } else //Add three fly boards for level 4 and heigher, one in each third section of extended scenery
        {
            fly_boards.push(
                new FlyBoard(
                    random(gamescenery_length - game_level_length, gamescenery_length - (game_level_length * 2) / 3),
                    random(400, height - game_scenery_height),
                ),
            );
            fly_boards.push(
                new FlyBoard(
                    random(
                        gamescenery_length - (game_level_length * 2) / 3,
                        gamescenery_length - game_level_length / 3,
                    ),
                    random(400, height - game_scenery_height),
                ),
            );
            fly_boards.push(
                new FlyBoard(
                    random(gamescenery_length - game_level_length / 3, gamescenery_length),
                    random(400, height - game_scenery_height),
                ),
            );
        }
    }

    //##############################################Drawing objects   ######################################
    //fill the sky blue
    background(100, 155, 255);
    //####################################Scrolling Implementation  ######################################
    // moving the x axis of the coordination system to the left and right by using the cameraPosx variable to scroll the scenery accordingly
    //The idea of using cameraPosx,translate() and push() and pop() to scroll the scenery is used from the assignment instructions
    //update the cameraPosx depending on the position of the character for using it in scrolling later
    if (
        gameChar_x - current_level_start_x > width / 2 &&
        (beam_lights[1].x - gameChar_x > width / 2 - 100 || //for scrolling to the right until the next beam light is at 100 units from the right side of the canva
            (gameChar_x + cameraPosx < width * 0.5 && cameraPosx < current_level_start_x))
    ) //for scrolling to the left
    {
        cameraPosx = width * 0.5 - gameChar_x;
    }
    //update the y position of camera, so it moves with game charectar as it raise or down.
    if (gameChar_y <= height / 2 - 50 && gameChar_y >= -(game_scenery_height - height) * 0.5) {
        cameraPosy = -(gameChar_y - height / 2);
    } else if (gameChar_y > height / 2) {
        cameraPosy = 0;
    }
    //When new level acheived,set the camera at the begining of each level so the start of the level and game charecter is located at left side of canva
    if (!newLevelCameraSet) {
        cameraPosx -= 15;
        if (beam_lights[0].x + cameraPosx <= 50) newLevelCameraSet = true;
    }
    //Translate the coordination system based on camera position. It is how scrolling happens.
    push();
    translate(cameraPosx, cameraPosy);
    //draw some green ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, gamescenery_length, height - floorPos_y);
    fill(0, 130, 0);
    rect(0, floorPos_y, gamescenery_length, 2);

    // Upper Sky
    let USR = 200; // Upper Sky Resolution
    for (let i = 0; i < USR; i++) {
        let blue = map(i, 0, USR, 255, 20);
        let green = map(i, 0, USR, 155, 0);
        let red = map(i, 0, USR, 100, 0);
        stroke(red, green, blue);
        strokeWeight((game_scenery_height - height) / USR);
        line(
            0,
            -((game_scenery_height - height) / USR) * i,
            gamescenery_length,
            -((game_scenery_height - height) / USR) * i,
        );
    }
    //stars
    let USS = 5; // Number of Upper Sky Sections. Higher sections will get more sensity of stars
    let USSL = (game_scenery_height - height) / USS; // length of each section
    randomSeed(50); // I used random seed to produce fixrd random positions for stars. It is inspired by https://p5js.org/reference/p5/randomSeed/
    push();
    fill(255);
    noStroke();
    for (let i = 0; i < USS; i++) {
        //I used pow() function to give more density of stars at higher levels
        for (let j = 0; j < pow(USS * i, 2); j++) {
            ellipse(
                random(current_level_start_x - 30, current_level_start_x + game_level_length + 100),
                -random(i * USSL, i * USSL + USSL),
                random(1, 3),
            );
        }
    }
    pop();

    //mountains
    for (let i = 0; i < mountains.length; i++) {
        mountains[i].drawMountain();
    }

    //Clouds
    //Clouds are moving from right to left with random speed and when they exit
    // from the left side of the screen, they will be entered from the right side again
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].drawCloud();
    }

    //Trees
    for (let i = 0; i < trees.length; i++) {
        trees[i].drawTree();
    }

    //Draw collectable toke
    for (let i = 0; i < collectables.length; i++) {
        collectables[i].drawCollectable();
    }
    //draw the canyons
    for (let i = 0; i < canyons.length; i++) {
        canyons[i].drawCanyon();
    }
    //Draw fly board
    for (let i = 0; i < fly_boards.length; i++) {
        fly_boards[i].drawFlyBoard();
    }
    //Draw the beam lights at the end of each level
    //Optional Chaining Operator, ?., is used to prevent error in level 1, when beam_lights[0] is undefined
    for (let i = 0; i < beam_lights.length; i++) {
        beam_lights[i]?.drawBeamLight();
    }
    //Draw enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].drawEnemy();
    }

    //Draw the game character positions
    //the idea of using angleMode(), translate() and rotate() to control the direction of hands is inspired from https://p5js.org/reference/
    //Draw hunted Character
    if (isIncontactwithEnemy) {
        drawHunted();
    }
    //Draw jumping-left character
    else if (isLeft && isFalling) {
        drawJumpLeft();
    }
    // Draw jumping-right character
    else if (isRight && isFalling) {
        drawJumpRight();
    }
    //Draw game character with parachute
    else if (isParachuting) {
        drawParachuting();
    }
    //Draw walking-left character
    else if (isLeft) {
        drawWalkLeft();
    }
    // Draw walking-right character
    else if (isRight) {
        drawWalkRight();
    }
    // Draw jumping character in forward facing position
    else if (isFalling || isPlummeting || isFreeFalling) {
        drawJumpForward();
    }
    // Draw standing character in front facing position
    else {
        drawStandingForward();
    }
    pop();
    //#######################################################Communication messages and indicators ###########################################################
    //Communicator box
    push();
    fill(100, 100, 0, 50);
    rectMode(CORNER);
    rect(0, 0, width, 50);
    pop();
    //Level and Score indicator
    push();
    fill(255, 255, 0);
    textStyle(BOLD);
    textSize(15);
    textAlign(CORNER);
    textAlign(CORNER);
    text("Level: " + current_level, 0, 20);
    text("Scores: " + score, 0, 40);
    pop();
    //Energy Bar
    push();
    textStyle(BOLD);
    textSize(20);
    textAlign(CORNER);
    fill(255, 255, 0);
    text("Stored Energy: ", width - 350, 30);
    noFill();
    stroke(255, 255, 0);
    strokeWeight(2);
    rect(width - 200, 15, 150, 20, 5);
    let energy_bar_color;
    let bar_length = min((battery_inventory / min(current_level, 4)) * 150, 150);
    if (battery_inventory >= min(current_level, 4)) {
        energy_bar_color = color(0, 255, 0, 200);
    } else {
        energy_bar_color = color(255, 0, 0, 200);
    }
    fill(energy_bar_color);
    if (battery_inventory > 0) {
        rect(width - 200, 15, bar_length, 20, 5);
    }
    pop();
    //Remained Lives indicator
    push();
    //the idea of using switch is inspired from https://www.w3schools.com/js/js_switch.asp
    textStyle(BOLD);
    textSize(20);
    textAlign(CORNER);
    fill(255, 255, 0);
    text("Repair Kits:", width / 2 - 200, 30);
    fill(0, 0, 0);
    switch (lives) {
        case 3:
            drawWrench(width / 2 - 70, 10, 0.2);
            drawWrench(width / 2 - 50, 10, 0.2);
            drawWrench(width / 2 - 30, 10, 0.2);
        case 2:
            drawWrench(width / 2 - 70, 10, 0.2);
            drawWrench(width / 2 - 50, 10, 0.2);
        case 1:
            drawWrench(width / 2 - 70, 10, 0.2);
    }

    pop();
    if (millis() - level_acheived_time < 3000 && current_level > 1) {
        push();
        textSize(50);
        fill(0, 255, 0, 150);
        textAlign(CENTER, CENTER);
        text("Level " + (current_level - 1) + " completed", width / 2, height / 4);
        pop();
    }
    if (lives < 1) {
        push();
        textSize(50);
        fill(255, 0, 0, 200);
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 4);
        pop();
        if (!isGameOverSoundPlayed) {
            gameOverSound.play();
            isGameOverSoundPlayed = true;
        }
    }
    //Message for fallied attempt to turn on the beam light
    if (millis() - faild_beam_light_time < 3000) {
        push();
        fill(255, 0, 0, 100);
        rectMode(CENTER);
        rect(width - 120, height - 300, 235, 100, 50);
        textSize(20);
        fill(0, 0, 0);
        stroke(0);
        textAlign(CENTER, CENTER);
        text("You need to have a\nfull energy bar to be\nable to turn this light on", width - 120, height - 300);

        pop();
    }
    //Message to show the keys functionality and rulles when the game start for the first time
    if (isGameStartedOver) {
        push();
        rectMode(CENTER);
        fill(200, 200, 200, 200);
        rect(width / 2, height / 2, (width * 3) / 4, (height * 3) / 4);
        textSize(20);
        fill(0);
        rect((width * 1) / 4 + 27.5, (height * 1) / 4, 20, 20, 2);
        rect((width * 1) / 4 + 120, (height * 1) / 4, 100, 20, 2);
        rect((width * 1) / 4 + 27.5, (height * 1) / 4 + 40, 20, 20, 2);
        rect((width * 1) / 4 + 27.5, (height * 1) / 4 + 80, 20, 20, 2);
        rect((width * 1) / 4 + 147, (height * 1) / 4 + 120, 20, 20, 2);
        rect((width * 1) / 4 + 240, (height * 1) / 4 + 120, 100, 20, 2);
        textStyle(BOLD);
        textAlign(CORNER, CENTER);
        text("Press any key to start!", (width * 1) / 4 + 150, (height * 3) / 4 + 50);
        text("Jump:      or", (width * 1) / 4 - 50, (height * 1) / 4);
        text("Right:", (width * 1) / 4 - 50, (height * 1) / 4 + 40);
        text("Left:", (width * 1) / 4 - 50, (height * 1) / 4 + 80);
        text("Cancel Parachute:       or", (width * 1) / 4 - 50, (height * 1) / 4 + 120);
        textStyle(NORMAL);
        text(
            "To turn on the beam light and go to the next level, you must collect at least\n" +
                "half of the available bateries in the current level.\n\n" +
                "The Stored Energy bar will fill up once you have gathered the required\n" +
                "energy to power the beam light.",
            (width * 1) / 4 - 50,
            (height * 1) / 4 + 210,
        );

        fill(255);
        textSize(15);
        text("W               Space", (width * 1) / 4 + 21, (height * 1) / 4);
        text("D", (width * 1) / 4 + 22, (height * 1) / 4 + 40);
        text("A", (width * 1) / 4 + 22, (height * 1) / 4 + 80);
        text("W               Space", (width * 1) / 4 + 140, (height * 1) / 4 + 120);
        pop();
    }

    //###############################   INTERACTION CODE   ######################################
    //determine if the the charechterr is located on a canyon and if yes,
    // set isLeft and isRight variables to false to prevent the character from moving right and left
    for (let i = 0; i < canyons.length && !isPlummeting; i++) {
        if (canyons[i].checkCanyon()) {
            gameChar_x = canyons[i].x;
            fallSound.play();
            isPlummeting = true;
            isFalling = false;
            isLeft = false;
            isRight = false;
            break;
        }
    }
    // check if character is in contact with any enemy
    if (!isIncontactwithEnemy) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].checkEnemyVsCharacter()) {
                huntedSound.play();
                enemies[i].speed = 0;
                //to turn the enemie toward the game character at contact time.
                if (enemies[i].x > gameChar_x && isRight) {
                    enemies[i].isRight = false;
                    gameChar_x = enemies[i].x - 80;
                } else if (enemies[i].x < gameChar_x && isLeft) {
                    enemies[i].isRight = true;
                    gameChar_x = enemies[i].x + 10;
                }
                gameChar_y = floorPos_y;
                enemy_in_contact_index = i;
                isIncontactwithEnemy = true;
                isLeft = false;
                isRight = false;
                isFalling = false;
                isFreeFalling = false;
                hunted_time = millis();
                break;
            }
        }
    }
    //Enemies effect when is in contact with game character
    if (enemy_in_contact_index != undefined && millis() - hunted_time < 1500) {
        enemies[enemy_in_contact_index].y = random([
            floorPos_y - 50,
            floorPos_y - 25,
            floorPos_y - 25,
            floorPos_y - 25,
            floorPos_y - 25,
            floorPos_y - 25,
        ]);
    }
    //update enemies position and direction
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].updateEnemy();
    }
    //isHunted will be true after 2 seconds from the time isIncontactwithEnemy is turned true.
    //It is a delay for illustrating the tortion animation of game character before restarting the game
    if (millis() - hunted_time > 2000) {
        isHunted = true;
    }
    //Collect Collectables and increase score
    for (let i = 0; i < collectables.length; i++) {
        if (collectables[i].checkCollectable()) {
            score += 1;
            battery_inventory += 1;
            collectables[i].isFound = true;
            pointSound.play();
            break;
        }
    }
    // Check the position of the charecter and each beam light to determine if the charechter has reached to the beam light
    // Beam Light will be on if enough battreies are collected for each level which is half of the number of collectables in each level
    // The requirement is capped at 4 because each level has at most 8 batteries.
    if (beam_lights[1].checkBeamLight()) {
        if (battery_inventory >= min(current_level, 4)) {
            beam_lights[1].isReached = true;
            beamLightSound.play();
            current_level_start_x = beam_lights[1].x;
            current_level++;
            battery_inventory = 0;
            newLevelCameraSet = false;
            beam_lights.splice(0, 1);
            beam_lights.push(new BeamLight());
            level_acheived_time = reached_time = millis();
        }
        //isRecentlyReached is used to prevent the beamLightFailSound from being played repeatedly if game character stays at beal light location
        else if (!beam_lights[1].isRecentlyReached) {
            beamLightFailSound.play();
            beam_lights[1].isRecentlyReached = true;
            faild_beam_light_time = millis();
        }
    }
    //reset isRecentlyReached  of the end-level beam ligt to make the beamLightFailSound accessible again if character moves away from beam light
    // and approach to it again, but does not have enough score to turn beamlight on again.
    if (!beam_lights[1].checkBeamLight()) {
        beam_lights[1].isRecentlyReached = false;
    }
    //check the position of fly board and change the direction if required
    for (let i = 0; i < fly_boards.length; i++) {
        fly_boards[i].checkFlyBoardPosition();
    }
    //check if gamecharecter is located on the fly board
    if (gameCharSpeed_Y > 0 && !isParachuting) {
        for (i = 0; i < fly_boards.length; i++) {
            if (fly_boards[i].checkFlyBoardContact() && riden_fly_board_index == undefined) {
                riden_fly_board_index = i;
                isFalling = false;
                gameCharSpeed_Y = 0;
                isFreeFalling = false;
                break;
            }
        }
    }
    //check if the game charecter is off the fly board
    if (riden_fly_board_index != undefined && !fly_boards[riden_fly_board_index].checkFlyBoardContact()) {
        riden_fly_board_index = undefined;
        isFalling = true;
    }

    //update game character when it is on fly board.
    //Nullish Coalescing Operator, ??, is used so game character gets the location of fly board if it is on the fly board, and if it is not, it remains unchanged.
    //Optional Chaining Operator, ?.,  is used so that it rereturns undefined if game character is not on the fly board
    gameChar_y = fly_boards[riden_fly_board_index]?.y ?? gameChar_y;

    //Check if game character needs parachute
    if (isFalling && gameCharSpeed_Y >= 0 && gameChar_y - floorPos_y < -300 && !isParachuting && !isFreeFalling) {
        isFalling = false;
        isParachuting = true;
        riden_fly_board_index = undefined;
        isFreeFalling = false;
        gameCharSpeed_Y = 3;
    }

    //################################################Update Charachter Position####################################################
    /////////////////////////////////////////Move Right and Left////////////////////////////////////////
    // Move character to the left by 6 for walking status and by 7 for jumping or parachuting status
    // and limit this movement to the minimum of x=30 to prevent the charactar to exit from left
    if (isLeft && gameChar_x - current_level_start_x > 30) {
        if (!isFalling) gameChar_x -= 6;
        else if (isFalling && !isParachuting) gameChar_x -= 7;
    }
    //Move character to right and limit its movement to maximum of scenery length minus 30.
    else if (isRight && gameChar_x < current_level_start_x + game_level_length + 30) {
        if (!isFalling) gameChar_x += 6;
        else if (isFalling && !isParachuting) gameChar_x += 7;
    }
    ////////////////////////////////////////////move vertically////////////////////////////////////////////
    //update game character position and properties when it is in parachuting status
    if (isParachuting) {
        if (gameChar_y < floorPos_y) {
            gameChar_y += gameCharSpeed_Y;
        } else {
            gameChar_y = floorPos_y;
            isParachuting = false;
            gameCharSpeed_Y = 0;
        }
    }
    //update game character position and properties when it is freefalling
    else if (isFreeFalling) {
        if (gameChar_y < floorPos_y) {
            //kinematic formula is used simulating the natural fall
            //I constrained the speed to maximun 20 so it has the opportunity to detect the flying board and land on it if there is any
            gameCharSpeed_Y = min(gameCharSpeed_Y + (9.81 * (millis() - free_falling_time)) / 1000, 20);
            //kinamatic fornula for vertical displacement
            gameChar_y =
                gameChar_y +
                gameCharSpeed_Y * ((millis() - free_falling_time) / 1000) +
                (9.81 * ((millis() - free_falling_time) / 1000) ** 2) / 2;
        } else {
            gameChar_y = floorPos_y;
            isFreeFalling = false;
            gameCharSpeed_Y = 0;
        }
    }

    //I used kinematic formulas of displacement and speed to simulate natural jumping
    //The idea of using millis() to identify the time is taken from https://p5js.org/reference/p5/millis/
    else if (isFalling) {
        //kinematic formula for speed
        gameCharSpeed_Y = gameCharSpeed_Y + (9.81 * (millis() - jumped_time)) / 1000;
        //kinamatic fornula for vertical displacement
        gameChar_y =
            gameChar_y +
            gameCharSpeed_Y * ((millis() - jumped_time) / 1000) +
            (9.81 * ((millis() - jumped_time) / 1000) ** 2) / 2;

        if (gameChar_y > floorPos_y) {
            gameCharSpeed_Y = 0;
            gameChar_y = floorPos_y;
            isFalling = false;
        }
    }
    //Plumetting the charechter into the canyon
    else if (isPlummeting) {
        gameChar_y += 5;
    }

    //decrease the lives of the game character if it is hunted by the enemy or if it is plummeted into the canyon
    // and restart the game if any life is remained
    checkGameCharacterDie();

    //###############################################  Clean up Memory     ######################################
    //I added this section to free memory of objects that are in previous levels so I save the CPU capacity and mempory for next levels
    //the reason I added this is that game would be slow as new leves was acheived, mostly because of the colouds and fly boards effects.
    cleanUpMemory();
}
//############################################### Key Interactions     ####################################
function keyPressed() {
    //isGameStartedOver is used to indicate if the instruction message, which is for the begining of the game, shows or not.
    if (!isGameStartedOver) {
        //key code 65 is related to a. It moves the character to the left
        if (keyCode == 65 && !isPlummeting && !isFreeFalling && !isIncontactwithEnemy) {
            isLeft = true;
        }
        //key code 68 is related to d. It moves the character to the right
        if (keyCode == 68 && !isPlummeting && !isFreeFalling && !isIncontactwithEnemy) {
            isRight = true;
        }
        //key code 87 is related to w. It initialize jumping or cancel parachuting
        //key code 32 is related to Space key whcih is a substitute for w
        //the idea of using key code 32 for Space keycode is inspired from https://www.toptal.com/developers/keycode
        if (
            (keyCode == 87 || keyCode == 32) &&
            !isPlummeting &&
            !isIncontactwithEnemy &&
            !isFreeFalling &&
            !isFalling
        ) {
            if (!isParachuting) {
                isFalling = true;
                gameCharSpeed_Y = -65;
                riden_fly_board_index = undefined;
                jumped_time = millis();
                jumpSound.play();
            } else if (isParachuting) {
                free_falling_time = millis();
                isParachuting = false;
                isFreeFalling = true;
                isRight = false;
                isLeft = false;
            }
        }
    } else {
        isGameStartedOver = false;
    }
}

function keyReleased() {
    // when keys a or d are released, the variables isLeft and isRight
    //  are set to false respectively to cancel the character movement to right or left.
    if (keyCode == 65) {
        isLeft = false;
    }
    if (keyCode == 68) {
        isRight = false;
    }
}

function startGame() {
    //Restart the game when the function is revoked
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    newLevelCameraSet = true;
    isParachuting = false;
    isHunted = false;
    isIncontactwithEnemy = false;
    isFreeFalling = false;
    isGameOverSoundPlayed = false;
    cameraPosx = 0;
    cameraPosy = 0;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    gamescenery_length = 1300;
    game_level_length = 1300;
    gameChar_max_X = gameChar_x;
    current_level = 1;
    current_level_start_x = 0;
    gameCharSpeed_Y = 0;
    trees = [];
    canyons = [];
    clouds = [];
    mountains = [];
    collectables = [];
    beam_lights = [];
    fly_boards = [];
    stars = [];
    enemies = [];
    hunted_time = undefined;
    battery_inventory = 0;
    enemy_in_contact_index = undefined;
    riden_fly_board_index = undefined;
    //Add first two collectables befor extending the scenery
    for (let i = 0; i < 2; i++) {
        collectables.push(new Collectable(random(0, gamescenery_length), random(250, floorPos_y - 50)));
    }
    //Add first two canyons
    //one canyon is the first half of the scenery and one canyon to the second half of the scenery
    //canyons is placed 200 units away from the center of canva where the game charecter is initially located
    // canyons is placed 200 units away from the light beams so that game charecter can turn it on
    canyons.push(new Canyon(random(100, width / 2 - 200), random(width / 30, width / 15)));
    canyons.push(new Canyon(random(width / 2 + 200, gamescenery_length - 200), random(width / 30, width / 15)));

    //Array of first four objects of clouds
    for (let i = 0; i < 4; i++) {
        let new_cloud = new Cloud(
            random(0, gamescenery_length),
            random(height / 8, height / 6),
            random(-0.3, -0.6),
            random(300, 700),
            [255, 255, 255, 255],
        );
        clouds.push(new_cloud);
    }

    //Array of first four objects of mountains
    for (let i = 0; i < 4; i++) {
        mountains.push(new Mountain(random(0, gamescenery_length), random(1.2, 3)));
    }

    //Initial array of trees
    for (let i = 0; i < 6; i++) {
        trees.push(new Tree(random(0, gamescenery_length), floorPos_y, random(0.6, 2)));
    }

    /*
	Add one beamlight to the end of level one. beam-lights[0] is undefined because it is at the start of the game 
	and no beamlight is expected to be there 
	*/
    beam_lights[0] = undefined;
    beam_lights[1] = new BeamLight();
}

function cleanUpMemory() {
    //Clean clouds that have passed the current level and add new one if the number of clouds is less than certain amount
    for (let i = 0; i < clouds.length; i++) {
        if (clouds[i].cloudX < current_level_start_x - 700) {
            clouds.splice(i, 1);
            i--;
            if (clouds.length < 8) {
                //add a new level at the right side of the game
                let new_cloud = new Cloud(
                    current_level_start_x + game_level_length,
                    random(height / 8, height / 6),
                    random(-0.3, -0.6),
                    random(300, 700),
                    [255, 255, 255, 255],
                );
                clouds.push(new_cloud);
            }
        }
    }

    for (let i = 0; i < collectables.length; i++) {
        if (collectables[i].x < current_level_start_x) {
            collectables.splice(i, 1);
        }
    }
    for (let i = 0; i < trees.length; i++) {
        if (trees[i].x < current_level_start_x) {
            trees.splice(i, 1);
        }
    }
    for (let i = 0; i < canyons.length; i++) {
        if (canyons[i].x < current_level_start_x) {
            canyons.splice(i, 1);
        }
    }
    for (let i = 0; i < mountains.length; i++) {
        if (mountains[i].x < current_level_start_x) {
            mountains.splice(i, 1);
        }
    }
    for (let i = 0; i < fly_boards.length; i++) {
        if (fly_boards[i].x < current_level_start_x) {
            fly_boards.splice(i, 1);
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].x < current_level_start_x) {
            enemies.splice(i, 1);
        }
    }
}
//wrench is used as an indicator of the number of remained lives
function drawWrench(wrench_x, wrench_y, wrench_scale) {
    let scale = wrench_scale;
    let x = wrench_x;
    let y = wrench_y;
    stroke(0);
    strokeWeight(2);
    fill(0, 200, 200);
    rect(x - 25 * scale, y + 35 * scale, 25 * scale, 100 * scale, 10 * scale);
    beginShape();
    curveVertex(x - 0 * scale, y + 10 * scale);
    curveVertex(x + 1 * scale, y - 1 * scale);
    curveVertex(x + scale * 10, y);
    curveVertex(x + scale * 15, y + scale * 40);
    curveVertex(x - 40 * scale, y + 40 * scale);
    curveVertex(x - 35 * scale, y);
    curveVertex(x - 25 * scale, y);
    curveVertex(x - 25 * scale, y + 25 * scale);
    curveVertex(x, y + 25 * scale);
    curveVertex(x + 1 * scale, y + -1 * scale);
    curveVertex(x + 1 * scale, y - 1 * scale);
    endShape();
    ellipse(x - 12.5 * scale, y + 125 * scale, 40 * scale, 40 * scale);
    push();
    blendMode(REMOVE);
    ellipse(x - 12.5 * scale, y + 125 * scale, 20 * scale, 20 * scale);
    pop();

    noFill();
    ellipse(x - 12.5 * scale, y + 125 * scale, 20 * scale, 20 * scale);
}
