let mode;
let drawing = false;
let highlighted;

//------------Only-Polygons------------

// Array of polygons
let shapes = [];
// Polygon = {points, color}

let colour;

//------------Only-Rays----------------

let rays = [];

function lastShape(){
    return shapes[shapes.length-1];
}    

function cancelDrawing(){
    if (mode !== "shape"){
        if (!lastShape().finished) shapes.pop();
    }    
}    

function checkedRadio(cancel = 1){
    let modes = document.getElementById("radioDiv").children;
    for (let m of modes){
        if (m.checked) mode = m.value;
    }    
    if (cancel){
        if (shapes.length) cancelDrawing();
    }
}    

function random255(){
    return Math.floor(Math.random() * 256);
}    

function randomColor(alpha = 255){
    return color(random255(), random255(), random255(), alpha);
}    

function checkDistance(radius){
    let newDistance;
    let closest;
    
    for (let shape of shapes){
        for (let vertex of shape.vertices){
            newDistance = vertex.mouseDistance(mouseX, mouseY);
            
            if (newDistance <= radius){
                radius = newDistance;
                closest = vertex;
            }
        }
    }
    
    for (let ray of rays){
        newDistance = ray.mouseDistance(mouseX, mouseY);
        
        if (newDistance <= radius){
            radius = newDistance;
            closest = ray;
        }     
        
        newDistance = ray.v.mouseDistance(mouseX, mouseY)
        if (newDistance <= radius){
            radius = newDistance;
            closest = ray.v;
        }
    }
    
    if (highlighted !== undefined && highlighted !== closest){
        highlighted.underMouse = false;
    }
    
    highlighted = closest;
    if (highlighted !== undefined){
        highlighted.underMouse = true;
        return;
    }
    else{
        [index, highlighted] = highlightShape();
        if (index >= 0) highlighted.underMouse = true;
    }
}

function drawRay(){
    for (let ray of rays){
        ray.draw();
    }    
}    

function drawShapes(){
    for (let shape of shapes){
        shape.draw();
    }    
}

function calculateIntersection(v1, v2, v3, v4){
    let a = (v2.x - v1.x);
    let b = (v3.x - v4.x);
    let c = (v2.y - v1.y);
    let d = (v3.y - v4.y);
    
    let deltaX = (v3.x - v1.x);
    let deltaY = (v3.y - v1.y);
    
    let det = (a*d) - (b*c);
    if (det !== 0){
        let alpha = ((d*deltaX) - (b*deltaY))/det;
        let beta = ((a*deltaY) - (c*deltaX))/det;
        if ((0 <= alpha && alpha <= 1) && (0 <= beta && beta <= 1)){
            let interX = v1.x + alpha*a;
            let interY = v1.y + alpha*c;
            let intersection = new Vertex(interX, interY);
            let inter = new Intersection(beta, intersection);
            return inter;
        };
    }
    return 0;
}

function binarySearch(array, x){
    let start = 0;
    let end = array.length-1;
    let mid;
    
    while(start <= end){
        mid = int((start + end)/2);
        if (x === array[mid].beta) return mid;
        if (x < array[mid].beta) end = mid - 1;
        else start = mid + 1; 
    }
    return start;
}

function highlightShape(){
    let i;
    let shape;
    for (i = shapes.length-1; i >= 0; i--){
        shape = shapes[i];
        if (shape.isInsideShape()) break; 
    }

    if (i >= 0) return [i, shape];
    else return [i, undefined];
}