class Shape{
    constructor(v, colour = new Colour()){
        this.vertices = [v];
        this.c = colour;
        this.finished = false;
        shapes.push(this);
    }

    mousePressed(){
        let v = new Vertex(mouseX, mouseY);
        this.vertices.push(v);
    }

    doubleClicked(){
        this.vertices.pop();
        this.finished = true;
        this.c.changeAlpha(64);
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