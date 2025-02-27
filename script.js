


const canvasBox = document.getElementById("canvasbox");

let fruitsdata = [
    {
        name: "cherry",
        level: 0,
        size: 20,
        color: "#FF0000" // Red
    },
    {
        name: "seedy",
        level: 1,
        size: 30,
        color: "#008000" // Green
    },


    {
        name: "orange",
        level: 2,
        size: 40,
        color: "#FFA500" // Orange
    },
    {
        name: "lemon",
        level: 3,
        size: 50,
        color: "#E63745" // Orange
    },



    {
        name: "kiwi",
        level: 4,
        size: 60,
        color: "#FFA500" // Orange
    },
    {
        name: "peach",
        level: 5,
        size: 70,
        color: "#E63745" // Orange
    },



    {
        name: "pomegranate",
        level: 6,
        size: 80,
        color: "#765827" // Brown
    },
    {
        name: "pineapple",
        level: 7,
        size: 90,
        color: "#008000" // Green
    },




    {
        name: "coconut",
        level: 8,
        size: 100,
        color: "#765827" // Brown
    },
    {
        name: "watermelon",
        level: 9,
        size: 150,
        color: "#008000" // Green
    }
]


// module aliases
var Engine = Matter.Engine,
    //   Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Detector = Matter.Detector,
    Query = Matter.Query,
    Composite = Matter.Composite;
var engine
let leftWall;
let rightWall;


var ground
let fruitinhand
let fruits = []
let score = 0

let handpos = [canvasBox.offsetWidth / 2, 70]

let playing = true
let nextFruit;


function preload() {

    fruitsdata[0].image = loadImage('./img/level0.png');
    fruitsdata[1].image = loadImage('./img/level1.png');
    fruitsdata[2].image = loadImage('./img/level2.png');
    fruitsdata[3].image = loadImage('./img/level3.png');
    fruitsdata[4].image = loadImage('./img/level4.png');
    fruitsdata[5].image = loadImage('./img/level5.png');
    fruitsdata[6].image = loadImage('./img/level6.png');
    fruitsdata[7].image = loadImage('./img/level7.png');
    fruitsdata[8].image = loadImage('./img/level8.png');
    fruitsdata[9].image = loadImage('./img/level9.png');

}

function setup() {


    // Create a p5.js canvas inside the "canvasbox" div
    // const canvas = createCanvas(canvasBox.offsetWidth, 800);
    const canvas = createCanvas(canvasBox.offsetWidth, canvasBox.offsetHeight);

    canvas.parent("canvasbox"); // Attach the canvas to the div


    engine = Engine.create();


    // create two boxes and a ground
    // boxA = Bodies.rectangle(400, 200, 80, 80);
    // boxB = Bodies.rectangle(450, 50, 80, 80);
    // ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


    // add all of the bodies to the world
    //  Composite.add(engine.world, [boxA, boxB]);



    // add ground 
    ground = new Ground(width / 2, height, 60, engine.world)
    leftWall = Matter.Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
    rightWall = Matter.Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });

    Composite.add(engine.world, [leftWall, rightWall]);



    // create one fruit in hand
    assignfruitinhand()


    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

}

function displaynextfruit() {
    if (nextFruit) {
        const xx = width - 30;
        const yy = 30 ;
        const size = 50;
    
        // Hiển thị hình ảnh
        push(); // Lưu trạng thái hiện tại của canvas
        imageMode(CENTER); // Đặt chế độ hiển thị hình ảnh tại tâm
        image(nextFruit.image, xx, yy, size, size); // Hiển thị hình ảnh
        pop(); // Khôi phục lại trạng thái trước đó của canvas
    
        // Vẽ khung bao quanh
        noFill();
        stroke(0);
        strokeWeight(2);
        rectMode(CENTER);
        rect(xx, yy, size + 10, size + 10);
    }
    }
