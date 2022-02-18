// save the data locally
class AutoData {
    constructor() {
        this.shots = [];
        this.taxiLoc = new Point(-1,-1);
        this.didTaxi = false;
    }

    addShot(someShot) {
        if (someShot.status != NO_SHOT)
            this.shots.push(someShot);
    }

    updateTaxi(point, _didTaxi) {
        this.taxiLoc = point;
        this.didTaxi = _didTaxi;
    }
}

class Shot {
    constructor(_loc, _status) {
        this.loc = _loc;
        this.status = _status;
        this.isHuman = false;
    }

    increaseStatus() {
        if (this.status == MADE_SHOT) {
            this.status = NO_SHOT;
        } else {
            this.status++;
        }
    }
}

class TaxiBtn {
    constructor(_btnSelector, _btnDragger) {
        this.btnSelector = _btnSelector;
        this.btnDragger = _btnDragger;
        this.isDrag = false;
        this.showDragger = false;
    }

    draw() {
        if (this.showDragger) {
            this.btnDragger.draw();
        }
        this.btnSelector.draw();
    }

    clickOccuredRight(point) {
        if (this.btnSelector.clickOccured(point)) {
            if (!this.btnSelector.isSelected) {
                this.btnSelector.backgroundColor = 'limegreen';
                this.showDragger = true;
            } else {
                this.btnSelector.backgroundColor = "grey";
                this.showDragger = false;
                drawField(FIELD_WIDTH, FIELD_HEIGHT, document.getElementById('mainPanel').getContext('2d'));
            }
        
            this.btnSelector.isSelected = !this.btnSelector.isSelected;
            this.btnSelector.draw();
        }
        this.draw();
    }

    mouseDown(point) {
        if (this.btnDragger.clickOccured(point)) {
            this.isDrag = true;
        } else {
            this.isDrag = false;
        }
        return this.isDrag;
    }

    mouseMove(point) {
        if (this.isDrag) {
            point.x = Math.floor(point.x);
            point.y = Math.floor(point.y);
            
            // this.btnDragger = new CanvasBtn("T", this.btnDragger.ctx, point, this.btnDragger.width, this.btnDragger.height);
            this.btnDragger.point = new Point(point.x - this.btnDragger.width/2, point.y - this.btnDragger.height/2);
            drawField(FIELD_WIDTH, FIELD_HEIGHT, document.getElementById('mainPanel').getContext('2d'));
            this.btnDragger.draw();
        }
    }

    mouseUp(point) {
        this.isDrag = false;
    }    

    setCtxDragger(ctx) {
        this.btnDragger.ctx = ctx;
    }
    setCtxSelector(ctx) {
        this.btnSelector.ctx = ctx;
    }

    getDraggerLoc() {
        return this.btnDragger.point;
    }
}

let taxiBtn;

function rightToGlobal(point) {
    return new Point(point.x + FIELD_WIDTH, point.y);
}

let mouseDownInRight = false;
function loadField() {
    mainCanv = document.createElement('canvas');
    document.body.appendChild(mainCanv);
    mainCanv.id = "mainPanel";
    mainCtx = mainCanv.getContext('2d');
    mainCanv.style="position:absolute; left:0px; top:0px";
    mainCanv.width = FIELD_WIDTH;
    mainCanv.height = FIELD_HEIGHT;
    mainCtx.fillStyle = "white";
    mainCtx.fillRect(0,0,FIELD_WIDTH, FIELD_HEIGHT);
    drawField(FIELD_WIDTH, FIELD_HEIGHT, mainCtx);
    fieldIsShown = true;

    mainCanv.addEventListener('mousedown', mainCanvasMouseDown);
    mainCanv.addEventListener('touchstart', mainCanvasMouseDown);
    mainCanv.addEventListener('touchmove', mainCanvasMouseMove);
    mainCanv.addEventListener('touchend', rightCanvasMouseUp);
    mainCanv.addEventListener('click', mainCanvasClick);
}

