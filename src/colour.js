class Colour{
    constructor(){
        this.R = random255();
        this.G = random255();
        this.B = random255();
        this.A = 255;
    }

    changeAlpha(alpha){
        this.A = alpha;
    }
}