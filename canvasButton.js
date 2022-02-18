let mainElements = [];
let rightElements = [];
let bottomElements = [];
let preElements = [];
let postElements = [];
class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

// class Color {
//     constructor(_r, _g, _b) {
//         this.r = _r;
//         this.
//     }
// }

class CanvasBtn {
    constructor(_text, _ctx, _point, _width, _height) {
        this.point = _point;
        this.backgroundColor = "grey";
        this.borderColor = "red";
        this.textColor = "black";
        this.fontSize = 30;
        this.font = "Arial";
        this.text = _text;
        this.width = _width;
        this.height = _height;
        this.ctx = _ctx;
        this.clicked = function(e) {};
        this.clickedOut = function(e) {};
        this.mouseUp = function(e) {};
        this.selected = false;
        this.currentStep = 0;
        this.timer;
        this.secondsLen = 3;
        this.steps = this.secondsLen*60;
        this.inShiftingColor = false;
        this.transitionOver = function() {};
        this.transColorStatus = NO_SHOT;
    }

    setCtx(someCtx) {
        this.ctx = someCtx;
    }



    draw() {
        this.ctx.font = this.fontSize + "px " + this.font;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "center";

        if (this.backgroundColor != "trans") {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(this.point.x, this.point.y, this.width, this.height);
        }
        
        if (this.borderColor != "trans") {
            this.ctx.fillStyle = this.borderColor;
            this.ctx.strokeRect(this.point.x, this.point.y, this.width, this.height);
        }
        if (this.textColor != "trans") {
            this.ctx.fillStyle = this.textColor;
            this.ctx.strokeStyle = this.textColor;
            this.ctx.fillText(this.text, this.point.x + this.width/2, this.point.y + this.height/2);
        }
    }

    clear(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.point.x-1, this.point.y-1, this.width+3, this.height+2);
    }

    isInside(ptn) {
        if (ptn.x < this.point.x + this.width && ptn.x > this.point.x) {
            if (ptn.y < this.point.y + this.height && ptn.y > this.point.y) {
                return true;
            }
        }
        return false;
    }

    clickOccured(point) {        
        if (this.isInside(point)) {
            this.clicked(this);
            
            return true;
            
        }
        return false;
    }

    updateTransitionColor(STATUS) {
        if (this.transColorStatus == MADE_SHOT)
            this.transColorStatus = NO_SHOT;
        else
            this.transColorStatus++;

        this.inShiftingColor = true;
        if (this.timer != null) {
            clearInterval(this.timer);
            this.currentStep = 0;
        }
        this.timer = setInterval(this.changeColor, (this.secondsLen*1000)/this.steps, this);
    }

    transitionColor() {
        this.inShiftingColor = true;
        if (this.timer != null) {
            clearInterval(this.timer);
            this.currentStep = 0;
        }
        this.timer = setInterval(this.changeColor, (this.secondsLen*1000)/this.steps, this);
    }

    changeColor(btn) {
        let startR = START_TRANS_R;
        let startG = START_TRANS_G;
        let startB = START_TRANS_B;
        if (btn.transColorStatus == MISS_SHOT) {
            startR = MISS_TRANS_R;
            startG = MISS_TRANS_G;
            startB = MISS_TRANS_B;

        } else if (btn.transColorStatus == MADE_SHOT) {
            startR = MADE_TRANS_R;
            startG = MADE_TRANS_G;
            startB = MADE_TRANS_B;
        }

        let r = interpolate(startR, 128, btn.currentStep/btn.steps);
        let g = interpolate(startG, 128, btn.currentStep/btn.steps);
        let b = interpolate(startB, 128, btn.currentStep/btn.steps);
    
        btn.backgroundColor = rgbToHex(r,g,b);
        btn.draw();
        btn.currentStep++;
        if (btn.currentStep > btn.steps) { 
            clearInterval(btn.timer);
            btn.currentStep = 0;
            btn.inShiftingColor = false;
            btn.transitionOver();
            btn.transColorStatus = NO_SHOT;
        }
    }
}
function interpolate(startVal, endVal, t) {
    return Math.floor((1 - t) * startVal + (t * endVal));
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class RadioBtn {
    constructor(_backgroundColor = "grey", _selectColor = "green") {
        this.backgroundColor = _backgroundColor;
        this.selectColor = _selectColor;
        this.btns = [];
        this.selectedBtn = null;
        this.selectedIndex = -1;
    }

    clickOccured(e, display = true) {
        for(let i = 0; i < this.btns.length; i++) {
            if (this.btns[i].isInside(new Point(e.x, e.y)) && this.selectedIndex != i) {
                
                if (this.selectedIndex != -1) {
                    this.btns[this.selectedIndex].clickedOut();
                    if (display) {
                        this.btns[this.selectedIndex].backgroundColor = this.backgroundColor;
                        this.btns[this.selectedIndex].draw();  
                    }
                }
                this.btns[i].clicked(this.btns[i]);
                if (display) {
                    this.btns[i].backgroundColor = this.selectColor;
                    this.btns[i].draw();
                }
                this.selectedIndex = i;
            }
        }
    }

    mouseUpOccured(start, e) {
        for(let i = 0; i < this.btns.length; i++) {
            if (this.btns[i].isInside(new Point(e.x, e.y))) {
                this.btns[i].mouseUp(start, e,this.btns[i]);
            }

        }
    }

    getSelected() {
        if (this.btns[this.selectedIndex] == null)
            return "";
        else
            return this.btns[this.selectedIndex];
    }

    select(i) {
        if (i != -1) {
            this.btns[i].clicked();
            if (this.selectedIndex != -1) {
                this.btns[this.selectedIndex].clickedOut();
                this.btns[this.selectedIndex].backgroundColor = this.backgroundColor;
                this.btns[this.selectedIndex].draw();
            }
            this.btns[i].backgroundColor = this.selectColor;
            
            this.btns[i].draw();
            this.selectedIndex = i;
        }
    }

    setCtx(ctx) {
        for(let i = 0; i < this.btns.length; i++) {
            this.btns[i].ctx = ctx;
        }
    }

    draw() {
        for(let i = 0; i < this.btns.length; i++) {
            this.btns[i].draw();
        }
    }

    hasTransition() {
        for (let i = 0; i <  this.btns.length; i++) {
            if (this.btns[i].inShiftingColor)
                return true;
        }
    }
}

