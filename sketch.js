let bodyImage;
let bodyWidth;
let bodyHeight;
let bodyX;
let bodyY;
let faceImage;
let faceWidth;
let faceHeight;
let faceX;
let faceY;
let handsImage;
let handsWidth;
let handsHeight;
let handsX;
let handsY;
let ratioBody = 968 / 506 // bodyWidth / bodyHeight
let ratioFace = 587 / 592; // faceWidth / faceHeight
let ratioHand = 842 / 428; // handsWidth / handsHeight
let ratioBodyFace = 968 / 587 // bodyWidth / faceWidth
let ratioBodyHand = 968 / 842; //faceWidth / handsWidth
let offsetHand = 126 / 842; // offsetHands / handsWidth
let offsetFaceX = 164 / 587; // offsetFaceX / faceWidth
let offsetFaceY = -423 / 592 // offsetFaceY / faceHeight
let foodArray = new Array(4);
let foodWidth;
let foodHeight;
let foodX;
let foodY;
let foodRatio = [304 / 235, 398 / 478, 451 / 281, 399 / 406];
let foodIndex;
let colorArray = new Array(4);
let isDesktop = false;
const faceMovement = 3;
let currentFaceMovement = 0;
let increment = 1;

function preload() {
    foodArray[0] = loadImage('img/burger.png');
    foodArray[1] = loadImage('img/chips.png');
    foodArray[2] = loadImage('img/pizza.png');
    foodArray[3] = loadImage('img/wrap.png');
    bodyImage = loadImage('img/body.png');
    faceImage = loadImage('img/face.png');
    handsImage = loadImage('img/hands.png');
    colorArray[0] = color(150,206,180);
    colorArray[1] = color(255,238,173);
    colorArray[2] = color(255,111,105);
    colorArray[3] = color(255,204,92);
}
function setup() {
    if (windowWidth > windowHeight) isDesktop = true;
    foodIndex = Math.floor(random(0, 4));
  	createCanvas(windowWidth, windowHeight);
    frameRate(6);
    background(colorArray[foodIndex]);
}

function draw() {
    background(colorArray[foodIndex]);
    currentFaceMovement += increment; 
    if (currentFaceMovement % faceMovement == 0) increment = -increment;

    if (isDesktop) { // on desktop
        // 0 - body
        // height = 2/3 windowHeight
        bodyHeight = windowHeight / 3;
        bodyWidth = bodyHeight * ratioBody;
        // x axis align center
        bodyX = (windowWidth - bodyWidth) / 2;
        // y axis align bottom
        bodyY = windowHeight - bodyHeight;
    } else { // on mobile
        // 0 - body
        // width = windowWidth
        bodyWidth = windowWidth;
        bodyHeight = bodyWidth / ratioBody;
        // x axis align center
        bodyX = 0;
        // y axis align bottom
        bodyY = windowHeight - bodyHeight;
    }
    // 1 - face
    faceWidth = bodyWidth / ratioBodyFace;
    faceHeight = faceWidth / ratioFace;
    faceX = bodyX + offsetFaceX * faceWidth;
    faceY = bodyY + offsetFaceY * faceHeight;
    // 2 - food
    foodWidth = bodyWidth * 3 / 5;
    foodHeight = foodWidth / foodRatio[foodIndex];
    foodX = bodyX + bodyWidth / 8;
    foodY = bodyY - bodyHeight / 9;
    // 3 - hands
    handsWidth = bodyWidth / ratioBodyHand;
    handsHeight = handsWidth / ratioHand;
    handsX = bodyX + offsetHand * handsWidth;
    handsY = windowHeight - handsHeight;    
    // load image
    image(bodyImage, bodyX, bodyY, bodyWidth, bodyHeight);
    image(faceImage, faceX, faceY + currentFaceMovement, faceWidth, faceHeight);
    image (foodArray[foodIndex], foodX, foodY, foodWidth, foodHeight);
    image(handsImage, handsX, handsY, handsWidth, handsHeight);            
}

function deviceShaken() {
    foodIndex = Math.floor(random(0, 4));
}