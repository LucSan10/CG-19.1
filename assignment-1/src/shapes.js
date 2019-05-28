class Shape{
    constructor(v, colour = new Colour()){
        this.vertices = [v];
        this.c = colour;
        this.underMouse = false;
        this.finished = false;
        
        shapes.push(this);
    }

    setParent(v){
        v.parent = this;
    }

    mousePressed(){
        if (!this.finished){
            let v = new Vertex(mouseX, mouseY);
            this.vertices.push(v);
            this.setParent(v);
            return 1;
        }
        return 0;
    }

    mouseDragged(mx, px, my, py){
        let index = shapes.findIndex(shape => shape === this);
        for (let ray of rays){
            ray.ext.createIntersections(this, index, 1);
        }

        if (this.underMouse){
            for (let vertex of this.vertices) vertex.mouseDragged(mx, px, my, py);
        }
    }

    doubleClicked(){
        this.vertices.pop();
        this.finished = true;
        this.c.changeAlpha(96);
        for (let ray of rays){
            ray.ext.createIntersections(this, shapes.length-1);
        }

        let operation = {what: 0}
        stack.addUndo(operation);
    }

    isInsideShape(){
        if (!lastShape().finished) return 0;
        let position = new Vertex(mouseX, mouseY);
        let ray = new Ray(position, 0, 0);
        let extension = ray.ext;
        let index = shapes.findIndex(shape => shape === this);
        let intersectionsLength = extension.intersections[index].length;
        return (intersectionsLength % 2);
    }

    draw(){
        beginShape();
        
        let alpha = this.c.A;
        if (this.underMouse) alpha += 128;

        let colour = color(this.c.R, this.c.G, this.c.B, alpha);
        fill(colour);

        for (let v of this.vertices) v.draw();
        if (!this.finished) vertex(mouseX,mouseY);
        endShape(CLOSE);
    }
}