function movehand() {
    if (playing) {
        if (keyIsDown(LEFT_ARROW)) {
            handpos[0] -= 10
        }

        if (keyIsDown(RIGHT_ARROW)) {
            handpos[0] += 10
        }

        handpos[0] = constrain(handpos[0], 50, width - 50); // Adjust the 25 as needed
    }
}

function assignfruitinhand() {
    // Nếu có trái cây tiếp theo, sử dụng nó
    if (nextFruit) {
        fruitinhand = nextFruit; // Gán trái cây tiếp theo cho fruitinhand
        console.log("Assigned nextFruit to fruitinhand:", fruitinhand);
    } else {
        // Nếu không có trái cây tiếp theo, tạo ngẫu nhiên
        let rannum = floor(random(4));
        fruitinhand = new Fruit(engine.world, rannum);
        console.log("Created new fruitinhand:", fruitinhand);
    }

    // Tạo trái cây tiếp theo mới
    assignNextFruit();
    console.log("Next fruit after assignment:", nextFruit);
}
function assignNextFruit() {
    let rannum = floor(random(4)); // Chọn ngẫu nhiên một số từ 0 đến 3
    console.log("Next fruit assigned with level:", rannum); // Kiểm tra trái cây tiếp theo
    nextFruit = new Fruit(engine.world, rannum); // Tạo trái cây tiếp theo
    nextFruit.isfixed = true; // Đảm bảo trái cây tiếp theo không rơi xuống
    nextFruit.image = fruitsdata[rannum].image;
    console.log("Next fruit object:", nextFruit); // Kiểm tra đối tượng nextFruit
    console.log("Next fruit image:", nextFruit.image); // Kiểm tra hình ảnh của nextFruit
}

// function checkCollisions(objects) {
//     const levelGroups = {};

//     for (const obj of objects) {
//         const level = obj.level;
//         if (!levelGroups[level]) {
//             levelGroups[level] = [];
//         }
//         levelGroups[level].push(obj);
//     }

//     for (const level in levelGroups) {
//         if (levelGroups[level].length >= 2) {
//             for (let i = 0; i < levelGroups[level].length; i++) {

//                 const bodyA = levelGroups[level][i];

//                 for (let j = i + 1; j < levelGroups[level].length; j++) {
//                     const bodyB = levelGroups[level][j];

//                     // Use Matter.Query.collides to check for collisions between two bodies
//                     const collisions = Query.collides(bodyA.body, [bodyB.body]);

//                     if (collisions.length > 0) {
//                         console.log(`Objects of level ${level} are touching.`);


//                         // if two objects of the same level group are touching
//                         // remove 2 objects
//                         // create a a new object with one level higher level in the position between two previous bodies
//                     }
//                 }
//             }
//         }
//     }
// }


function checkCollisions(circles) {

    const fruitsToRemove = [];
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            const circleA = circles[i];
            const circleB = circles[j];

            // Check if the circles have the same type and are colliding
            if (circleA.level === circleB.level && circleA.level < fruitsdata.length - 1 && Query.collides(circleA.body, [circleB.body]).length > 0) {
                // Circles with the same type are touching each other
                console.log(`Circles ${i} and ${j} with type ${circleA.level} are touching.`);

                // if two objects of the same level group are touching

                // create a a new object with one level higher level in the position between two previous bodies


                let templevel = circleA.level

                let tempx = circleA.body.position.x
                let tempy = circleA.body.position.y

                let tempx2 = circleB.body.position.x
                let tempy2 = circleB.body.position.y


                // update score
                score += circleA.level * 10


                fruitsToRemove.push(circleA, circleB);

                // Remove the colliding fruits from the array
                for (const fruit of fruitsToRemove) {
                    const index = fruits.indexOf(fruit);
                    if (index !== -1) {
                        fruits.splice(index, 1);
                        Matter.World.remove(engine.world, fruit.body);
                    }

                }


                let newhigherlevelfruit = new Fruit(engine.world, templevel + 1);
                newhigherlevelfruit.isfixed = false

                // find x and y of collision
                let middle = findMiddlePoint(tempx, tempy, tempx2, tempy2)

                Matter.Body.setPosition(newhigherlevelfruit.body, { x: middle.x, y: middle.y });

                fruits.push(newhigherlevelfruit)





            }
        }
    }





}

