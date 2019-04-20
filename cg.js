function mouseInside(){
    return ((0 <= mouseX) && (mouseX <= width) && (0 <= mouseY) && (mouseY <= height));
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    if (!mouseInside()) return;
    else{
        let v = new Vertex(mouseX, mouseY);
        if (mode === "ray"){
            // let rIndex = rays.findIndex(r => r.underMouse === true);
            // let vIndex = rays.findIndex(r => r.v.underMouse === true);
            
            //print(rIndex);
            //print(vIndex);
            
            /*if (){
                selecionado.setRay()
            }
            
            else{*/
                let r = new Ray(v, 40);
                //}
        }
        if (mode === "shape"){
            if (shapes.length > 0){
                if (!lastShape().finished){
                    lastShape().mousePressed();
                    return;
                }
            }
            new Shape(v);
        }
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
    else{
        if (mode === "shape"){
            // let p = new Shape(vertices);
            // shapes.push(p);
            // vertices = [];
            lastShape().doubleClicked();
        }
    }
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
    background(200);
    
    push();
    noFill();
    if (mouseIsPressed) stroke(255, 255, 255);
    else stroke(0, 0, 0);
    ellipse(mouseX, mouseY, 20, 20);
    pop();
    
    // desenharShapeAtual();
    drawShapes();
    // desenharExtensao();
    drawRay();
    if (!mouseIsPressed && mode === "edit") checkDistance(10);
}