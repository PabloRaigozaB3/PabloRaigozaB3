let mainElements = [];
let rightElements = [];
let bottomElements = [];
let preElements = [];
class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}


class CanvasBtn {
    constructor(_text, _ctx, _point, _width, _height) {
        this.point = _point;
        this.backgroundColor = "grey";
        this.borderColor = "black";
        this.textColor = "black";
        this.fontSize = 30;
        this.font = "Stencil";
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
        this.steps = 100;
        this.secondsLen = 3;
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

    isInside(point) {
        if (point.x < this.point.x + this.width && point.x > this.point.x) {
            if (point.y < this.point.y + this.height && point.y > this.point.y) {
                return true;
            }
        }
        return false;
    }

    clickOccured(e) {
        if (this.isInside(new Point(e.x,e.y))) {
            this.clicked(e);
            return true;
        }
        return false;
    }

    transitionColor() {
        if (this.timer != null) {
            clearInterval(this.timer);
            this.currentStep = 0;
        }
        this.timer = setInterval(this.changeColor, (this.secondsLen*1000)/this.steps, this);
    }

    changeColor(btn) {
        let r = interpolate(0, 128, btn.currentStep/btn.steps);
        let g = interpolate(255, 128, btn.currentStep/btn.steps);
        let b = interpolate(0, 128, btn.currentStep/btn.steps);
    
        btn.backgroundColor = rgbToHex(r,g,b);
        btn.draw();
        btn.currentStep++;
        if (btn.currentStep > btn.steps) { clearInterval(btn.timer); btn.currentStep = 0; }
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
                this.btns[i].clicked();
                if (display) {
                    this.btns[i].backgroundColor = this.selectColor;
                    this.btns[i].draw();
                }
                this.selectedIndex = i;
            }
        }
    }

    mouseUpOccured(e) {
        for(let i = 0; i < this.btns.length; i++) {
            if (this.btns[i].isInside(new Point(e.x, e.y))) {
                this.btns[i].mouseUp(e,this.btns[i]);
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
}

