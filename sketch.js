// Sorry this is real janky code, I'll tidy it up one day, probably.
// Danny Walker, 2018
// http://danny.makesthings.work || https://walkerdanny.github.io
// CC BY-NC-SA 4.0

var minRad_s, maxRad_s, length_s, g_s, friction_s, theta_in_s, phi_v_in_s
var xRot, zRot
var minRad, maxRad, length, g, friction

var phi_in = 0;
var phi_v_in;
var phi_a_in = 0;

var theta_in;
var theta_v_in = 0;
var theta_a_in = 0;

var data = [];

var points = [];

var maxVel, minVel;

var endPoint = 1;
var num_points = 900;

var currX = 0;
var currY = 0;
var zoom =0;

function setup() {
  createCanvas(600,600, WEBGL);

  xRot = 0;
  zRot = 0;

  minRad_s = createSlider(1,5,1,0.2);
  maxRad_s = createSlider(5,10,8,0.2);
  length_s = createSlider(50,90,65,1);
  g_s  = createSlider(-60,-10,-30,1);
  friction_s = createSlider(0.998,1,0.999,0.0001);
  theta_in_s = createSlider(60,120,80,1);
  phi_v_in_s = createSlider(0.3,2,0.6,0.1);
  button = createButton('Re-Initialise!');



  button.position(width/2, height-50);
  minRad_s.position(20, 20);
  maxRad_s.position(20, 50);
  length_s.position(20,80);
  g_s.position(20,110);
  friction_s.position(20,140);
  theta_in_s.position(20,170);
  phi_v_in_s.position(20,200);

  var l1 = createSpan('Minimum Radius');
  l1.position(20 + 10 + minRad_s.width, 20 + 3);
  var l2 = createSpan('Maximum Radius');
  l2.position(20 + 10 + maxRad_s.width, 50 + 3);
  var l3 = createSpan('Length');
  l3.position(20 + 10 + length_s.width, 80 + 3);
  var l4 = createSpan('Gravity');
  l4.position(20 + 10 + g_s.width, 110 + 3);
  var l5 = createSpan('Friction');
  l5.position(20 + 10 + friction_s.width, 140 + 3);
  var l6 = createSpan('Initial Theta');
  l6.position(20 + 10 + theta_in_s.width, 170 + 3);
  var l7 = createSpan('Initial Phi Velocity');
  l7.position(20 + 10 + phi_v_in_s.width, 200 + 3);


  minRad = minRad_s.value();
  maxRad = maxRad_s.value();
  length = length_s.value();
  g = g_s.value();
  friction = friction_s.value();
  theta_in = theta_in_s.value();
  phi_v_in = phi_v_in_s.value();
  button.mousePressed(reInit);

  var xPos_in = length*sin(radians(theta_in))*cos(radians(phi_in));
  var yPos_in = length*sin(radians(theta_in))*sin(radians(phi_in));
  var zPos_in = -length*cos(radians(theta_in));

  data = [theta_in, theta_v_in, theta_a_in, phi_in, phi_v_in, phi_a_in, xPos_in, yPos_in, zPos_in];
  points[0] = [xPos_in, yPos_in, zPos_in, velMag(theta_v_in, phi_v_in)];

  var preVels = []
  var preData = data.slice(0); // It's fun that you have to do this instead of copying
  for (var i = 0; i<num_points; i++){
    preData = updatePendulum(preData);
    preVels.push(velMag(preData[1], preData[4]));
  }

  minVel = 10000;
  maxVel = 0;
  for (var i = 0; i<num_points; i++){
    if(preVels[i]<minVel) minVel = preVels[i];
    if(preVels[i] > maxVel) maxVel = preVels[i];
  }

}

function draw() {
  background(255);
  translate(0,0,300+zoom);
  rotateX(3*PI/4);
  rotateX(xRot);
  rotateZ(zRot);

  for (var i =0; i<endPoint; i++){
    translate(points[i][0], points[i][1], points[i][2]);
    rad = map(points[i][3], minVel, maxVel, minRad, maxRad);
    sphere(rad);
    translate(-points[i][0], -points[i][1], -points[i][2]);
  }

  if(endPoint < num_points){
    data = updatePendulum(data);
    points.push([data[6], data[7], data[8], velMag(data[1], data[4])]);
    endPoint++;
  }
}

function updatePendulum(data){
  var theta = data[0];
  var theta_v = data[1];
  var theta_a = data[2];

  var phi = data[3];
  var phi_v = data[4];
  var phi_a = data[5];

  theta_a = (sin(radians(theta))*cos(radians(theta))*phi_v*phi_v) - ((g/length)*sin(radians(theta)));

  // This line is commented out because of... reasons.
  //phi_a = -2*phi_v*theta_v*(np.cos(np.radians(theta))/np.sin(np.radians(theta)))
  // If you actually implement the acceleration in phi, bear in mind it tends to infinity as theta approaches zero, and you should deal with this.
  // My solution is to ignore it and pretend phi_v is constant

  phi_a = phi_a_in;
  theta_v += theta_a;
  phi_v += phi_a;

  // Simulate some viscous friction!
  theta_v *= friction;
  phi_v *= friction;

  theta += theta_v;
  phi += phi_v;

  // Calculate the Cartesian coordinates again
  var xPos = length*sin(radians(theta))*cos(radians(phi))
  var yPos = length*sin(radians(theta))*sin(radians(phi))
  var zPos = -length*cos(radians(theta))

  // ...and fill up the data array again before returning it
  data = [theta, theta_v, theta_a, phi, phi_v, phi_a, xPos, yPos, zPos]

  return data

}

function velMag(theta_v_input, phi_v_input){
    magn = sqrt(theta_v_input*theta_v_input + phi_v_input*phi_v_input)
    return magn
}

function reInit(){
  minRad = minRad_s.value();
  maxRad = maxRad_s.value();
  length = length_s.value();
  g = g_s.value();
  friction = friction_s.value();
  theta_in = theta_in_s.value();
  phi_v_in = phi_v_in_s.value();

  var xPos_in = length*sin(radians(theta_in))*cos(radians(phi_in));
  var yPos_in = length*sin(radians(theta_in))*sin(radians(phi_in));
  var zPos_in = -length*cos(radians(theta_in));

  data = [theta_in, theta_v_in, theta_a_in, phi_in, phi_v_in, phi_a_in, xPos_in, yPos_in, zPos_in];
  endPoint = 0;

  var preVels = []
  var preData = data.slice(0); // It's fun that you have to do this instead of copying
  for (var i = 0; i<num_points; i++){
    preData = updatePendulum(preData);
    preVels.push(velMag(preData[1], preData[4]));
  }

  minVel = 10000;
  maxVel = 0;
  for (var i = 0; i<num_points; i++){
    if(preVels[i]<minVel) minVel = preVels[i];
    if(preVels[i] > maxVel) maxVel = preVels[i];
  }

  for (var i = 0; i<num_points; i++){
    points.pop();
  }
}


function mouseDragged(){
  if(mouseY < height && mouseY > 0 && mouseX < width && mouseX>0){
    var xDisp = mouseX -currX;
    var yDisp = mouseY - currY;

    xRot = map(yDisp, -height/2, height/2, -PI, PI);
    zRot = map(xDisp, -width/2, width/2, -PI, PI);
  }
}

function mousePressed(){
  currX = mouseX;
  currY = mouseY;
}

function mouseWheel(event) {
  zoom -= event.delta/4;
  return false;
}