function loadRightCanv() {
    rightCanv = document.createElement('canvas');
    document.body.appendChild(rightCanv);
    rightCanv.id = "rightPanel";
    rightCtx = rightCanv.getContext('2d');
    rightCanv.style="position:absolute; left:"+FIELD_WIDTH+"px; top:0px";
    rightCanv.width = RIGHT_WIDTH;
    rightCanv.height = RIGHT_HEIGHT;
    rightCtx.fillStyle = "grey";
    rightCtx.fillRect(0,0,RIGHT_WIDTH, RIGHT_HEIGHT);

    rightCanv.addEventListener('click', rightCanvasClick);

    rightCanv.addEventListener('mouseup', rightCanvasMouseUp);
    // rightCanv.addEventListener('touchend', rightCanvasMouseUp)
    
    rightCanv.addEventListener('mousedown', rightCanvasMouseDown);
    // rightCanv.addEventListener('touchstart', rightCanvasMouseDown);
}

function loadAutoScreen(e) {
    clearAllCanvas();
    loadField();
    loadRightCanv();
    createRightButtons();
    isAuto = true;
}

function saveAutoScreen() {
    isAuto = false;
    autoData.updateTaxi(taxiBtn.getDraggerLoc(), taxiBtn.showDragger);
}

function createRightButtons() {
    //if (document.getElementById('rightPanel') != null) {
        let rightCtx = document.getElementById('rightPanel').getContext('2d');
        // if (rightElements.length == 0) {
            let uppBtn = new CanvasBtn("UPPER", rightCtx, new Point(0,0), RIGHT_WIDTH, FIELD_HEIGHT*.4);
            uppBtn.mouseUp = uppBtnMouseUp;
            uppBtn.clicked = uppBtnClick;
            uppBtn.transitionOver = uppBtnTransitionOver;
            let lowBtn = new CanvasBtn("LOW", rightCtx, new Point(0,FIELD_HEIGHT*.4), RIGHT_WIDTH, FIELD_HEIGHT*.4);
            lowBtn.mouseUp = lowBtnMouseUp;
            lowBtn.clicked = lowBtnClick;
            lowBtn.transitionOver = lowBtnTransitionOver;

            let taxiBtnSelector = new CanvasBtn("TAXI", rightCtx, new Point(0,FIELD_HEIGHT*.8), RIGHT_WIDTH, FIELD_HEIGHT*.2);
            let taxiBtnDragger = new CanvasBtn("T", document.getElementById('mainPanel').getContext('2d'), new Point(0,0), FIELD_WIDTH/20, FIELD_WIDTH/15);    
            if (taxiBtn == null) {
                taxiBtn = new TaxiBtn(taxiBtnSelector, taxiBtnDragger);    
            } else {
                taxiBtn.btnDragger.ctx = document.getElementById('mainPanel').getContext('2d');
                taxiBtn.btnSelector.ctx = rightCtx;
                taxiBtn.btnSelector.point = new Point(0, FIELD_HEIGHT*.8);
                taxiBtn.btnSelector.width = RIGHT_WIDTH;
                taxiBtn.btnSelector.height = FIELD_HEIGHT*.2;
            }
            taxiBtn.draw();
            
            

            let sideBtns = new RadioBtn();
            sideBtns.btns.push(uppBtn);
            sideBtns.btns.push(lowBtn);
            sideBtns.draw();
            rightElements.push(sideBtns);
    //     } else {
    //         for (let i = 0; i < rightElements.length; i++) {
    //             rightElements[i].setCtx(rightCtx);
    //             rightElements[i].draw();
    //         }
    //         taxiBtn.btnSelector.ctx = rightCtx;
    //         taxiBtn.btnDragger.ctx = document.getElementById('mainPanel').getContext('2d');
    //         taxiBtn.draw();
    //     }
    // }
    
}

let autoData = new AutoData();

function uppBtnMouseUp(start, e, self) {
    isShooting = true;
    self.transitionColor();
    if (inTriangle(start)) {
        currentShot.isHuman = true;
    }
}
function uppBtnClick(self) {
    if (self.inShiftingColor && isShooting) {
        currentShot.increaseStatus();
        self.updateTransitionColor(currentShot.status);
    }
}

let isAuto = false;

function uppBtnTransitionOver() {
    drawField(FIELD_WIDTH, FIELD_HEIGHT, document.getElementById('mainPanel').getContext('2d'));
    if (isAuto) {
        autoData.addShot(currentShot);
    } else {
        liveData.addShot(currentShot);
    }
    currentShot = null;
    isShooting = false;
    taxiBtn.draw();
}

