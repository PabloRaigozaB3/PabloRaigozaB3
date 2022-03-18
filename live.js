class LiveData {
    constructor(_shots=[]) {
        this.upper = 0;
        this.lower = 0;
        this.human = 0;
        this.shots = _shots;
    }
    
    isBallClicked(point) {
        for (let i = 0; i < this.shots.length; i++) {
            if (dist(this.shots[i], point) < BALL_RADIUS*.75)
                return true;
        }
        return false;
    }

    removeBall(point) {
        // let ballIndex = -1
        for (let i = 0; i < this.shots.length; i++) {
            if (dist(this.shots[i], point) < BALL_RADIUS*.75) {
                this.shots.splice(i, 1);
            }
        }
        // if (ballIndex == -1)
        //     return;
        // const index = this.shots.indexOf(ball);
        // if (index > -1) {
        //     this.shots.splice(index, 1); // 2nd parameter means remove one item only
        // }
    }

    draw(mainCtx) {
        for (let i = 0; i < this.shots.length; i++) {
            mainCtx.fillStyle = "green";
            drawCircle(this.shots[i], BALL_RADIUS*.75, mainCtx);
            mainCtx.fill();
        }
    }
}

let liveData = new LiveData();

function loadLiveScreen() {
    loadAutoScreen();
    saveAutoScreen();

    clearAllCanvas();
    loadFieldLive();
    loadCenterField();
    loadSideBtns();
}

function loadFieldLive() {
    mainCanv = document.createElement('canvas');
    document.body.appendChild(mainCanv);
    mainCanv.id = "mainPanel";
    mainCtx = mainCanv.getContext('2d');
    mainCanv.style="position:absolute; left:0px; top:0px";
    mainCanv.width = window.innerWidth;
    mainCanv.height = FIELD_HEIGHT;
    mainCtx.fillStyle = "darkgrey";
    mainCtx.fillRect(0,0,window.innerWidth, FIELD_HEIGHT);
    
    mainCanv.addEventListener('click', mainCanvasClickLive);
}

function loadCenterField() {
    let mainCtx = document.getElementById('mainPanel').getContext("2d");
    drawField(CIRLCE_WIDTH, CIRLCE_WIDTH/2, mainCtx, new Point(SIDE_WIDTH,(FIELD_HEIGHT-CIRLCE_WIDTH/2)/2));
}

let upDispLive;
let lowDispLive;
let hmnDispLive;

