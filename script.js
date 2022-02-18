function loadBottomCanv() {
    clearAllCanvas();
    clearElement('bottomPanel');
    createBottomBtns();
}

function createBottomBtns() {
    let bottomCanv = document.createElement('canvas');
    bottomCanv.id = 'bottomPanel';
    document.body.appendChild(bottomCanv);
    let bottomCtx = bottomCanv.getContext('2d');
    bottomCanv.style="position:absolute; left:0px; top:"+FIELD_HEIGHT+"px";

    bottomCanv.width = BOTTOM_WIDTH;
    bottomCanv.height = BOTTOM_HEIGHT;

    let preBtn = new CanvasBtn("PRE", bottomCtx, new Point(0,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
    preBtn.clicked = loadPreScreen;
    preBtn.clickedOut = savePreScreen;
    preBtn.draw();

    let autoBtn = new CanvasBtn("AUTO", bottomCtx, new Point(FIELD_WIDTH/3,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
    autoBtn.clicked = loadAutoScreen;
    autoBtn.clickedOut = saveAutoScreen;
    autoBtn.draw();

    let liveBtn = new CanvasBtn("TELE-OP", bottomCtx, new Point(2*FIELD_WIDTH/3,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
    liveBtn.clicked = loadLiveScreen;
    liveBtn.clickedOut = saveLiveScreen;
    liveBtn.draw();

    let postBtn = new CanvasBtn("POST", bottomCtx, new Point(FIELD_WIDTH, 0), RIGHT_WIDTH, BOTTOM_HEIGHT);
    postBtn.clicked = loadPostScreen;
    postBtn.draw();



    let bottomBtns = new RadioBtn();
    bottomBtns.btns.push (preBtn);
    bottomBtns.btns.push (autoBtn);
    bottomBtns.btns.push (liveBtn);
    bottomBtns.btns.push (postBtn);
    bottomBtns.select(0);
    bottomElements = [];
    bottomElements.push(bottomBtns);

    bottomCanv.addEventListener('click', bottomCanvClicked);
}

function bottomCanvClicked(e) {
    let point = globalToBottom(new Point(e.x, e.y));

    for (let i = 0; i < bottomElements.length; i++) {
        bottomElements[i].clickOccured(point);
    }
    e.preventDefault();
}

loadBottomCanv();
function globalToMain(point) {
    return point;
}

function globalToBottom(point) {
    return new Point(point.x, point.y-FIELD_HEIGHT);
}

window.addEventListener("scroll", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
});
