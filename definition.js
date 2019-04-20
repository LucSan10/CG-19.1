let modo;

function checkedRadio(){
    let modes = document.getElementById("radioDiv").children;
    for (let mode of modes){
        if (mode.checked) modo = mode.value;
    }
    vertices = [];
}
//------------Only-Polygons------------

// Array of polygons
let poligonos = [];
// Polygon = {points, color}

// Array of vertices 
let vertices = [];
// Vertex = {x, y}

let cor;

//------------Only-Rays----------------

let raios = [];

class Vertice{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.underMouse = false;
        this.locked = false;
    }
    
    mouseDistance(bx, by){
        let deltaX = Math.pow(this.x - bx, 2);
        let deltaY = Math.pow(this.y - by, 2);
        let distance = Math.sqrt(deltaX + deltaY);
        return distance;
    }

    move(bx, by, offX, offY){
        this.x = bx - offX;
        this.y = by - offY;
    }
}

class Poligono{
    constructor(v, c){
        this.vertices = v;
        this.cor = c;
    }
}

class Raio{
    constructor(v){
        this.v = v;
        this.ang = Math.random() * 2 * Math.PI;
        this.alpha = 255;
        this.underMouse = false;
    }

    updateAngle(px, py){
        let deltaY = (py - this.v.y);
        let deltaX = (px - this.v.x);
        this.ang = atan2(deltaY,deltaX);
    }
    
    incrementAlpha(){
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

function randomColor(){
    return Math.floor(Math.random() * 256);
}

// let selecionado = new Selected();