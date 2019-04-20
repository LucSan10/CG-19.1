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

    move(bx, by){
        this.x += bx;
        this.y += by;
    }

    mousePressed(){
        if (this.underMouse && mode === "edit"){

        }
    }

    draw(){
        push();
        strokeWeight(5);
        point(this.x, this.y);
        pop();
    }
}