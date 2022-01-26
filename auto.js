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
    rightCanv.addEventListener('mousedown', rightCanvasMouseDown);
}

function loadAutoScreen(e) {
    clearAllCanvas();
    loadField();
    loadRightCanv();
    createRightButtons();
}

function createRightButtons() {
    if (document.getElementById('rightPanel') != null) {
        let rightCtx = document.getElementById('rightPanel').getContext('2d');
        if (rightElements.length == 0) {
            let uppBtn = new CanvasBtn("UPPER", rightCtx, new Point(0,0), RIGHT_WIDTH, FIELD_HEIGHT*.4);
            uppBtn.mouseUp = uppBtnMouseUp;
            uppBtn.clicked = uppBtnClick;
            let lowBtn = new CanvasBtn("LOW", rightCtx, new Point(0,FIELD_HEIGHT*.4), RIGHT_WIDTH, FIELD_HEIGHT*.4);
            lowBtn.mouseUp = lowBtnMouseUp;
            uppBtn.clicked = lowBtnClick;
            let humBtn = new CanvasBtn("HUMAN", rightCtx, new Point(0,FIELD_HEIGHT*.8), RIGHT_WIDTH, FIELD_HEIGHT*.2);
            humBtn.mouseUp = humBtnMouseUp;
            humBtn.click = humBtnClick;

            let sideBtns = new RadioBtn();
            sideBtns.btns.push(uppBtn);
            sideBtns.btns.push(lowBtn);
            sideBtns.btns.push(humBtn);
            sideBtns.draw();
            rightElements.push(sideBtns);
        } else {
            for (let i = 0; i < rightElements.length; i++) {
                rightElements[i].setCtx(rightCtx);
                rightElements[i].draw();
            }
        }
    }
    
}

function uppBtnMouseUp(e, self) {
    self.transitionColor();
}
function uppBtnClick(e) {
    
}

function lowBtnMouseUp(e, self) {
    self.transitionColor(1);
}
function lowBtnClick(e) {
    
}

function humBtnMouseUp(e, self) {
    self.transitionColor(2);
}
function humBtnClick(e) {
    
}

function rightCanvasMouseUp(e) {
    if (mouseDownInRight == false) {
        let point = globalToRight(new Point(e.x, e.y));
        for (let i = 0; i < rightElements.length; i++) {
            rightElements[i].mouseUpOccured(point);
        }
    }
    mouseDownInRight = false;
    e.preventDefault();
}

function rightCanvasClick(e) {
    let point = globalToRight(new Point(e.x, e.y));
    for (let i = 0; i < rightElements.length; i++) {
        rightElements[i].clickOccured(point, false);
    }
    e.preventDefault();
}

function rightCanvasMouseDown(e) {
    mouseDownInRight = true;
    e.preventDefault();
}

function globalToRight(point) {
    return new Point(point.x-FIELD_WIDTH, point.y);
}
