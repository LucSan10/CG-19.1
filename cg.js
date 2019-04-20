function mouseInside(){
    return ((0 <= mouseX) && (mouseX <= width) && (0 <= mouseY) && (mouseY <= height));
}

function setup() {
    createCanvas(innerWidth,innerHeight);
    checkedRadio();
    cor = color(randomColor(), randomColor(), randomColor(), 128);
}

// Keeps old polygons/rays on-screen.
function draw() {
    background(200);
    
    if (mouseIsPressed){
        noFill();
        ellipse(mouseX, mouseY, 25, 25);
    }
    
    desenharPoligonoAtual();
    desenharPoligonos();
    desenharExtensao();
    desenharRaio();
    checarDistancia();
}

// Inserts position of mouse when pressed into vertex array.
function mousePressed(){
    if (!mouseInside()) return;
    else{
        let v = new Vertice(mouseX, mouseY);
        if (modo === "raio"){
            let rIndex = raios.findIndex(r => r.underMouse === true);
            let vIndex = raios.findIndex(r => r.v.underMouse === true);
            
            //print(rIndex);
            //print(vIndex);
            
            /*if (){
                selecionado.setRay()
            }
            
            else{*/
                let r = new Raio(v);
                raios.push(r);
                //}
            }
            else vertices.push(v);
    }
}

function mouseDragged(){
    if (modo === "raio"){
        let r = raios[raios.length-1];
        r.updateAngle(mouseX,mouseY);
    }
}

// Finishes creating a polygon.
function doubleClicked(){
    if (!mouseInside()) return;
    else{
        if (modo === "poligono"){
            let p = new Poligono(vertices, cor);
            poligonos.push(p);
            vertices = [];
            cor = color(randomColor(), randomColor(), randomColor(), 128);
        }
    }
}

// Switches modes between ray casting and polygon drawing.
// function keyPressed(){
//     if (key == 'r') modo = "raio";
//     else modo = "poligono";
//     vertices = [];
// }