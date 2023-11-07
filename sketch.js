var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("./assets/tower.png");
  doorImg = loadImage("./assets/door.png");
  climberImg = loadImage("./assets/climber.png");
  ghostImg = loadImage("./assets/ghost-standing.png");
  spookySound = loadSound("./assets/spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  ghost.debug = false
  ghost.setCollider("rectangle", -10, 20, 150, 250, 0)

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  if (gameState == "play") {
    createDoors()
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("space")) {
      ghost.velocityY = -10
    }
    ghost.velocityY += 0.9
    if (keyDown("left")) {
      ghost.position.x -= 5
    }
    if (keyDown("right")) {
      ghost.position.x += 5
    }
    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0
    }
    drawSprites()
    if (ghost.isTouching(invisibleBlockGroup) || ghost.position.y > 600 || ghost.position.y < 0) {
      gameState = "END"

    }

  }
  if (gameState == "END") {
    background(0)

    textSize(80)
    textAlign(CENTER)
    text("GAME OVER", 300, 300)
  }

}
function createDoors() {
  if (frameCount % 200 == 0) {
    door = createSprite(random(100, 500), -10)
    door.velocityY = 1
    door.addImage(doorImg)
    door.lifetime = 800
    door.depth = ghost.depth - 1
    doorsGroup.add(door)

    climber = createSprite(door.position.x, door.position.y + 55)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 800
    climbersGroup.add(climber)

    invisibleBlock = createSprite(climber.position.x, climber.position.y + 10, climber.width, 5)
    invisibleBlock.velocityY = 1
    invisibleBlock.visible = false
    invisibleBlock.lifetime = 800
    invisibleBlockGroup.add(invisibleBlock)
  }
}
