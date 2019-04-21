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

    // mousePressed(){
    //     if (this.underMouse && mode === "edit"){
            
    //     }
    // }

    mouseDragged(){
        this.move(mouseX - pmouseX, mouseY - pmouseY);
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