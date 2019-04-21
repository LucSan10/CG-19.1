class Intersection{
    constructor(beta, v){
        this.beta = beta;
        this.vertex = v;
    }
}

class Extension{
    constructor(v, ang){
        this.intersections = [];
        this.v = v;
        this.alpha = 255;
        this.end = new Vertex(this.v.x, this.v.y);
        
        this.updateExtension(ang);
        this.updateIntersections();
    }

    binaryInsert(array, intersection){
        let index = binarySearch(array, intersection.beta);
        array.splice(index, 0, intersection);
    }

    phaseOut(){
        this.alpha -= 2.5;
        if (this.alpha < 10) this.alpha = 255;
    }

    updateExtension(ang){
        let lineEndX = 0;
        let lineEndY = 0;

        if (cos(ang) > 0) lineEndX = width;
        if (sin(ang) > 0) lineEndY = height;
        
        if (cos(ang) == 0) lineEndX = this.v.x;
        if (sin(ang) == 0) lineEndY = this.v.y;
        
        else{
            let tempY = lineEndY;
            lineEndY = this.v.y + tan(ang)*(lineEndX - this.v.x);

            if (lineEndY < 0 || lineEndY > height){
                lineEndX = this.v.x + (tempY - this.v.y)/tan(ang);
                lineEndY = tempY;
            }
        }

        this.end.x = lineEndX;
        this.end.y = lineEndY;

        this.updateIntersections();
    }

    draw(){
        this.phaseOut();

        push();
        stroke(0,this.alpha);
        line(this.v.x, this.v.y, this.end.x, this.end.y);
        pop();

        this.drawIntersections();
    }
    
    createIntersections(shape, i, overwrite = 0){
        let j;
        
        if (overwrite) this.intersections[i] = [];
        else this.intersections.push([]);
        
        for (j = 1; j < shape.vertices.length; j++){
            let v1 = shape.vertices[j-1];
            let v2 = shape.vertices[j];

            let intersection = calculateIntersection(v1, v2, this.v, this.end);
            if (intersection) this.binaryInsert(this.intersections[i], intersection);
        }
        
        let v1 = shape.vertices[j-1];
        let v2 = shape.vertices[0];
        
        let intersection = calculateIntersection(v1, v2, this.v, this.end);
        if (intersection) this.binaryInsert(this.intersections[i], intersection);
    }
    
    updateIntersections(){
        this.intersections = [];
        
        for (let i = 0; i < shapes.length; i++){
            this.createIntersections(shapes[i], i);
        }
    }
    
    drawIntersections(){
        for (let inters of this.intersections){
            let checkInside = (inters.length % 2);
            for (let i = 0; i < inters.length; i++){
                let vertex = inters[i].vertex;
        
                push();
                strokeWeight(5);
        
                if ((i + checkInside) % 2) stroke(255, 64, 64);
                else stroke(64, 64, 255);
        
                point(vertex.x, vertex.y);
                pop();
            }
    
        }
    }
}