function lowBtnMouseUp(start, e, self) {
    isShooting = true;
    self.transitionColor();
    if (inTriangle(start)) {
        currentShot.isHuman = true;
    }
}
function lowBtnClick(self) {
    if (self.inShiftingColor && isShooting) {
        currentShot.increaseStatus();
        self.updateTransitionColor(currentShot.status);
    }
}
function lowBtnTransitionOver() {
    drawField(FIELD_WIDTH, FIELD_HEIGHT, document.getElementById('mainPanel').getContext('2d'));
    if (isAuto) {
        autoData.addShot(currentShot);
    } else {
        liveData.addShot(currentShot);
    }
    currentShot = null;
    isShooting = false;
    taxiBtn.draw();
}

function humBtnMouseUp(start, e, self) {
    
}
function taxiBtnClick(self) {
    
}
let startPtn = null;
function rightCanvasMouseUp(e) {
    let globalPoint = new Point(e.x, e.y);
    if (isTouch) {globalPoint = new Point(Math.floor(currentMouse.x), Math.floor(currentMouse.y));}
    let point = globalToRight(globalPoint);
    if (!taxiBtn.isDrag && !isShooting) {
        if (!mouseDownInRight) {
            for (let i = 0; i < rightElements.length; i++) {
                rightElements[i].mouseUpOccured(currentShot.loc, point);
            }
        } else {

        }
        
        // e.preventDefault();
    }
    taxiBtn.mouseUp(point);
    mouseDownInRight = false;
}

function rightCanvasClick(e) {
    let point = globalToRight(new Point(e.x, e.y));
    point.x = Math.floor(point.x);
    point.y = Math.floor(point.y);
    for (let i = 0; i < rightElements.length; i++) {
        for (let j = 0; j < rightElements[i].btns.length; j++) {
            rightElements[i].btns[j].clickOccured(point);
        }
    }

    taxiBtn.clickOccuredRight(point);
    e.preventDefault();
}

function rightCanvasMouseDown(e) {
    mouseDownInRight = true;
    startPtn = currentMouse;
    
    e.preventDefault();
}

function globalToRight(point) {
    return new Point(point.x-FIELD_WIDTH, point.y);
}
let currentShot = null;
let isShooting = false;
function mainCanvasMouseDown(e) {
    if (e.touches == null || e.touches.length == 0) {return;}
    let point = new Point(e.touches[0].clientX,e.touches[0].clientY);
    let mainCtx = document.getElementById('mainPanel').getContext('2d');
    if (!taxiBtn.mouseDown(point) && !isShooting) {    
        drawField(FIELD_WIDTH, FIELD_HEIGHT, mainCtx);
        mainCtx.fillStyle = 'limegreen';
        drawCircle(point,window.innerWidth*.025,mainCtx);

        mainCtx.fill();
        currentShot = new Shot(point, NO_SHOT);
    }
    
}

let currentMouse = new Point(0,0);
document.body.addEventListener('touchmove', function(e) {
    currentMouse = new Point(e.touches[0].clientX,e.touches[0].clientY);
});

function mainCanvasMouseMove(e) {
    let mainCtx = document.getElementById('mainPanel').getContext('2d');
    currentMouse = new Point(e.touches[0].clientX,e.touches[0].clientY);

    if (!taxiBtn.isDrag && e.touches.length != 0 && !isShooting) {
        drawField(FIELD_WIDTH, FIELD_HEIGHT, mainCtx);

        drawLine(new Point(currentShot.loc.x, currentShot.loc.y), new Point(currentMouse.x, currentMouse.y));
        taxiBtn.draw();
        mainCtx.strokeStyle = 'black';
        mainCtx.stroke();

        mainCtx.fillStyle = 'limegreen';
        drawCircle(currentShot.loc,window.innerWidth*.025,mainCtx);
        mainCtx.fill();
        drawCircle(currentMouse,window.innerWidth*.025,mainCtx);        
        mainCtx.fill();
    }
    taxiBtn.mouseMove(currentMouse);
}

function mainCanvasClick(e) {
    
}

function globalToTopTriangle(point) {
    let mainWidth = document.getElementById('mainPanel').width;
    let triangleWidth = getTerminalWidth(mainWidth);
    return new Point(point.x - (mainWidth - triangleWidth), point.y);
}

function inTriangle(point) {
    let triangleWidth = getTerminalWidth(document.getElementById('mainPanel').width);
    let triangleHeight = getTerminalHeight(document.getElementById('mainPanel').height);

    let newPoint = globalToTopTriangle(point);
    let yLevel = (newPoint.x * triangleHeight) / triangleWidth;
    return (newPoint.y < yLevel);
}
