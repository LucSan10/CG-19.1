let mode;
let drawing = false;

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

// class Selected{
//     constructor(){
//         this.polygonIndex = -1;
//         this.rayIndex = -1;
//         this.vertexIndex = -1;
//     }
    
//     setVertex(vIndex){
//         this.vertexIndex = vIndex;
//     }

//     setRay(rIndex){
//         this.polygonIndex = -1;
//         this.rayIndex = rIndex;
//         this.vertexIndex = -1;
//     }

//     setPolygon(pIndex){
//         this.polygonIndex = pIndex;
//         this.rayIndex = -1;
//         this.vertexIndex = -1;
//     }
// }

function random255(){
    return Math.floor(Math.random() * 256);
}

function randomColor(alpha = 255){
    return color(random255(), random255(), random255(), alpha);
}

// let selecionado = new Selected();

