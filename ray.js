class Ray{
    constructor(v, h, push = 1){
        this.v = v;
        this.ang = Math.random()*2*Math.PI;
        this.underMouse = false;

        this.hypot = h;
        this.tri = new Vertex(this.v.x, this.v.y);
        this.ext = new Extension(this.v, this.ang);
        
        this.updateTriangle();
        this.setParent()
        if (push) rays.push(this);
    }

    setParent(){
        this.v.parent = this;
    }

    updateTriangle(){
        this.tri.x = this.v.x + this.hypot*cos(this.ang);
        this.tri.y = this.v.y + this.hypot*sin(this.ang);
        this.ext.updateExtension(this.ang);
    }

    updateAngle(px, py){
        let deltaY = (py - this.v.y);
        let deltaX = (px - this.v.x);
        this.ang = atan2(deltaY,deltaX);
        this.updateTriangle();
    }

    mouseDistance(bx, by){
        let deltaX = Math.pow(this.tri.x - bx, 2);
        let deltaY = Math.pow(this.tri.y - by, 2);
        let distance = Math.sqrt(deltaX + deltaY);
        return distance;
    }

    mouseDragged(){
        if (this.underMouse) this.updateAngle(mouseX, mouseY);
        else this.updateTriangle();
    }

    draw(){
        let tempX = 5*cos(this.ang);
        let tempY = 5*sin(this.ang);
        
        push();
        if (this.v.underMouse) stroke(255);
        else stroke(0)
        strokeWeight(6);
        point(this.v.x, this.v.y);
        pop();

        push();
        strokeWeight(3);
        line(this.v.x, this.v.y, this.tri.x, this.tri.y);
        pop();
        
        push();
        if (this.underMouse) stroke(255);
        else stroke(0);
        
        fill(0);
        triangle(
            this.tri.x + Math.sqrt(3)*tempX, this.tri.y + Math.sqrt(3)*tempY,
            this.tri.x - tempY, this.tri.y + tempX,
            this.tri.x + tempY, this.tri.y - tempX
        );
        pop();

        this.ext.draw();
    }
}