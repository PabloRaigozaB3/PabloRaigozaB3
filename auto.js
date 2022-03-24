document.body.addEventListener('touchmove', function(e) {
    currentMouse = new Point(e.touches[0].clientX,e.touches[0].clientY);
});
// save the data locally
class AutoData {
    constructor(_shots=[], _taxiLoc=new Point(-1,-1), _didTaxi=false) {
        this.taxiLoc = _taxiLoc;
        this.didTaxi = _didTaxi;
        this.upper = 0;
        this.lower = 0;
        this.human = 0;
        this.shots = _shots;
    }
    
    isBallClicked(ball) {
        for (let i = 0; i < this.shots.length; i++) {
            if (this.shots[i] == ball)
                return true;
        }
        return false;
    }

    removeBall(ball) {
        const index = this.shots.indexOf(ball);
        if (index > -1) {
            this.shots.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    draw(mainCtx) {
        for (let i = 0; i < 12; i++) {
            let point = new Point(xBallPos[i], yBallPos[i]);
            if (this.isBallClicked(i)) {
                mainCtx.fillStyle = "limegreen";
            } else if(isBallRed(i)) {
                mainCtx.fillStyle = "red";
            } else {
                mainCtx.fillStyle = "blue";
            }
            drawCircle(point, BALL_RADIUS, mainCtx);
            mainCtx.fill();
        }
        if (this.taxiLoc.x == -1 || this.taxiLoc.y == -1)
            return;
        mainCtx.fillStyle = "green";
        drawCircle(this.taxiLoc, BALL_RADIUS/2, mainCtx);
        mainCtx.fill();
    }
}

// class AutoDataExport {
//     constructor(_shots, _taxiLoc, _didTaxi) {
//         this.taxiLoc = _taxiLoc;
//         this.didTaxi = _didTaxi;
//         for (let i = 0; i < _shots.length; i++) {
//             let r = dist(_shots[i], new Point(width/2, height/2)).toFixed(5);
//         }
//     }
// }

let autoData = new AutoData();
function loadAutoScreen(e) {
    clearAllCanvas();
    loadField();
    loadFieldCenter();
    loadFieldButtons();
}
function loadField() {
    mainCanv = document.createElement('canvas');
    document.body.appendChild(mainCanv);
    mainCanv.id = "mainPanel";
    mainCtx = mainCanv.getContext('2d');
    mainCanv.style="position:absolute; left:0px; top:0px";
    mainCanv.width = window.innerWidth;
    mainCanv.height = FIELD_HEIGHT;
    mainCtx.fillStyle = "darkgrey";
    mainCtx.fillRect(0,0,window.innerWidth, FIELD_HEIGHT);
    
    mainCanv.addEventListener('click', mainCanvasClick);
}


let xBallPos;
let yBallPos;

function populateBallPos(width, height, radius, ballRadius) {
    xBallPos = [];
    yBallPos = [];
    let xSpacing = ballRadius*2;
    let ySpacing = (height-2*(ballRadius+radius))/2;
    xBallPos.push(width/2+xSpacing);
    xBallPos.push(width/2+xSpacing+radius);
    xBallPos.push(width/2+xSpacing+radius);
    xBallPos.push(width/2+xSpacing+radius);
    xBallPos.push(width/2+xSpacing+radius);
    xBallPos.push(width/2+xSpacing);
    xBallPos.push(width/2-xSpacing);
    xBallPos.push(width/2-xSpacing-radius);
    xBallPos.push(width/2-xSpacing-radius);
    xBallPos.push(width/2-xSpacing-radius);
    xBallPos.push(width/2-xSpacing-radius);
    xBallPos.push(width/2-xSpacing);

    yBallPos.push(ySpacing);
    yBallPos.push(ySpacing*1.5);
    yBallPos.push(height/2-ySpacing*1.5);
    yBallPos.push(height/2+ySpacing*1.5);
    yBallPos.push(height-ySpacing*1.5);
    yBallPos.push(height-ySpacing);
    yBallPos.push(height-ySpacing);
    yBallPos.push(height-ySpacing*1.5);
    yBallPos.push(height/2+ySpacing*1.5);
    yBallPos.push(height/2-ySpacing*1.5);
    yBallPos.push(ySpacing*1.5);
    yBallPos.push(ySpacing);
    CIRLCE_WIDTH = (xSpacing*4)+radius*2;
    SIDE_WIDTH = (window.innerWidth - CIRLCE_WIDTH)/2;
}
function loadFieldCenter() {
    let mainCanv = document.getElementById('mainPanel');
    let mainCtx  = mainCanv.getContext('2d');
    let width = window.innerWidth;
    let height = FIELD_HEIGHT;

    RADIUS = height/3;
    let radius = RADIUS;
    BALL_RADIUS = (height - radius*2) / 5;
    let ballRadius = BALL_RADIUS;
    populateBallPos(width, height, radius, ballRadius);
    
    mainCtx.fillStyle = "red";
    drawCircle(new Point(xBallPos[2], yBallPos[2]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[4], yBallPos[4]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[6], yBallPos[6]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[7], yBallPos[7]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[9], yBallPos[9]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[11], yBallPos[11]), ballRadius, mainCtx);
    mainCtx.fill();

    mainCtx.fillStyle = "blue";
    drawCircle(new Point(xBallPos[0], yBallPos[0]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[1], yBallPos[1]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[3], yBallPos[3]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[5], yBallPos[5]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[8], yBallPos[8]), ballRadius, mainCtx);
    mainCtx.fill();
    drawCircle(new Point(xBallPos[10], yBallPos[10]), ballRadius, mainCtx);
    mainCtx.fill();

    
    drawWedge(new Point(width/2, height/2),
    radius,
    65,
    245,
    mainCtx);
    mainCtx.fillStyle = "pink";
    mainCtx.fill();
    drawWedge(new Point(width/2, height/2),
    radius,
    245,
    425,
    mainCtx);
    mainCtx.fillStyle = "lightblue";
    mainCtx.fill();
    
    for (let i = 0; i < 4; i++) {
        if (i < 2) {mainCtx.fillStyle = "red";}
        else {mainCtx.fillStyle = "blue";}

        drawWedge(new Point(width/2, height/2),
        height/3,
        65+i*(90),
        155+i*90, mainCtx);
        mainCtx.strokeStyle = mainCtx.fillStyle;
        mainCtx.lineWidth = 3;
        mainCtx.stroke();
    }
}

let upDisp;
let lowDisp;
let hmnDisp;

function loadFieldButtons() {
    let mainCanv = document.getElementById('mainPanel');
    let mainCtx  = mainCanv.getContext('2d');
    let width = window.innerWidth;
    let height = FIELD_HEIGHT;
    let regBtnHeight = FIELD_HEIGHT/4;
    
    let taxiBtn  = new CanvasBtn("NO", mainCtx,new Point(SIDE_WIDTH/2,0),SIDE_WIDTH/2, regBtnHeight);
    let taxiBtnLbl = new CanvasBtn("TAXI", mainCtx, new Point(0, 0),SIDE_WIDTH/2, regBtnHeight);
    taxiBtnLbl.backgroundColor = "lightgrey";
    taxiBtnLbl.borderColor = "lightgrey";
    taxiBtnLbl.draw();
    taxiBtn.backgroundColor="red";taxiBtn.draw();
    taxiBtn.clicked = function(self) {
        autoData.didTaxi = !autoData.didTaxi;
        if (self.selected) {
            self.backgroundColor = 'red';
            self.text = "NO"
        } else {
            self.backgroundColor = 'limegreen';
            self.text = "YES";
        }
        self.selected = !self.selected;
        self.draw();
    };

    let matchNumberLbl = new CanvasBtn(preData.teamNum+ ", "+ preData.matchNum, mainCtx, new Point(CIRLCE_WIDTH+SIDE_WIDTH,0), SIDE_WIDTH, regBtnHeight);
    // console.log(preData.matchNum)
    matchNumberLbl.backgroundColor = "lightgrey";

    matchNumberLbl.draw();
    // console.log(matchNumberLbl)
    let upBtnMinus  = new CanvasBtn("-", mainCtx,new Point(SIDE_WIDTH/2,regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    let upBtnLbl = new CanvasBtn("UP", mainCtx, new Point(0, regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    upBtnMinus.backgroundColor = "red";
    upBtnLbl.backgroundColor = "lightgrey";
    upBtnLbl.borderColor = "lightgrey";
    upBtnLbl.draw();
    upBtnMinus.draw();
    upBtnMinus.clicked = function(self) {
        autoData.upper = autoData.upper - 1;
        if (autoData.upper <= 0)
            autoData.upper = 0;
        upDisp.text = autoData.upper.toString();
        upDisp.draw();
    }
    // upBtnMinus.click = upBtnMinusClick;
    
    let upBtnPlus  = new CanvasBtn("+", mainCtx,new Point(CIRLCE_WIDTH+SIDE_WIDTH,regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    upDisp = new CanvasBtn("0", mainCtx, new Point(CIRLCE_WIDTH+SIDE_WIDTH+SIDE_WIDTH/2, regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    upBtnPlus.backgroundColor = "limegreen";
    upDisp.backgroundColor = "lightgrey";
    upDisp.borderColor = "trans";
    upDisp.draw();
    upBtnPlus.draw();
    // taxiBtnYes.draw();
    
    upBtnPlus.clicked = function(self) {
        autoData.upper = autoData.upper + 1;
        upDisp.text = autoData.upper.toString();
        upDisp.draw();
    }
    
    let lowBtnMinus = new CanvasBtn("-", mainCtx,new Point(SIDE_WIDTH/2,2*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    let lowBtnLbl = new CanvasBtn("LOW", mainCtx,new Point(0,2*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    lowBtnLbl.backgroundColor = "lightgrey";
    lowBtnLbl.borderColor = "lightgrey";
    lowBtnMinus.backgroundColor = "red";
    lowBtnLbl.draw();
    lowBtnMinus.draw();

    let lowBtnPlus  = new CanvasBtn("+", mainCtx,new Point(CIRLCE_WIDTH+SIDE_WIDTH,2*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    lowDisp = new CanvasBtn("0", mainCtx, new Point(CIRLCE_WIDTH+SIDE_WIDTH+SIDE_WIDTH/2, 2*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    lowBtnPlus.backgroundColor = "limegreen";
    lowDisp.backgroundColor = "lightgrey";
    lowDisp.borderColor = "trans";
    lowDisp.draw();
    lowBtnPlus.draw();

    lowBtnMinus.clicked = function(self) {
        autoData.lower = autoData.lower - 1;
        if (autoData.lower <= 0)
            autoData.lower = 0;
        lowDisp.text = autoData.lower.toString();
        lowDisp.draw();
    }
    lowBtnPlus.clicked = function(self) {
        autoData.lower = autoData.lower + 1;
        lowDisp.text = autoData.lower.toString();
        lowDisp.draw();
    }

    let hmnBtnMinus = new CanvasBtn("-", mainCtx,new Point(SIDE_WIDTH/2,3*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    let hmnBtnLbl = new CanvasBtn("HMN", mainCtx,new Point(0,3*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    hmnBtnMinus.backgroundColor = "red";
    hmnBtnLbl.backgroundColor = "lightgrey";
    hmnBtnLbl.borderColor = "lightgrey";
    hmnBtnLbl.draw();
    hmnBtnMinus.draw();

    let hmnBtnPlus  = new CanvasBtn("+", mainCtx,new Point(CIRLCE_WIDTH+SIDE_WIDTH,3*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    hmnDisp = new CanvasBtn("0", mainCtx, new Point(CIRLCE_WIDTH+SIDE_WIDTH+SIDE_WIDTH/2, 3*regBtnHeight),SIDE_WIDTH/2, regBtnHeight);
    hmnBtnPlus.backgroundColor = "limegreen";
    hmnDisp.backgroundColor = "lightgrey";
    hmnDisp.borderColor = "trans";
    hmnDisp.draw();
    hmnBtnPlus.draw();

    hmnBtnMinus.clicked = function(self) {
        autoData.human = autoData.human - 1;
        if (autoData.human <= 0)
            autoData.human = 0;
        hmnDisp.text = autoData.human.toString();
        hmnDisp.draw();
    }
    
    hmnBtnPlus.clicked = function(self) {
        autoData.human = autoData.human + 1;
        hmnDisp.text = autoData.human.toString();
        hmnDisp.draw();
    }

    if (autoData.didTaxi)
        taxiBtn.clicked(taxiBtn);
    
    if (autoElements.length != 0) {
        
        upDisp.text = ""+autoData.upper;
        lowDisp.text = ""+autoData.lower;
        hmnDisp.text = ""+autoData.human;
        upDisp.draw();
        lowDisp.draw();
        hmnDisp.draw();
    }

    autoElements = [];
    autoElements.push(taxiBtn);
    // autoElements.push(taxiBtnYes);
    // autoElements.push(taxiRadio)
    autoElements.push(upBtnMinus);
    autoElements.push(upBtnPlus)
    // autoElements.push(upRadio);
    autoElements.push(lowBtnMinus);
    autoElements.push(lowBtnPlus);
    autoElements.push(hmnBtnMinus);
    autoElements.push(hmnBtnPlus);
    autoData.draw(mainCtx);
}

function saveAutoScreen() {

}

function mainCanvasClick(e) {
    let point = new Point(e.x, e.y);
    for (let i = 0; i < autoElements.length; i++) {
        if (autoElements[i].clickOccured(point))
            return;
    }

    let mainCtx = document.getElementById("mainPanel").getContext("2d");
    for (let i = 0; i < 12; i++) {
        let p1 = new Point(xBallPos[i], yBallPos[i]);
        // console.log(dist(point, p1));
        if (dist(point, p1) < BALL_RADIUS) {
            if (autoData.isBallClicked(i)) {
                autoData.removeBall(i);
                if (isBallRed(i))
                    mainCtx.fillStyle = "red";
                else
                    mainCtx.fillStyle = "blue";
            } else {
                autoData.shots.push(i);
                mainCtx.fillStyle = "limegreen";
            }
            drawCircle(p1, BALL_RADIUS, mainCtx);
            mainCtx.fill();
            return;
        }
    }
    
    let width = window.innerWidth;
    let height = FIELD_HEIGHT;
    let center = new Point(width/2, height/2);
    let radius = RADIUS;
    let gap = RADIUS-dist(point, center);

    
    if (dist(new Point(width/2, height/2), point) < RADIUS) {
        if (gap < BALL_RADIUS/2)
            return;
        drawWedge(new Point(width/2, height/2),
        radius,
        65,
        245,
        mainCtx);
        mainCtx.fillStyle = "pink";
        mainCtx.fill();
        drawWedge(new Point(width/2, height/2),
        radius,
        245,
        425,
        mainCtx);
        mainCtx.fillStyle = "lightblue";
        mainCtx.fill();
        
        for (let i = 0; i < 4; i++) {
            if (i < 2) {mainCtx.fillStyle = "red";}
            else {mainCtx.fillStyle = "blue";}

            drawWedge(new Point(width/2, height/2),
            radius,
            65+i*(90),
            155+i*90, mainCtx);
            mainCtx.strokeStyle = mainCtx.fillStyle;
            mainCtx.lineWidth = 3;
            mainCtx.stroke();

            // if (mainCtx.fillStyle === "red")
            //     mainCtx.fillStyle = "pink";
            // else
            //     mainCtx.fillStyle = "lightblue"
            // mainCtx.fill();
        }
        mainCtx.fillStyle = "green";
        drawCircle(point, BALL_RADIUS/2, mainCtx);
        mainCtx.fill();

        autoData.taxiLoc = point;
    }
}

function isBallRed(ball) {
    return(ball == 2 || ball==4 || ball==6 || ball==7 || ball==9 || ball==11);
}

function dist(p1, p2) {
    let res = Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y,2));
    // console.log(res);
    return res;
}
