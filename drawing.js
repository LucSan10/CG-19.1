function checarDistancia(){
    if (mode === "ray"){
        for (let r of rays){
            let tempX = 5*cos(r.ang);
            let tempY = 5*sin(r.ang);
            
            let offset = new Vertex(
                40*cos(r.ang) + tempX*Math.sqrt(3)/3,
                40*sin(r.ang) + tempY*Math.sqrt(3)/3
            );
            
            if (r.mouseDistance(mouseX, mouseY, offset) <= 10) r.underMouse = true;
            else r.underMouse = false;
            
            if (r.mouseDistance(mouseX, mouseY) <= 10) r.v.underMouse = true;
            else r.v.underMouse = false;
        }
    }
    else{

    }
}

function desenharRay(){
    for (let r of rays){
        let rayEnd = new Vertex(
            r.v.x + 40*cos(r.ang),
            r.v.y + 40*sin(r.ang)
        )
        
        let tempX = 5*cos(r.ang);
        let tempY = 5*sin(r.ang);

        push();
        strokeWeight(3);
        line(r.v.x, r.v.y, rayEnd.x, rayEnd.y);
        pop();

        push();
        if (r.v.underMouse) stroke(255,255,255);
        else stroke(0,0,0)
        
        strokeWeight(6);
        point(r.v.x, r.v.y);
        pop();

        desenharTriangulo(r, rayEnd, tempX, tempY);
    }
}

function desenharTriangulo(r, rayEnd, tempX, tempY){
    push();
        
    if (r.underMouse) stroke(255,255,255);
    else stroke(0,0,0);

    fill(0);
    triangle(
        rayEnd.x + Math.sqrt(3)*tempX, rayEnd.y + Math.sqrt(3)*tempY,
        rayEnd.x - tempY, rayEnd.y + tempX,
        rayEnd.x + tempY, rayEnd.y - tempX
    );
    pop();
}

function desenharExtensao(){
    for (let r of rays){
        let lineEndX = 0;
        let lineEndY = 0;

        if (cos(r.ang) > 0) lineEndX = width;
        if (sin(r.ang) > 0) lineEndY = height;
        
        if (cos(r.ang) == 0) lineEndX = r.v.x;
        if (sin(r.ang) == 0) lineEndY = r.v.y;
        else{
            tempY = lineEndY;
            lineEndY = r.v.y + tan(r.ang)*(lineEndX - r.v.x);

            if (lineEndY < 0 || lineEndY > height){
                lineEndX = r.v.x + (tempY - r.v.y)/tan(r.ang);
                lineEndY = tempY;
            }
        }

        r.phaseOut();

        push();
        stroke(0,0,0,r.alpha);
        line(r.v.x, r.v.y, lineEndX, lineEndY);
        pop();
    }
}

// Draws new polygons.
// function desenharShapeAtual(){
//     beginShape();
//     fill(colour);
//     for (let v of vertices){
//         vertex(v.x, v.y);
//     }
//     vertex(mouseX,mouseY);
//     endShape(CLOSE);
// }

function desenharShapes(){
    for (let shape of shapes){
        // beginShape();
        // let vert = shape.vertices;
        // for(let v of vert){
        //     push();
        //     if (v.mouseDistance(mouseX, mouseY, 10)) stroke(255,255,255);
        //     else stroke(0,0,0);
        //     vertex(v.x, v.y);
        //     pop();
        // }
        // fill(shape.colour);
        // endShape(CLOSE);
        shape.draw();
    }
}