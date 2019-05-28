class Stack{
    constructor(){
        this.locked = false;
        this.undoable = [];
        this.redoable = [];
    }

    // 0 - create shape
    // 1 - create ray
    // 2 - move shape vertex
    // 3 - move ray vertex
    // 4 - move ray triangle
    // 5 - move shape

    addUndo(operation){
        this.redoable = [];
        this.undoable.push(operation);
    }

    undo(){
        if (!this.undoable.length || this.locked) return;
        let toUndo = this.undoable[this.undoable.length-1];
        let toRedo;

        if (toUndo.what === 0) toRedo = this.undoShape(toUndo);
        if (toUndo.what === 1) toRedo = this.undoRay(toUndo);
        if (toUndo.what === 2) toRedo = this.undoShapeVertex(toUndo);
        if (toUndo.what === 3) toRedo = this.undoRayVertex(toUndo);
        if (toUndo.what === 4) toRedo = this.undoRayTriangle(toUndo);
        
        this.redoable.push(toRedo);
        this.undoable.pop();
    }
    
    redo(){
        if (!this.redoable.length || this.locked) return;
        let toRedo = this.redoable[this.redoable.length-1];
        let toUndo;

        if (toRedo.what === 0) toUndo = this.redoShape(toRedo);
        if (toRedo.what === 1) toUndo = this.redoRay(toRedo);
        if (toRedo.what === 2) toUndo = this.redoShapeVertex(toRedo);
        if (toRedo.what === 3) toUndo = this.undoRayVertex(toRedo);
        if (toRedo.what === 4) toUndo = this.undoRayTriangle(toRedo);

        this.undoable.push(toUndo);
        this.redoable.pop();
    }
    
    undoShape(toUndo){
        let s = lastShape();
        shapes.pop();
        return {what: toUndo.what, which: s};
    }
    
    redoShape(toRedo){
        shapes.push(toRedo.which);
        return {what: 0};
    }
    
    undoRay(toUndo){
        let r = lastRay();
        rays.pop();
        return {what: toUndo.what, which: r};
    }
    
    redoRay(toRedo){
        rays.push(toRedo.which);
        return {what: 1};
    }
    
    undoShapeVertex(toUndo){
        let v = toUndo.which;
        let tempX = v.x;
        let tempY = v.y;
        v.mouseDragged(toUndo.where.x, v.x, toUndo.where.y, v.y);
        return {what: toUndo.what, which: v, where: {x: tempX, y: tempY}};
    }

    redoShapeVertex(toRedo){
        let v = toRedo.which;
        let tempX = v.x;
        let tempY = v.y;
        v.mouseDragged(toRedo.where.x, v.x, toRedo.where.y, v.y);
        return {what: toRedo.what, which: v, where: {x: tempX, y: tempY}};
    }

    undoRayVertex(toUndo){
        let v = toUndo.which;
        let tempX = v.x;
        let tempY = v.y;
        v.mouseDragged(toUndo.where.x, v.x, toUndo.where.y, v.y);
        v.parent.updateTriangle();
        return {what: toUndo.what, which: v, where: {x: tempX, y: tempY}};
    }

    redoRayVertex(toRedo){
        let v = toRedo.which;
        let tempX = v.x;
        let tempY = v.y;
        v.mouseDragged(toRedo.where.x, v.x, toRedo.where.y, v.y);
        return {what: toRedo.what, which: v, where: {x: tempX, y: tempY}};
    }
}