function mouseInside(){
    return ((0 <= mouseX) && (mouseX <= width) && (0 <= mouseY) && (mouseY <= height));
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    if (!mouseInside()) return;
    let v = new Vertex(mouseX, mouseY);
    
    if (mode === "ray") new Ray(v, 40);

    if (mode === "shape"){
        if (shapes.length > 0){
            let checkContinue = lastShape().mousePressed();
            if (checkContinue) return;
        }
        new Shape(v);
    }

    if (mode === "edit"){

    }
}

function mouseDragged(){
    if (mode === "ray"){
        let r = rays[rays.length-1];
        r.updateAngle(mouseX,mouseY);
    }

    if (mode === "edit" && highlighted !== undefined){
        highlighted.mouseDragged();
        if (highlighted.parent !== undefined){
            highlighted.parent.mouseDragged();
        }
    }
}

// Finishes creating a polygon.
function doubleClicked(){
    if (!mouseInside()) return;
    else if (mode === "shape") lastShape().doubleClicked();
}

// Switches modes between ray casting and polygon drawing.
// function keyPressed(){
//     if (key == 'r') mode = "ray";
//     else mode = "shape";
//     vertices = [];
// }

function setup() {
    createCanvas(innerWidth,innerHeight);
    checkedRadio(0);
}

// Keeps old polygons/rays on-screen.
function draw() {
    background(220);
    
    push();
    noFill();

    if (mouseIsPressed) stroke(255);
    else stroke(0);
    
    ellipse(mouseX, mouseY, 20, 20);
    pop();
    
    drawShapes();
    drawRay();
    
    if (!mouseIsPressed && mode === "edit") checkDistance(10);
}