function loadSideBtns() {
    let mainCtx = document.getElementById('mainPanel').getContext("2d");

    let upBtnLbl = new CanvasBtn("UP", mainCtx, new Point(0, 0), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    upBtnLbl.backgroundColor = "lightgrey"; upBtnLbl.borderColor = "trans"; upBtnLbl.draw();
    upDispLive = new CanvasBtn("0", mainCtx, new Point(SIDE_WIDTH*1.5+CIRLCE_WIDTH, 0), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    upDispLive.backgroundColor = "lightgrey"; upDispLive.borderColor = "trans";upDispLive.draw();
    let upBtnMinus = new CanvasBtn("-", mainCtx, new Point(SIDE_WIDTH/2, 0), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    upBtnMinus.backgroundColor = "red"; upBtnMinus.draw(); 
    let upBtnPlus = new CanvasBtn("+", mainCtx, new Point(SIDE_WIDTH+CIRLCE_WIDTH,0), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    upBtnPlus.backgroundColor = "limegreen";upBtnPlus.draw();
    upBtnMinus.clicked = function (self) {
        liveData.upper = liveData.upper - 1;
        if (liveData.upper <= 0)
            liveData.upper = 0;
        upDispLive.text = liveData.upper.toString();
        upDispLive.draw();
    }
    upBtnPlus.clicked = function (self) {
        liveData.upper = liveData.upper + 1;
        upDispLive.text = liveData.upper.toString();
        upDispLive.draw();
    }

    let lowBtnLbl = new CanvasBtn("LOW", mainCtx, new Point(0, FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    lowBtnLbl.backgroundColor = "lightgrey";lowBtnLbl.borderColor = "trans";lowBtnLbl.draw();
    lowDispLive = new CanvasBtn("0", mainCtx, new Point(SIDE_WIDTH*1.5+CIRLCE_WIDTH, FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    lowDispLive.backgroundColor = "lightgrey"; lowDispLive.borderColor = "trans";lowDispLive.draw();
    let lowBtnMinus = new CanvasBtn("-", mainCtx, new Point(SIDE_WIDTH/2, FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    lowBtnMinus.backgroundColor = "red";lowBtnMinus.draw(); 
    let lowBtnPlus = new CanvasBtn("+", mainCtx, new Point(SIDE_WIDTH+CIRLCE_WIDTH,FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    lowBtnPlus.backgroundColor = "limegreen";lowBtnPlus.draw(); 
    lowBtnMinus.clicked = function (self) {
        liveData.lower = liveData.lower - 1;
        if (liveData.lower <= 0)
            liveData.lower = 0;
        lowDispLive.text = liveData.lower.toString();
        lowDispLive.draw();
    }
    lowBtnPlus.clicked = function (self) {
        liveData.lower = liveData.lower + 1;
        lowDispLive.text = liveData.lower.toString();
        lowDispLive.draw();
    }

    let hmnBtnLbl = new CanvasBtn("HMN", mainCtx, new Point(0, 2*FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    hmnBtnLbl.backgroundColor = "lightgrey";hmnBtnLbl.borderColor = "trans";hmnBtnLbl.draw();
    hmnDispLive = new CanvasBtn("0", mainCtx, new Point(SIDE_WIDTH*1.5+CIRLCE_WIDTH, 2*FIELD_HEIGHT/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    hmnDispLive.backgroundColor = "lightgrey"; hmnDispLive.borderColor = "trans";hmnDispLive.draw();
    let hmnBtnMinus = new CanvasBtn("-", mainCtx, new Point(SIDE_WIDTH/2, FIELD_HEIGHT*2/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    hmnBtnMinus.backgroundColor = "red";hmnBtnMinus.draw(); 
    let hmnBtnPlus = new CanvasBtn("+", mainCtx, new Point(SIDE_WIDTH+CIRLCE_WIDTH,FIELD_HEIGHT*2/3), SIDE_WIDTH/2, FIELD_HEIGHT/3);
    hmnBtnPlus.backgroundColor = "limegreen";hmnBtnPlus.draw(); 
    hmnBtnMinus.clicked = function (self) {
        liveData.human = liveData.human - 1;
        if (liveData.human <= 0)
            liveData.human = 0;
        hmnDispLive.text = liveData.human.toString();
        hmnDispLive.draw();
    }
    hmnBtnPlus.clicked = function (self) {
        liveData.human = liveData.human + 1;
        hmnDispLive.text = liveData.human.toString();
        hmnDispLive.draw();
    }

    if (liveElements.length != 0) {
        upDispLive.text = ""+liveData.upper;
        lowDispLive.text = ""+liveData.lower;
        hmnDispLive.text = ""+liveData.human;
        upDispLive.draw();
        lowDispLive.draw();
        hmnDispLive.draw();
    }

    liveElements = [];
    liveElements.push(upBtnMinus);
    liveElements.push(upBtnPlus)
    liveElements.push(lowBtnMinus);
    liveElements.push(lowBtnPlus);
    liveElements.push(hmnBtnMinus);
    liveElements.push(hmnBtnPlus);
    liveData.draw(mainCtx);
}

function mainCanvasClickLive(e) {
    let point = new Point(e.x, e.y);
    for (let i = 0; i < liveElements.length; i++) {
        if (liveElements[i].clickOccured(point))
            return;
    }

    let mainCtx = document.getElementById('mainPanel').getContext("2d");

    if (point.x > SIDE_WIDTH && point.x < SIDE_WIDTH+CIRLCE_WIDTH) {
        if (point.y > (FIELD_HEIGHT-CIRLCE_WIDTH/2)/2 && point.y < CIRLCE_WIDTH/2+(FIELD_HEIGHT-CIRLCE_WIDTH/2)/2) {
            if (liveData.isBallClicked(point)) {
                liveData.removeBall(point);
                loadCenterField();
                liveData.draw(mainCtx);
                return;
            }
            if (liveData.shots.length >= 3) {
                liveData.shots.splice(0,1);
            }
            liveData.shots.push(point);
            loadCenterField();
            liveData.draw(mainCtx);
        }
    }
}

function saveLiveScreen() {
}
