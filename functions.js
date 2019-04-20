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
    if (cancel) cancelDrawing();
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
        
        // Inside Shape

        // newDistance = rays[i].v.mouseDistance(mouseX, mouseY)
        // if (newDistance <= radius){
        //     radius = newDistance;    
        //     rays[i].v.underMouse = true;
        // } 
        // else rays[i].v.underMouse = false;
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
    if (highlighted !== undefined) highlighted.underMouse = true;
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