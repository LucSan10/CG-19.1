class Shape{
    constructor(v, colour = new Colour()){
        this.vertices = [v];
        this.c = colour;
        this.finished = false;
        
        shapes.push(this);
    }

    setParent(v){
        v.parent = this;
    }

    mousePressed(){
        let v = new Vertex(mouseX, mouseY);
        this.vertices.push(v);
        this.setParent(v);
    }

    mouseDragged(){
        let index = shapes.findIndex(shape => shape === this);
        for (let ray of rays){
            ray.ext.intersections = [];
            ray.ext.createIntersections(this, index, 1);
        }
    }

    doubleClicked(){
        this.vertices.pop();
        this.finished = true;
        this.c.changeAlpha(96);
        for (let ray of rays){
            ray.ext.createIntersections(this, shapes.length-1);
        }
    }

    draw(){
        beginShape();
        let colour = color(this.c.R, this.c.G, this.c.B, this.c.A);
        fill(colour);
        for (let v of this.vertices) v.draw();
        if (!this.finished) vertex(mouseX,mouseY);
        endShape(CLOSE);
    }
}