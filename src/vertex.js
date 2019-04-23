class Vertex{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.underMouse = false;
        this.parent;
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

    mouseDragged(mx, px, my, py){
        this.move(mx - px, my - py);
    }

    draw(){
        if (mode === "edit"){
            push();
            strokeWeight(5);
            if (this.underMouse) stroke(255);
            else stroke(0);
            point(this.x, this.y);
            pop();
        }
        vertex(this.x, this.y);
    }
}