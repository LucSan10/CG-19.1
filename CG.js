
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

let rays = [];

function vertice(x, y){
    this.x = x;
    this.y = y;
}

function poligono(v, c){
    this.vertices = v;
    this.cor = c;
}

function ray(v){
    this.vertice = v;
    this.angulo = 0;
    this.updateAngle = function(x, y){
        this.angle = atan2((y - this.vertice.y)/(x - this.vertice.x));
    }
}

function setup() {
    createCanvas(400,400);
    cor = color(randomColor(), randomColor(), randomColor(), 128);
}

function randomColor(){
    return Math.floor(Math.random() * 256);
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    let v = new vertice(mouseX, mouseY);
    vertices.push(v);
}

function mouseDragged(){
    if (modo){
        let r = new ray(v);
        r.updateAngle(mouseX, mouseY);
        line(r.vertice.x, r.vertice.y, 10*cos(r.ang), 10*sin(r.ang));

        let v1 = new vertice(15*cos(r.ang), 15*sin(r.ang));
        let v2 = new vertice(10*cos(r.ang) - 5*sin(r.ang), 10*sin(r.ang) - 5*cos(r.ang));
        let v3 = new vertice(10*cos(r.ang) + 5*sin(r.ang), 10*sin(r.ang) + 5*cos(r.ang));
        triangle(v1.x,v1.y,v2.x,v2.y,v3.x,v3.y);
        mouseReleased(r);    
    }
}

function mouseReleased(ray){
    if (modo) rays.push(ray);
}

// Switches modes between ray casting and polygon drawing.
function keyPressed(){
    if (key == 'r') modo = 1;
    else modo = 0;
    vertices = [];
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

function desenharRaio(){
    
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

    if (modo) desenharRaio();
    else desenharPoligono();
}