function findMiddlePoint(x1, y1, x2, y2) {
    const middleX = (x1 + x2) / 2;
    const middleY = (y1 + y2) / 2;
    return { x: middleX, y: middleY };
}


function displayscore() {
    stroke("#765827")
    strokeWeight(4);


    //  textFont(displayfont);
    textSize(40);
    // noStroke();
    fill("yellow");

    textAlign(LEFT, CENTER);
    text(score, 50, 70);
}


function drawDashedLine() {

    stroke("#D90631")
    strokeWeight(5)
    const y = 100; // Y-coordinate of the dashed line
    const dashLength = 20; // Length of each dash
    const gapLength = 20; // Length of each gap between dashes
    const lineLength = width; // Length of the entire line



    for (let x = 0; x < lineLength; x += dashLength + gapLength) {
        line(x, y, x + dashLength, y);
    }
}


function findObjectWithLowestY(fruits) {
    if (fruits.length === 0) {
        // Handle the case where the array is empty
        return null;
    }

    // Initialize with the first object in the array
    let lowestYObject = fruits[0];

    for (let i = 1; i < fruits.length; i++) {
        const currentObject = fruits[i];

        // Compare the y values
        if (currentObject.body.position.y < lowestYObject.body.position.y) {
            lowestYObject = currentObject;
        }
    }

    return lowestYObject.body.position.y;
}

fruits1 = [];
let gameOver = false;
const limitLineY = 150; // Vạch giới hạn trên
let timeAboveLimit = 0;
const timeLimit = 3000; // 3 giây

function draw() {
    background("#EAC696");

    ground.display()

    movehand()
    // display hand
    ellipse(handpos[0], handpos[1], 10, 10);

    // display fruit in hand
    if (fruitinhand) {
        fruitinhand.display()
    }

    // display fruits in the game
    for (let index = 0; index < fruits.length; index++) {
        fruits[index].display()
    }

    // check for collisions
    if (fruits.length >= 2) {
        checkCollisions(fruits)
    }

    // display score
    displayscore()

    // if fruits are getting closer draw the line
    if (findObjectWithLowestY(fruits) < 200) {
        // draw line
        drawDashedLine()
    }

    // Check if any fruit is above the limit
    if (findObjectWithLowestY(fruits) < 150) {
        if (!gameOver) {
            timeAboveLimit += deltaTime;
            if (timeAboveLimit >= timeLimit) {
                gameOver = true;
                playing = false;
                displayGameOver();
            }
        }
    } else {
        timeAboveLimit = 0; // Reset the timer if no fruit is above the limit
    }

    // Display game over message
    if (gameOver) {
        displayGameOver();
    }
    displaynextfruit();
}

function displayGameOver() {
    fill(255, 0, 0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(30);
    text("Press R to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
    if (playing) {
        if (key === ' ') {
            // release the inhand fruit
            fruitinhand.isfixed = false
            // move fruit in hand to fruits array
            fruits.push(fruitinhand)
            // assign new fruit in hand
            assignfruitinhand()
        }
    }

    // Restart the game when 'r' or 'R' is pressed
    if (key === 'r' || key === 'R') {
        restartGame();
    }
}

function restartGame() {
    // Reset game state
    gameOver = false;
    playing = true;
    timeAboveLimit = 0;
    score = 0;

    // Remove all fruits from the world
    for (let i = fruits.length - 1; i >= 0; i--) {
        Matter.World.remove(engine.world, fruits[i].body);
        fruits.splice(i, 1);
    }

    // Remove the fruit in hand
    if (fruitinhand) {
        Matter.World.remove(engine.world, fruitinhand.body);
        fruitinhand = null;
    }

    // Assign a new fruit in hand
    assignfruitinhand();
    assignNextFruit();
}
