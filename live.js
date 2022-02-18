class LiveData {
    constructor() {
        this.shots = [];
        this.taxiLoc = new Point(-1,-1);
        this.didTaxi = false;
    }

    addShot(someShot) {
        if (someShot.status != NO_SHOT)
            this.shots.push(someShot);
    }
}

let liveData = new LiveData();

function createRightButtonsLive() {
    // if (document.getElementById('rightPanelLive') != null) {
        let rightCtx = document.getElementById('rightPanelLive').getContext('2d');
        // if (rightElements.length == 0) {
            let uppBtn = new CanvasBtn("UPPER", rightCtx, new Point(0,0), RIGHT_WIDTH, FIELD_HEIGHT*.5);
            uppBtn.mouseUp = uppBtnMouseUp;
            uppBtn.clicked = uppBtnClick;
            uppBtn.transitionOver = uppBtnTransitionOver;
            let lowBtn = new CanvasBtn("LOW", rightCtx, new Point(0,FIELD_HEIGHT*.5), RIGHT_WIDTH, FIELD_HEIGHT*.5);
            lowBtn.mouseUp = lowBtnMouseUp;
            lowBtn.clicked = lowBtnClick;
            lowBtn.transitionOver = lowBtnTransitionOver;

            let sideBtns = new RadioBtn();
            sideBtns.btns.push(uppBtn);
            sideBtns.btns.push(lowBtn);
            sideBtns.draw();
            rightElements.push(sideBtns);
        // } else {
        //     for (let i = 0; i < rightElements.length; i++) {
        //         rightElements[i].setCtx(rightCtx);
        //         rightElements[i].draw();
        //     }

        // }
    // }
    
}

function loadRightCanvLive() {
    rightCanv = document.createElement('canvas');
    document.body.appendChild(rightCanv);
    rightCanv.id = "rightPanelLive";
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

function loadLiveScreen() {
    loadAutoScreen();
    saveAutoScreen();

    clearAllCanvas();
    loadField();
    loadRightCanvLive();
    createRightButtonsLive();
    isAuto = false;
}

function saveLiveScreen() {
    isAuto = false;
}
