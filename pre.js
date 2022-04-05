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
class PreData {
    constructor(_scountInit="", _teamNum="", _matchNum="", _roundType="", _botType="") {
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
let preData = new PreData();

function createOption(title, someInput) {
    let some = document.createElement('option');
    some.id = title;
    some.innerText = title;
    someInput.appendChild(some);
}

function loadPreScreen(e) {
    clearAllCanvas();
    let preDiv = document.createElement('div');
    document.body.appendChild(preDiv);
    preDiv.id = "preDiv";

    let divStyle = "display:flex; flex-direction: row; align-items:center;justify-content:center;";
    
    let scouterInput = new TextInput("ScouterInitials", FIELD_HEIGHT*.06);
    scouterInput.div.style = divStyle;
    
    // let teamInput = new TextInput("Team#",FIELD_HEIGHT*.06);
    // teamInput.div.style = divStyle;
    // let dropDown = document.createElement('select');
    // teamInput.input = dropDown;
    // teamInput.input.style.width = "3em";

    teamDiv = document.createElement('div');
    teamLabel = document.createElement('p');
    teamInput = document.createElement('select');

    teamLabel.innerText = "Team";
    teamLabel.id = "Team" + "Label";
    teamLabel.style = "font-size: "+ FIELD_HEIGHT*.06+"px;";

    teamInput.value = 0;
    teamInput.id = "Team" + "Input";
    teamInput.style.fontSize =  FIELD_HEIGHT*.06+"px";
    teamInput.style.width = "2em";
    teamInput.style.margin = "1em";

    teamDiv.id = "Team" + "Div";
    teamDiv.style = "font-size: "+ FIELD_HEIGHT*.03+"px;";
    teamDiv.appendChild(teamLabel);
    teamDiv.appendChild(teamInput);

    
    createOption("359", teamInput);
    createOption("846", teamInput);
    createOption("1332", teamInput);
    createOption("1622", teamInput);
    createOption("1828", teamInput);
    createOption("2122", teamInput);
    createOption("2486", teamInput);
    createOption("2594", teamInput);
    createOption("2972", teamInput);
    createOption("3006", teamInput);
    createOption("3166", teamInput);
    createOption("3225", teamInput);
    createOption("3243", teamInput);
    createOption("3245", teamInput);
    createOption("3288", teamInput);
    createOption("3374", teamInput);
    createOption("3405", teamInput);
    createOption("3648", teamInput);
    createOption("4388", teamInput);
    createOption("4499", teamInput);
    createOption("4585", teamInput);
    createOption("4598", teamInput);
    createOption("4643", teamInput);
    createOption("4944", teamInput);
    createOption("5071", teamInput);
    createOption("5468", teamInput);
    createOption("5871", teamInput);
    createOption("5933", teamInput);
    createOption("6411", teamInput);
    createOption("6479", teamInput);
    createOption("6844", teamInput);
    createOption("7243", teamInput);
    createOption("7436", teamInput);
    createOption("7634", teamInput);
    createOption("7645", teamInput);
    createOption("7895", teamInput);
    createOption("7905", teamInput);
    createOption("7906", teamInput);
    createOption("8174", teamInput);
    createOption("8546", teamInput);
    createOption("8885", teamInput);

    teamDiv.style = divStyle;
    teamInput.style.width = "3em";

    let matchInput = new TextInput("Match#",FIELD_HEIGHT*.06);
    matchInput.div.style = divStyle;
    matchInput.input.style.width = "3em";
 
    scouterInput.input.value = preData.scoutInit;
    teamInput.value = preData.teamNum;
    matchInput.input.value = preData.matchNum;

    preDiv.appendChild(scouterInput.div);
    preDiv.appendChild(teamDiv);
    preDiv.appendChild(matchInput.div);

    preDiv.style = "display:flex; width:"+window.innerWidth+"px; height: 5em; flex-direction:row; align-items:center; justify-content:center;";

    let preCanv = document.createElement('canvas');
    preCanv.id = "prePanel";
    let preCtx = preCanv.getContext('2d');

    preCanv.width = window.innerWidth;
    preCanv.height = window.innerHeight - preDiv.clientHeight - (window.innerHeight-FIELD_HEIGHT);
    preCanv.style = "position:absolute; left: 0px; top:"+preDiv.clientHeight+"px";
    preCtx.fillStyle = 'white';
    preCtx.fillRect(0,0,preCanv.width, preCanv.height);

    
    preCanv.addEventListener('click', preCanvClick);
    document.body.appendChild(preCanv);
    createPreButtons();
    // console.log("do i get called")
    // console.log(FIELD_HEIGHT);
}

function savePreScreen(e) {
    let scoutInit = document.getElementById('ScouterInitialsInput').value;
    // let teamNum = document.getElementById('Team#Input').value;

    let mylist = document.getElementById("TeamInput");  
    let teamNum = mylist.options[mylist.selectedIndex].text;  

    let matchNum = document.getElementById('Match#Input').value;
    let roundType = preElements[0].getSelected().text;
    let botType = preElements[1].getSelected().text;
    
    preData = new PreData(scoutInit, teamNum, matchNum, roundType, botType); 
}

function createPreButtons() {
    // if (preElements.length == 0) {
        let preCanv = document.getElementById('prePanel');
        let preCtx = preCanv.getContext('2d');
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
        roundBtns.selectColor = "limegreen";
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
        botBtns.selectColor = "limegreen";

        for (let i = 0; i < 3; i++) {
            let redBtn = new CanvasBtn("Red "+(i+1), preCtx, new Point(preCanv.width/2+horiSpace, i*(botBtnHeight+vertSpace) + vertSpace), botBtnWidth, botBtnHeight);
            // redBtn.backgroundColor = "pink";
            redBtn.draw();
            let blueBtn = new CanvasBtn("Blue "+(i+1), preCtx, new Point(preCanv.width/2+2*horiSpace+botBtnWidth, i*(botBtnHeight+vertSpace) + vertSpace), botBtnWidth, botBtnHeight);
            // blueBtn.backgroundColor = "lightblue";
            blueBtn.draw();
            
            botBtns.btns.push(redBtn);
            botBtns.btns.push(blueBtn);
        }

        let resetBtnWidth = preCanv.width/16;
        // let resetBtn = new CanvasBtn("REFRESH", preCtx, new Point(0, 0), 100, 100);
        let resetBtn = new CanvasBtn("↻", preCtx, new Point(0, 0), resetBtnWidth, resetBtnWidth);
        resetBtn.clicked = resestBtnClicked;
        resetBtn.draw();

        let clearBtn = new CanvasBtn("X", preCtx, new Point(0, resetBtnWidth*1.2), resetBtnWidth, resetBtnWidth);
        clearBtn.clicked = clearBtnClicked;
        clearBtn.draw();

        if (preElements.length != 0) {
            roundBtns.select(preElements[0].selectedIndex);
            botBtns.select(preElements[1].selectedIndex);
            // resetBtn.select(preElements[2].selectedIndex);
        
            roundBtns.draw();
            botBtns.draw();
            // resetBtn.draw();
        }

        preElements = [];
        preElements.push(roundBtns);
        preElements.push(botBtns);
        preElements.push(resetBtn);
        preElements.push(clearBtn);
    // } else {
    //     for (let i = 0; i < preElements.length; i++) {
    //         preElements[i].setCtx(preCtx);
    //         preElements[i].draw();
    //     }
    // }
}

function resestBtnClicked(self) {
    repopulateConts();
    loadBottomCanv();
}

function clearBtnClicked(self) {
    mainElements = [];
    autoElements = [];
    bottomElements = [];
    preElements = [];
    postElements = [];
    liveElements = [];
    preData = new PreData();
    liveData = new LiveData();
    autoData = new AutoData();
    postData = new PostData();

    // repopulateConts();
    loadBottomCanv();
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
