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

    if (key === "r") stack.redo();
    if (key === "u") stack.undo();
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    if (!mouseInside()) return;
    let v = new Vertex(mouseX, mouseY);

    stack.locked = true;

    if (mode === "shape"){
        if (shapes.length > 0){
            let checkContinue = lastShape().mousePressed();
            if (checkContinue) return;
        }
        new Shape(v);
    }

    if (mode === "ray") new Ray(v, 40);
    
    if (mode === "edit") addMoveUndo(highlighted);
}

function mouseDragged(){
    if (!mouseInside()) return;
    if (mode === "ray"){
        let r = lastRay();
        if (!r.finished) r.updateAngle(mouseX, mouseY);
    }

    if (mode === "edit" && highlighted !== undefined){
        highlighted.mouseDragged(mouseX, pmouseX, mouseY, pmouseY);
        if (highlighted.parent !== undefined){
            highlighted.parent.mouseDragged(mouseX, pmouseX, mouseY, pmouseY);
        }
    }
}

function mouseReleased(){
    if (mode === "shape") return;

    stack.locked = false;
    if (mode === "ray"){
        lastRay().mouseReleased();
    }
}

// Finishes creating a polygon.
function doubleClicked(){
    if (!mouseInside()) return;
    else if (mode === "shape"){
        stack.locked = false;
        lastShape().doubleClicked();
    }
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