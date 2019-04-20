// function drawRay(){
//     for (let ray of rays){
//         ray.draw();
        
//         let rayEnd = new Vertex(
//             r.v.x + 40*cos(r.ang),
//             r.v.y + 40*sin(r.ang)
//         )
        
//         let tempX = 5*cos(r.ang);
//         let tempY = 5*sin(r.ang);

//         push();
//         strokeWeight(3);
//         line(r.v.x, r.v.y, rayEnd.x, rayEnd.y);
//         pop();

//         push();
//         if (r.v.underMouse) stroke(255,255,255);
//         else stroke(0,0,0)
        
//         strokeWeight(6);
//         point(r.v.x, r.v.y);
//         pop();
        
//         desenharTriangulo(r, rayEnd, tempX, tempY);
//     }
// }

// function desenharTriangulo(r, rayEnd, tempX, tempY){
//     push();
        
//     if (r.underMouse) stroke(255,255,255);
//     else stroke(0,0,0);

//     fill(0);
//     triangle(
//         rayEnd.x + Math.sqrt(3)*tempX, rayEnd.y + Math.sqrt(3)*tempY,
//         rayEnd.x - tempY, rayEnd.y + tempX,
//         rayEnd.x + tempY, rayEnd.y - tempX
//     );
//     pop();
// }

// function desenharExtensao(){
//     for (let r of rays){
        
// }

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

// function drawShapes(){
//     for (let shape of shapes){
//         shape.draw();

//         beginShape();
//         let vert = shape.vertices;
//         for(let v of vert){
//             push();
//             if (v.mouseDistance(mouseX, mouseY, 10)) stroke(255,255,255);
//             else stroke(0,0,0);
//             vertex(v.x, v.y);
//             pop();
//         }
//         fill(shape.colour);
//         endShape(CLOSE);
//     }
// }