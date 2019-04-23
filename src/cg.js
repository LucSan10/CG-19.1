function mouseInside(){
    return ((0 <= mouseX) && (mouseX <= width) && (0 <= mouseY) && (mouseY <= height));
}

function mouseMoved(){
    if (mode === "edit") checkDistance(10);
}

function keyPressed(){
    if (key === "Escape"){

        if (mode === "shape"){
            let s = lastShape();
            if (!s.finished){
                shapes.pop();
                delete s;
            }
        }
    
        if (mode === "ray"){
            let r = lastRay();
            if (!r.finished){
                rays.pop();
                delete r;
            }
        }
    }


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
}

function mouseDragged(){
    if (!mouseInside()) return;
    if (mode === "ray"){
        let r = lastRay();
        if (!r.finished) r.updateAngle(mouseX,mouseY);
    }

    if (mode === "edit" && highlighted !== undefined){
        highlighted.mouseDragged(mouseX, pmouseX, mouseY, pmouseY);
        if (highlighted.parent !== undefined){
            highlighted.parent.mouseDragged();
        }
    }
}

function mouseReleased(){
    if (mode === "ray") lastRay().mouseReleased();
}

// Finishes creating a polygon.
function doubleClicked(){
    if (!mouseInside()) return;
    else if (mode === "shape") lastShape().doubleClicked();
}

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
}