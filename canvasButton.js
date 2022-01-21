let mainElements = [];
let rightElements = [];
let bottomElements = [];

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
        this.clicked = function() {};
        this.clickedOut = function() {};
        this.selected = false;
        this.draw();
    }

    draw() {
        this.ctx.font = this.fontSize + "px " + this.font;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "center";

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.point.x, this.point.y, this.width, this.height);        
        
        this.ctx.fillStyle = this.borderColor;
        this.ctx.strokeRect(this.point.x, this.point.y, this.width, this.height);
        
        this.ctx.fillStyle = this.textColor;
        this.ctx.strokeStyle = this.textColor;

        this.ctx.fillText(this.text, this.point.x + this.width/2, this.point.y + this.height/2);
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
}

class RadioBtn {
    constructor(_backgroundColor = "grey", _selectColor = "green") {
        this.backgroundColor = _backgroundColor;
        this.selectColor = _selectColor;
        this.btns = [];
        this.selectedBtn = null;
        this.selectedIndex = -1;
    }

    clickOccured(e) {
        for(let i = 0; i < this.btns.length; i++) {
            if (this.btns[i].isInside(new Point(e.x, e.y))) {
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
    }
}

