class Vertex{
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

    draw(){
        push();
        strokeWeight(5);
        point(this.x, this.y);
        pop();
    }
}

class Shape{
    constructor(v, c = new Colour()){
        this.vertices = [v];
        this.colour = c;
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
        this.colour.changeAlpha(128);
    }

    draw(){
        beginShape();
        let c = color(this.colour.R, this.colour.G, this.colour.B, this.colour.A);
        fill(c);
        for (let v of this.vertices){
            push();
            if (this.finished){
                if (v.mouseDistance(mouseX, mouseY, 10)) stroke(255, 255, 255);
                else stroke(0,0,0);
            }
            vertex(v.x, v.y);
            pop();
        }
        if (!this.finished) vertex(mouseX,mouseY);
        endShape(CLOSE);
    }
}