const SLICE_COUNT = 10;

function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_FRAME); // STATIC_DISK, STATIC_FRAME, ANIMATED_DISK
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope){

  new PLayer(null, 169, 222, 245);  //lets us draw the whole circle background, ignoring the boundaries
  
  var faceLayer = new PLayer(face);
  faceLayer.mode(RING);
  faceLayer.set_boundary( 650, 980 )
  
  var pizzaLayer = new PLayer(pizza)
  pizzaLayer.mode(RING)
  pizzaLayer.set_boundary( 0, 450 );

  // var beerLayer = new PLayer(beer);
  // beerLayer.mode( RING )
  // beerLayer.set_boundary( 640, 980 );
  
}


/**
 * This function draws a pizza floating toawrds Homer Simpsons mouth.  
 * @param {The x-coordinate of where the pScope starts} x 
 * @param {The x-coordinate of where the pScope starts} y 
 * @param {Used for .wave() and .frame} animation 
 * @param {Used for inserting images or setting the background} pScope 
 */
function pizza(x, y, animation, pScope){
  let wave20 = animation.wave()*20;
  let frame = animation.frame;
  let peperoniSize = 60;

  push();

  if (frame > 0.4) {
    translate(0, 100-frame*470); // moves pizzas into mouth
    scale(0.1+animation.wave(5)*1.5); // scales so it can fit into mouth 
  }
  else {
    // keeps pizza on table 
    translate(0, 0);

    // if homer has eaten the pizza on these frames
    if (frame == 0.0 || frame == 0.1){
      scale(0.01); // scals it down so you can't see it 
    }
  }

  // crust area
  pScope.fill_background(252, 152, 3);

  // cheese area
  fill(252, 186, 3);
  strokeWeight(0);
  beginShape();
  vertex(x, y);
  vertex(-129, -400);
  stroke(189, 25, 55);
  bezierVertex(-129,-500, 50, -300, 126, -400);
  vertex(x, y);
  endShape();

  // tomato sauce outline
  strokeWeight(20);
  noFill();
  stroke(250, 100, 62);
  bezier(-129,-400, -20, -500, x, -250, 126, -400);

  // peperonis
  strokeWeight(0);
  fill(161, 40, 40);
  circle(15, -200, peperoniSize+wave20);
  circle(-40+wave20, -320-wave20, peperoniSize);

  // crust 
  stroke(205,133,63);
  strokeWeight(19);
  noFill();
  arc(x, -425, 270, 70, 180, y, OPEN);

  pop();
}


/**
 * This function draws Homer Simpsons face eating and chewing satisfactorily. 
 * @param {The x-coordinate of where the pScope starts} x 
 * @param {The x-coordinate of where the pScope starts} y 
 * @param {Used for .wave() and .frame} animation 
 * @param {Used for inserting images or setting the background} pScope 
 */
function face(x, y, animation, pScope){
  // variables
  var earSize = 30;
  var wave70 = animation.wave()*70;
  var wave40 = animation.wave()*40;
  var hairX = 0;
  var hairY = -940;

 pScope.fill_background(109, 202, 242); // blue
 strokeWeight(5);

 // yellow area 
 fill(255, 213, 33);
 ellipse(-85, -790, 20, earSize); // these two are the ears 
 ellipse(85, -790, 20, earSize);
 ellipse(0, -820, 170, 270-animation.wave()*20); // the face

  // brown area chewing or eating 
  fill(212, 176, 128);
 if (animation.frame < 0.5){ // if its half the slices then:
  // chewing
  ellipse(0, -735, 175, 170-wave70)
  arc(0, -735, 120, 40, 0, 180, OPEN);
 }
 else {
  // opening mouth
  ellipse(0, -705, 155, 170-wave70)
  fill('black')
  ellipse(0, -705, 154, 105-wave70)
  // this for loop is for the teeth 
  for (let i = 0; i<4; i++){
    fill('white')
    arc(-38+i*25, -748+wave40, 30, 50, 0, 180, CHORD)
  }
  // homers tongue 
  fill('red')
  ellipse(-12, -680-wave40, 70, 50) 
  arc(0, -680-wave40, 50, 50+animation.wave(9)*200, 0, 180, OPEN) // arc sticking out of mouth - stretches to lick pizza 
 }

 // eyes
 fill('white');
 makeEyes(-55, -830, 70, wave70);
 fill('black');
 makeEyes(-59, -830, 13, animation.wave()*13);

 // nose
 fill(255, 213, 33);
 arc(0, -800, 40, 50, -15, 195, OPEN);
 // hair 
 noFill();
 arc(hairX, hairY+animation.wave()*10, 80, 50, 180, 0);
 arc(hairX, hairY+animation.wave()*10, 110, 70, 170, 10);
}

/**
 * Makes Homer Simpsons' eyes.
 * @param {x-coordinate} x 
 * @param {y-coordinate} y 
 * @param {size of the eye/circle} size 
 * @param {the amount of movement that the height will be animated} wave 
 */
function makeEyes(x, y, size, wave){
  ellipse(x, y, size, size-wave);
  ellipse(Math.abs(x), y, size, size-wave);
}


/**
 * This function draws a can of 'Duff' beer being poured into Homers ear. 
 * @param {The x-coordinate of where the pScope starts} x 
 * @param {The x-coordinate of where the pScope starts} y 
 * @param {Used for .wave() and .frame} animation 
 * @param {Used for inserting images or setting the background} pScope 
 */
function beer(x, y, animation, pScope){
  // variables 
  x = 630+animation.frame*30;
  y = 90;

  // the outline of the beer can 
  strokeWeight(5);
  fill(217, 54, 46);
  beginShape();
  curveVertex(x+250, y-20);
  curveVertex(x+250, y-20);
  curveVertex(x+300, y-170);
  curveVertex(x+220, y-200);
  curveVertex(x+180, y-40);
  curveVertex(x+250, y-20);
  curveVertex(x+300, y-170);
  endShape();

  // the curve of the top
  noFill();
  arc(x+260, y-180, 90, 30, 10, 180, OPEN);

  // the duff label 
  fill('white');
  noStroke();
  ellipse(x+233, y-105, 85, 100);
  // beer text
  fill('black');
  textSize(25);
  text('BEER', x+200, y-70);
  // duff text
  textFont('Times New Roman');
  textSize(40);
  text('Duff', x+195, y-100);

  // the pour of beer into homers ear 
  stroke(205,133,63);
  strokeWeight(4);
  randBeer(x, y, 210, 210, 20, true);

  // the fizzing bubbles on homers ear 
  stroke('black');
  fill(222,184,135);
  randBeer(x, y, 120, 260, 40, false);

  // can opening 
  strokeWeight(25);
  point(x+240, y-190);

  // beer going out of can opening 
  stroke(205,133,63);
  strokeWeight(18);
  point(x+235, y-192);

}


/**
 * This function gets random numbers between a set of numbers and either draws lines or circles. 
 * @param {*x-coordinate} x 
 * @param {*y-coordinate} y 
 * @param {*Extra x-coordinate} plusX 
 * @param {*Extra y-coordinate} plusY 
 * @param {*Max range that the random number can have} maxRand 
 * @param {*Is it a line or a circle?} isLine 
 */
function randBeer(x, y, plusX, plusY, maxRand, isLine){
  for (let i =0; i < 10; i++){
    let randX = Math.floor(Math.random()*maxRand) + x+plusX; 
    let randY = Math.floor(Math.random()*maxRand) + y-plusY;
    if (isLine){
      line(randX, randY, randX-80, randY-50);
    }
    else {
      circle(randX, randY, Math.random()*30);
    }
  }
}