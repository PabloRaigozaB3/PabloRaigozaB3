class TextInput {
    constructor(_labelText, _fontSize) {
        this.div = document.createElement('div');
        this.label = document.createElement('p');
        this.input = document.createElement('input');

        this.label.innerText = _labelText;
        this.label.id = _labelText + "Label";
        this.label.style = "font-size: "+_fontSize+"px;";

        this.input.value = 0;
        this.input.id = _labelText + "Input";
        this.input.style.fontSize = _fontSize+"px";
        this.input.style.width = "2em";
        this.input.style.margin = "1em";

        this.div.id = _labelText + "Div";
        this.div.style = "font-size: "+_fontSize+"px;";
        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
    }
}
let savedPreData = null;
class PreData {
    constructor(_scountInit, _teamNum, _matchNum, _roundType, _botType) {
        this.scoutInit = _scountInit;
        this.teamNum = _teamNum;
        this.matchNum = _matchNum;
        this.roundType = _roundType;
        this.botType = _botType;
    }

    toString() {
        return ''+this.scouterInit + "," +
                  this.teamNum + "," +
                  this.matchNum + "," +
                  this.roundType + "," +
                  this.botType;
    }
}

function loadPreScreen(e) {
    clearAllCanvas();
    let preDiv = document.createElement('div');
    document.body.appendChild(preDiv);
    preDiv.id = "preDiv";

    let divStyle = "display:flex; flex-direction: row; align-items:center;justify-content:center;";
    
    let scouterInput = new TextInput("ScouterInitials", FIELD_HEIGHT*.06);
    scouterInput.div.style = divStyle;
    
    let teamInput = new TextInput("Team#",FIELD_HEIGHT*.06);
    teamInput.div.style = divStyle;
    teamInput.input.style.width = "3em";

    let matchInput = new TextInput("Match#",FIELD_HEIGHT*.06);
    matchInput.div.style = divStyle;
    matchInput.input.style.width = "3em";
 
    if (savedPreData != null) {
        scouterInput.input.value = savedPreData.scoutInit;
        teamInput.input.value = savedPreData.teamNum;
        matchInput.input.value = savedPreData.matchNum;
    }

    preDiv.appendChild(scouterInput.div);
    preDiv.appendChild(teamInput.div);
    preDiv.appendChild(matchInput.div);

    preDiv.style = "display:flex; width:"+window.innerWidth+"px; height: 5em; flex-direction:row; align-items:center; justify-content:center;";

    let preCanv = document.createElement('canvas');
    preCanv.id = "prePanel";
    let preCtx = preCanv.getContext('2d');

    preCanv.width = window.innerWidth;
    preCanv.height = window.innerHeight - preDiv.clientHeight - BOTTOM_HEIGHT;
    preCanv.style = "position:absolute; left: 0px; top:"+preDiv.clientHeight+"px";
    preCtx.fillStyle = 'white';
    preCtx.fillRect(0,0,preCanv.width, preCanv.height);

    createPreButtons(preCanv, preCtx);
    preCanv.addEventListener('click', preCanvClick);
    document.body.appendChild(preCanv, preCanv);
}

function savePreScreen(e) {
    let scoutInit = document.getElementById('ScouterInitialsInput').value;
    let teamNum = document.getElementById('Team#Input').value;
    let matchNum = document.getElementById('Match#Input').value;
    let roundType = preElements[0].getSelected().text;
    let botType = preElements[1].getSelected().text;
    
    savedPreData = new PreData(scoutInit, teamNum, matchNum, roundType, botType); 
}

function createPreButtons(preCanv, preCtx) {
    if (preElements.length == 0) {
        let spacing = preCanv.height/21;

        let qualBtn = new CanvasBtn("Quals",preCtx, new Point(preCanv.width/8, spacing),preCanv.width/4,preCanv.height/7);
        qualBtn.draw();

        let eigthBtn = new CanvasBtn("8th-Final", preCtx, new Point(preCanv.width/8,spacing+preCanv.height/7+spacing),preCanv.width/4,preCanv.height/7);
        eigthBtn.draw();

        let fourthBtn = new CanvasBtn("4th-Final", preCtx, new Point(preCanv.width/8,spacing+2*preCanv.height/7+2*spacing),preCanv.width/4,preCanv.height/7);
        fourthBtn.draw();

        let semiBtn = new CanvasBtn("2nd-Final", preCtx, new Point(preCanv.width/8,spacing+3*preCanv.height/7+3*spacing),preCanv.width/4,preCanv.height/7);
        semiBtn.draw();

        let finalBtn = new CanvasBtn("Final", preCtx, new Point(preCanv.width/8,spacing+4*preCanv.height/7+4*spacing),preCanv.width/4,preCanv.height/7);
        finalBtn.draw();

        let roundBtns = new RadioBtn();
        roundBtns.btns.push(qualBtn);
        roundBtns.btns.push(eigthBtn);
        roundBtns.btns.push(fourthBtn);
        roundBtns.btns.push(semiBtn);
        roundBtns.btns.push(finalBtn);

        let horiSpace = preCanv.width/18;
        let vertSpace = preCanv.height/16;
        let botBtnWidth = preCanv.width/6;
        let botBtnHeight = preCanv.height/4;

        let botBtns = new RadioBtn();
        for (let i = 0; i < 3; i++) {
            let redBtn = new CanvasBtn("Red "+(i+1), preCtx, new Point(preCanv.width/2+horiSpace, i*(botBtnHeight+vertSpace) + vertSpace), botBtnWidth, botBtnHeight);
            redBtn.draw();
            let blueBtn = new CanvasBtn("Blue "+(i+1), preCtx, new Point(preCanv.width/2+2*horiSpace+botBtnWidth, i*(botBtnHeight+vertSpace) + vertSpace), botBtnWidth, botBtnHeight);
            blueBtn.draw();
            
            botBtns.btns.push(redBtn);
            botBtns.btns.push(blueBtn);
        }

        preElements.push(roundBtns);
        preElements.push(botBtns);
    } else {
        for (let i = 0; i < preElements.length; i++) {
            preElements[i].setCtx(preCtx);
            preElements[i].draw();
        }
    }
}

function preCanvClick(e) {
    let point = globalToPre(new Point(e.x, e.y));
    for (let i = 0; i < preElements.length; i++) {
        preElements[i].clickOccured(point);
    }
    e.preventDefault();
}

function globalToPre(point) {
    return new Point(point.x, point.y-document.getElementById('preDiv').clientHeight);
}

function clearAllCanvas() {
    rightElements = [];
    clearElement('mainPanel');
    clearElement('preDiv');
    clearElement('prePanel');
    clearElement('rightPanel');
    clearElement('rightPanelLive');
    clearElement('postPanel');
    clearElement('rightSlidersDiv');
    // clearElement('bottomPanel');
}

// removes all instances of given ID
function clearElement(elementId) {
    let run = true;
    while (run) {
        if(document.getElementById(elementId) != null) {
            document.getElementById(elementId).remove();
        } else {
            run = false;
        }
    }
}
