class Shape{
    constructor(v, colour = new Colour()){
        this.vertices = [v];
        this.c = colour;
        this.finished = false;
        shapes.push(this);
    }

    mousePressed(){
        if (!this.finished){
            let v = new Vertex(mouseX, mouseY);
            this.vertices.push(v);
        }
        else{

        }
    }

    doubleClicked(){
        this.finished = true;
        this.c.changeAlpha(128);
    }

    draw(){
        beginShape();
        let colour = color(this.c.R, this.c.G, this.c.B, this.c.A);
        fill(colour);
        for (let v of this.vertices){
            push();
            if (this.finished && mode === "edit"){
                if (v.mouseDistance(mouseX, mouseY) <= 10) stroke(255, 255, 255);
                else stroke(0,0,0);
            }
            vertex(v.x, v.y);
            pop();
        }
        if (!this.finished) vertex(mouseX,mouseY);
        endShape(CLOSE);
    }
}