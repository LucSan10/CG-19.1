let mode;
let drawing = false;

function lastShape(){
    return shapes[shapes.length-1];
}

function cancelDrawing(){
    if (mode !== "shape"){
        if (!lastShape().finished) shapes.pop();
    }
}

function checkedRadio(){
    let modes = document.getElementById("radioDiv").children;
    for (let m of modes){
        if (m.checked) mode = m.value;
    }
    cancelDrawing();
}
//------------Only-Polygons------------

// Array of polygons
let shapes = [];
// Polygon = {points, color}

let colour;

//------------Only-Rays----------------

let rays = [];



class Ray{
    constructor(v){
        this.v = v;
        this.ang = Math.random() * 2 * Math.PI;
        this.alpha = 255;
        this.underMouse = false;
        rays.push(this);
    }

    updateAngle(px, py){
        let deltaY = (py - this.v.y);
        let deltaX = (px - this.v.x);
        this.ang = atan2(deltaY,deltaX);
    }
    
    phaseOut(){
        this.alpha -= 2.5;
        if (this.alpha < 10) this.alpha = 255;
    }

    mouseDistance(bx, by, offset = {x: 0, y: 0}){
        let deltaX = Math.pow(this.v.x + offset.x - bx, 2);
        let deltaY = Math.pow(this.v.y + offset.y - by, 2);
        let distance = Math.sqrt(deltaX + deltaY);
        return distance;
    }
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

class Colour{
    constructor(){
        this.R = random255();
        this.G = random255();
        this.B = random255();
        this.A = 255;
    }

    changeAlpha(alpha){
        this.A = alpha;
    }
}

function randomColor(alpha = 255){
    return color(random255(), random255(), random255(), alpha);
}

// let selecionado = new Selected();