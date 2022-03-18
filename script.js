// add some comments

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
    postBtn.clickedOut = unLoadPostScreen;
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

    let postBtn = bottomElements[0].btns[3];
    if (postBtn.selected &&postBtn.isInside(point)) {
        // side of QR code is the length of smallest side (width or height)
        // generate in middle of screen
        let side = window.innerHeight;
        if (window.innerHeight > window.innerWidth) {
            side = window.innerWidth;
        }
        let qrDiv = document.createElement('div');
        qrDiv.id = "qrDiv";
        qrDiv.style = "display:flex; flex-direction: column; align-items:center;justify-content:left;";
        qrDiv.style.position = "absolute";
        // qrDiv.style.width = side+"px";
        // qrDiv.style.height = side+"px";
        // qrDiv.style.left  = (window.innerWidth-side)/2+"px";
        // qrDiv.style.top = (window.innerHeight-side)/2+"px";

        qrDiv.style.width = window.innerWidth+'px';
        qrDiv.style.height = window.innerHeight+'px';
        qrDiv.style.left  = "0px";
        qrDiv.style.top = "0px";

        qrDiv.style.background = "white"
        qrDiv.addEventListener('click', qrDivClick);
        let theQRDiv = document.createElement('div');
        theQRDiv.id = 'theQRDiv';
        qrDiv.appendChild(theQRDiv);
        document.body.appendChild(qrDiv);

        // let autoShort = autoData.export();
        // let liveShort = liveData.export();
        let data = {
            preData,
            autoData,
            liveData,
            postData
        };

        let qr = new QRCode(theQRDiv);
        qr.makeCode(JSON.stringify(data));
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(data).length);
        theQRDiv.style.position = "absolute";
        let theSide = theQRDiv.offsetWidth;
        theQRDiv.style.left  = (window.innerWidth-theSide)/2+"px";
        theQRDiv.style.top = (window.innerHeight-theSide)/2+"px";
        // qr.makeCode(stringify);

        

    }
    for (let i = 0; i < bottomElements.length; i++) {
        bottomElements[i].clickOccured(point);
    }
    e.preventDefault();
}

function qrDivClick(e) {
    document.getElementById('qrDiv').remove();
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
