class Extension{
    constructor(v, ang){
        this.v = v;
        this.alpha = 255;
        this.end;
        this.updateExtension(ang, 1);
    }

    phaseOut(){
        this.alpha -= 2.5;
        if (this.alpha < 10) this.alpha = 255;
    }

    updateExtension(ang, creation = 0){
        if (creation) this.end = new Vertex(this.v.x, this.v.y);
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
    }

    draw(){
        this.phaseOut();

        push();
        stroke(0,0,0,this.alpha);
        line(this.v.x, this.v.y, this.end.x, this.end.y);
        pop();
    }
}