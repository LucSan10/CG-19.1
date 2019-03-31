let modo = 0;

//------------Only-Polygons------------

// Array of polygons
let poligonos = [];
// Polygon = {points, color}

// Array of vertices 
let vertices = [];
// Vertex = {x, y}

let cor;

//------------Only-Rays----------------

let raios = [];

let r1;
let r2;

function vertice(x, y){
    this.x = x;
    this.y = y;
}

function poligono(v, c){
    this.vertices = v;
    this.cor = c;
}

function raio(v){
    this.v = v;
    this.ang = 0;
    this.updateAngle = function(px,py){
        deltaY = (py - this.v.y);
        deltaX = (px - this.v.x);
        this.ang = atan2(deltaY,deltaX);
    }
}

function randomColor(){
    return Math.floor(Math.random() * 256);
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    let v = new vertice(mouseX, mouseY);
    if (!modo) vertices.push(v);
    else{
        let r = new raio(v);
        raios.push(r);
    }
}

function mouseDragged(){
    if (modo){
        let r = raios[raios.length-1];
        r.updateAngle(mouseX,mouseY);
    }
}

// Finishes creating a polygon.
function doubleClicked(){
    if (!modo){
        let p = new poligono(vertices, cor);
        poligonos.push(p);
        vertices = [];
        cor = color(randomColor(), randomColor(), randomColor(), 128);
    }
}

// Switches modes between ray casting and polygon drawing.
function keyPressed(){
    if (key == 'r') modo = 1;
    else modo = 0;
    vertices = [];
}

function desenharRaio(){
    for (let r of raios){
        push();
        strokeWeight(5);
        point(r.v.x, r.v.y);
        pop();
        
        let lineEndX = r.v.x + 40*cos(r.ang);
        let lineEndY = r.v.y + 40*sin(r.ang);
          
        let tempC = 2.5*cos(r.ang);
        let tempS = 2.5*sin(r.ang);
        
        push();
        strokeWeight(2);
        line(r.v.x, r.v.y, lineEndX, lineEndY);
        pop();  
      
        push();
        fill(color(0));
        triangle(lineEndX + 2*tempC, lineEndY + 2*tempS, lineEndX - tempS, lineEndY + tempC, lineEndX + tempS, lineEndY - tempC);
        pop();
    }
}

// Draws new polygons.
function desenharPoligono(){
    beginShape();
    for (let vertice of vertices){
        vertex(vertice.x, vertice.y);
    }
    vertex(mouseX,mouseY);
    fill(cor);
    endShape(CLOSE);
}

function setup() {
    createCanvas(400,400);
    cor = color(randomColor(), randomColor(), randomColor(), 128);
}

// Keeps old polygons/rays on-screen.
function draw() {
    background(200);

    if (mouseIsPressed){
        noFill();
        ellipse(mouseX, mouseY, 25, 25);
    }
    for (let poligono of poligonos){
        beginShape();
        let v = poligono.vertices;
        for(let p of v){
            vertex(p.x, p.y);
        }
        fill(poligono.cor);
        endShape(CLOSE);
    }
    desenharPoligono();
    desenharRaio();
}