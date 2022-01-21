class TextInput {
    constructor(_labelText, _fontSize) {
        this.div = document.createElement('div');
        this.label = document.createElement('p');
        this.input = document.createElement('input');

        this.label.innerText = _labelText;
        this.label.id = _labelText + "Label";
        this.label.style = "font-size: "+_fontSize+"px;";

        this.input.innerText = "0";
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
    mainCtx.fillStyle = "white";
    mainCtx.fillRect(0,0,RIGHT_WIDTH, RIGHT_HEIGHT);
    fieldIsShown = true;
}

function loadPreScreen(e) {
    mainCanv.remove();
    rightCanv.remove();
    if(document.getElementById('prePanel') != null) {
        document.getElementById('prePanel').remove();
    }
    fieldIsShown = false;

    let preDiv = document.createElement('div');
    document.body.appendChild(preDiv);
    preDiv.id = "prePanel";

    let divStyle = "display:flex; flex-direction: row; align-items:center;justify-content:center;";
    
    let scouterInput = new TextInput("ScouterInitials", FIELD_HEIGHT*.06);
    scouterInput.div.style = divStyle;
    
    let teamInput = new TextInput("Team#",FIELD_HEIGHT*.06);
    teamInput.div.style = divStyle;

    let matchInput = new TextInput("Match#",FIELD_HEIGHT*.06);
    matchInput.div.style = divStyle;
 
    preDiv.appendChild(scouterInput.div);
    preDiv.appendChild(teamInput.div);
    preDiv.appendChild(matchInput.div);

    preDiv.style = "display:flex; width:"+window.innerWidth+"px; height: 5em; flex-direction:row; align-items:center; justify-content:center;";

    let preCanv = document.createElement('canvas');
    let preCtx = preCanv.getContext('2d');

    preCanv.width = window.innerWidth;
    preCanv.height = window.innerHeight - preDiv.clientHeight - BOTTOM_HEIGHT;
    console.log(window.innerHeight - BOTTOM_HEIGHT);
    preCanv.style = "position:absolute; left: 0px; top:"+preDiv.clientHeight+"px";
    preCtx.fillStyle = 'white';
    preCtx.fillRect(0,0,preCanv.width, preCanv.height);
    document.body.appendChild(preCanv);
}

function loadAutoScreen(e) {
    if (!fieldIsShown) { loadField(); }
}

function loadLiveScreen(e) {
    if (!fieldIsShown) { loadField(); }
}

function loadPostScreen(e) {
    if (!fieldIsShown) { loadField(); }
}
