function mouseInside(){
    return ((0 <= mouseX) && (mouseX <= width) && (0 <= mouseY) && (mouseY <= height));
}

function setup() {
    createCanvas(innerWidth,innerHeight);
    checkedRadio();
}

// Keeps old polygons/rays on-screen.
function draw() {
    background(200);
    
    if (mouseIsPressed){
        noFill();
        ellipse(mouseX, mouseY, 25, 25);
    }
    
    // desenharShapeAtual();
    desenharShapes();
    desenharExtensao();
    desenharRay();
    checarDistancia();
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    if (!mouseInside()) return;
    else{
        let v = new Vertex(mouseX, mouseY);
        if (mode === "ray"){
            let rIndex = rays.findIndex(r => r.underMouse === true);
            let vIndex = rays.findIndex(r => r.v.underMouse === true);
            
            //print(rIndex);
            //print(vIndex);
            
            /*if (){
                selecionado.setRay()
            }
            
            else{*/
                let r = new Ray(v);
                //}
        }
        if (mode === "shape"){
            if (shapes.length > 0){
                console.log(lastShape());
                if (!lastShape().finished){
                    lastShape().mousePressed();
                    return;
                }
            }
            new Shape(v);
            console.log(shapes.length);
        }
    }
}

function mouseDragged(){
    if (mode === "ray"){
        let r = rays[rays.length-1];
        r.updateAngle(mouseX,mouseY);
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