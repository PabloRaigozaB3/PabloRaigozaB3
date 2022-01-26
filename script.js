let mainCanv = document.getElementById('mainPanel');
let rightCanv = document.getElementById('rightPanel');
let bottomCanv = document.getElementById('bottomPanel');

let mainCtx = mainCanv.getContext('2d');
let rightCtx = rightCanv.getContext('2d');
let bottomCtx = bottomCanv.getContext('2d');

mainCanv.style="position:absolute; left:0px; top:0px";
rightCanv.style="position:absolute; left:"+FIELD_WIDTH+"px; top:"+0+"px";
bottomCanv.style="position:absolute; left:0px; top:"+FIELD_HEIGHT+"px";

mainCanv.width = FIELD_WIDTH;
mainCanv.height = FIELD_HEIGHT;

rightCanv.width = RIGHT_WIDTH;
rightCanv.height = RIGHT_HEIGHT;

bottomCanv.width = BOTTOM_WIDTH;
bottomCanv.height = BOTTOM_HEIGHT;


mainCtx.fillStyle = "white";
mainCtx.fillRect(0,0,FIELD_WIDTH, FIELD_HEIGHT);
drawField(FIELD_WIDTH, FIELD_HEIGHT, mainCtx);


bottomCtx.fillStyle = "white";
bottomCtx.fillRect(0,0,window.innerWidth, FIELD_HEIGHT);


let preBtn = new CanvasBtn("PRE", bottomCtx, new Point(0,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
preBtn.clicked = loadPreScreen;
preBtn.clickedOut = savePreScreen;
preBtn.draw();

let autoBtn = new CanvasBtn("AUTO", bottomCtx, new Point(FIELD_WIDTH/3,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
autoBtn.clicked = loadAutoScreen;
autoBtn.draw();

let liveBtn = new CanvasBtn("LIVE", bottomCtx, new Point(2*FIELD_WIDTH/3,0), FIELD_WIDTH/3, BOTTOM_HEIGHT);
liveBtn.clicked = loadLiveScreen;
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




bottomElements.push(bottomBtns);

function globalToMain(point) {
    return point;
}

function globalToBottom(point) {
    return new Point(point.x, point.y-FIELD_HEIGHT);
}

