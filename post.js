function loadPostScreen(self) {
    clearAllCanvas();
    createPostCanv();
    createPostButtons();
    createRightSliders();
    self.text = "SUBMIT"
}

class PostData {
    constructor(_rung="", _succ=false, _noShow=false, _ground=false, _term=false, _die=false, _driver=1, _damage=1, _defense=1, _comments="Comments") {
        this.rung = _rung; // string
        this.succ = _succ;
        this.noShow = _noShow;
        this.term = _term; // bool
        this.ground = _ground;
        this.die = _die; // bool
        this.driver = _driver; // int
        this.damage = _damage; // int
        this.defense = _defense; // int
        this.comments = _comments // string
    }
}

let postData = new PostData();

class SliderDOM {
    constructor(_text, _min, _max, _val, _step = 1) {
        this.text = _text;
        this.min = _min;
        this.max = _max;
        this.val = _val;
        this.step = _step;


        this.div = document.createElement('div');
        this.div.id = this.text+"Div";
        this.div.style = "display:flex; flex-direction: column; align-items:center;justify-content:left;";
        this.div.style.padding = '0em';
        this.div.style.margin = '.3em';
        
        this.label = document.createElement('h5');
        this.label.id = this.text+"Label";
        this.label.style.paddingBottom = '1em';
        // this.label.style.paddingTop = '1em';
        this.label.style.margin = '0em';
        this.label.innerText = this.text+": "+this.val;
        if (this.text === "Shooting")
            this.label.innerText = "Damage: "+this.val;
        this.label.style.fontSize = ".5em";
        
    
        this.slider = document.createElement('input');
        this.slider.type = "range";
        this.slider.min = this.min;
        this.slider.max = this.max;
        this.slider.value = this.val;
        this.slider.id = this.text+"Slider";   
        this.slider.className = 'slider';
        this.slider.step = this.step;
        this.slider.style.marginBottom = "1em";
        
        document.getElementById('skillsLabel').appendChild(this.div);
        this.div.appendChild(this.label);
        this.div.appendChild(this.slider);
    }
}
function createRightSliders() {
    let skillDiv = document.createElement('div');
    skillDiv.id = "skillDiv";
    skillDiv.style.position = "absolute";
    skillDiv.style.left = POST_WIDTH+"px";
    skillDiv.style.top = 0+"px";
    skillDiv.style.width = window.innerWidth - POST_WIDTH+"px";
    skillDiv.style.height = POST_HEIGHT+"px";
    document.body.appendChild(skillDiv);

    let rightSliderLabel = document.createElement('h1');
    rightSliderLabel.style.textAlign = "center";
    rightSliderLabel.style.fontSize = POST_HEIGHT/10+"px";
    rightSliderLabel.innerText = "SKILLS";
    rightSliderLabel.id = 'skillsLabel';
    skillDiv.appendChild(rightSliderLabel);

    let driverSlider = new SliderDOM("Driver", 1, 5, postData.driver);
    driverSlider.slider.oninput = driverInput;
    let shootingSlider = new SliderDOM("Shooting", 1, 5, postData.damage);
    shootingSlider.slider.oninput = shootingInput;
    let defenseSlider = new SliderDOM("Defense", 1, 5, postData.defense);
    defenseSlider.slider.oninput = defenseInput;

    let commDiv = document.createElement('div');
    commDiv.style = "display:flex; flex-direction: column; align-items:center;justify-content:left;";
    // commDiv.style.height = "100%";
    skillDiv.appendChild(commDiv);
    let comments = document.createElement('textarea');
    comments.id = "commentsText";
    comments.innerText = postData.comments;
    comments.style.width = "90%";
    comments.style.padding = "0px";
    comments.style.margin = "0 auto";
    
    commDiv.appendChild(comments);
}

function unLoadPostScreen(self) {
    

    // this.rung = _rung; // string
    // this.tipped = _tipped; // bool
    // this.gotUp = _gotUp; // bool
    // this.term = _term; // bool
    // this.die = _die; // bool
    // this.driver = _driver; // int
    // this.shooter = _shooter; // int
    // this.defense = _defense; // int
    let rung = postElements[0].getSelectedLabel();
    let succ = postElements[1].selected;
    // let tipped = postElements[2].selected;
    // let gotUp = postElements[3].selected;
    let noShow = postElements[2].selected;
    let ground = postElements[3].selected;
    let term = postElements[4].selected;
    let die = postElements[5].selected;
    
    let driver = document.getElementById('DriverSlider').value;
    let damage = document.getElementById('ShootingSlider').value;
    let defense = document.getElementById('DefenseSlider').value;

    let comments = document.getElementById('commentsText').value;

    postData = new PostData(rung, succ, noShow, ground, term, die, driver, damage, defense, comments);
    document.getElementById("skillDiv").remove();
    self.text = "POST";
}

function driverInput(e) {
    let lb = document.getElementById('DriverLabel');
    let sld = document.getElementById('DriverSlider');
    lb.innerText = "Driver: " + sld.value;
}

function shootingInput(e) {
    let lb = document.getElementById('ShootingLabel');
    let sld = document.getElementById('ShootingSlider');
    lb.innerText = "Damage: " + sld.value;
}

function defenseInput(e) {
    let lb = document.getElementById('DefenseLabel');
    let sld = document.getElementById('DefenseSlider');
    lb.innerText = "Defense: " + sld.value;
}

function createPostCanv() {
    let postCanv = document.createElement('canvas');
    document.body.appendChild(postCanv);
    postCanv.id = "postPanel";
    let postCtx = postCanv.getContext('2d');
    postCanv.style="position:absolute; left:0px; top:0px";
    postCanv.width = POST_WIDTH;
    postCanv.height = POST_HEIGHT;
    postCtx.fillStyle = "white";
    postCtx.fillRect(0,0,FIELD_WIDTH, FIELD_HEIGHT);
    fieldIsShown = true;

    postCanv.addEventListener('click', postCanvasClick);
}

function createPostButtons() {
    let postCtx = document.getElementById('postPanel').getContext('2d');
    // if (postElements.length == 0) {
        
        let hangerWidth = POST_WIDTH/2;
        let hangerHeight = POST_HEIGHT*4/5;
    
        let btnWidth = hangerWidth*2/(3);
        let btnHeight = hangerHeight*6/(7*4);
        let xSpace = hangerWidth/(3*2);
        let ySpace = hangerHeight/(7*5);
    
        let lowBtn = new CanvasBtn("LOW", postCtx, new Point(xSpace, ySpace), btnWidth, btnHeight);
        let midBtn = new CanvasBtn("MID", postCtx, new Point(xSpace, btnHeight+ySpace*2), btnWidth, btnHeight);
        let highBtn = new CanvasBtn("HIGH", postCtx, new Point(xSpace, 2*btnHeight+ySpace*3), btnWidth, btnHeight);
        let travBtn = new CanvasBtn("TRAV", postCtx, new Point(xSpace, 3*btnHeight+ySpace*4), btnWidth, btnHeight);
    
        let succWidth = hangerWidth*4/5;
        let succHeight = (POST_HEIGHT-hangerHeight)*7/8;
        let succXSpace = hangerWidth/(5*2);
        let succYSpace = (POST_HEIGHT-hangerHeight)/(8*2);
    
        let succBtn = new CanvasBtn("SUCCESSFUL?", postCtx, new Point(succXSpace, hangerHeight), succWidth, succHeight);
        succBtn.clicked = succBtnClicked;
    
        let hangerRadio = new RadioBtn();

        if (postElements.length != 0) {
            lowBtn.selected = postElements[0].btns[0].selected;
            midBtn.selected = postElements[0].btns[1].selected;
            highBtn.selected = postElements[0].btns[2].selected;
            travBtn.selected = postElements[0].btns[3].selected;

            if (postElements[1].selected)
                succBtn.clicked(succBtn);
            
        }
        succBtn.draw();
        hangerRadio.btns.push(lowBtn);
        hangerRadio.btns.push(midBtn);
        hangerRadio.btns.push(highBtn);
        hangerRadio.btns.push(travBtn);
 
        if (postElements.length != 0) {
            hangerRadio.select(postElements[0].selectedIndex);
        }
        hangerRadio.draw();

        let tippedWidth = hangerWidth*3/(4*2);
        let tippedHeight = hangerHeight*.375*.75;
        
        // let tippedBtn = new CanvasBtn("TIPPED", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        // tippedBtn.clicked = tippedBtnClicked;
        // tippedBtn.draw();
        // let gotUpBtn = new CanvasBtn("GOT UP", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        // gotUpBtn.clickOccured = gotUpBtnClickOccured;
        // gotUpBtn.clicked = v;

        let noShow = new CanvasBtn("NO SHOW", postCtx, new Point(POST_WIDTH*.75-hangerWidth*.375, POST_HEIGHT*.1875-tippedHeight/2), hangerWidth*.75, tippedHeight);
        noShow.draw();
        noShow.clicked = v;
        let groundBtn = new CanvasBtn("GROUND", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2, POST_HEIGHT*.5625-tippedHeight/2), tippedWidth, tippedHeight);
        groundBtn.clicked = v;
        groundBtn.draw();
        let termBtn = new CanvasBtn("TERMINAL", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2, POST_HEIGHT*.5625-tippedHeight/2), tippedWidth, tippedHeight);
        termBtn.clicked = v;
        termBtn.draw();
        
        let dieBtn = new CanvasBtn("DIE", postCtx, new Point(POST_WIDTH*.75-hangerWidth*.375, POST_HEIGHT*.875-tippedHeight/2), hangerWidth*.75, hangerHeight*.2)
        dieBtn.clicked = v;
        dieBtn.draw();

        if (postElements.length != 0) {
            // if (postElements[3].selected)
            //     gotUpBtn.clicked(gotUpBtn);
            // if (postElements[2].selected) {
            //     tippedBtn.clicked(tippedBtn);
            //     gotUpBtn.draw();
            // }
            if (postElements[2].selected)
                noShow.clicked(noShow);
            if (postElements[3].selected)
                groundBtn.clicked(groundBtn);
            if (postElements[4].selected)
                termBtn.clicked(termBtn);
            if (postElements[5].selected)
                dieBtn.clicked(dieBtn);
        }

        postElements = [];
        postElements.push(hangerRadio);
        postElements.push(succBtn);
        postElements.push(noShow);
        // postElements.push(tippedBtn);
        // postElements.push(gotUpBtn);

        postElements.push(groundBtn);
        postElements.push(termBtn);
        postElements.push(dieBtn);

        
    // } else {
    //     for (let i = 0; i < postElements.length; i++) {
    //         postElements[i].setCtx(postCtx);
    //         postElements[i].draw();
    //     }

    // }
    
}

function dieBtnClicked(self) {
    if (self.selected) {
        self.backgroundColor = 'grey';
    } else {
        self.backgroundColor = 'limegreen';
    }
    self.selected = !self.selected;
    self.draw();
}

function tippedBtnClicked(self) {
    if (self.selected) {
        self.backgroundColor = 'grey';
        postElements[3].clear('white');
    } else {
        self.backgroundColor = 'limegreen';
        postElements[3].draw();
    }
    self.selected = !self.selected;
    self.draw();
    
}

function gotUpBtnClickOccured(point) {
    if (postElements[3].isInside(point) && postElements[2].selected) {
        postElements[3].clicked(postElements[3]);
    }
}

function v(self) {
    if (self.selected) {
        self.backgroundColor = 'grey';
    } else {
        self.backgroundColor = 'limegreen';
    }
    self.selected = !self.selected;
    self.draw();
}

function postCanvasClick(e) {
    let point = new Point(e.x, e.y);
    for (let i = 0; i < postElements.length; i++) {
        postElements[i].clickOccured(point);
    }
}

function succBtnClicked(self) {
    if (self.selected) {
        self.backgroundColor = 'grey';
    } else {
        self.backgroundColor = 'limegreen';
    }
    self.draw();    
    self.selected = !self.selected;
}
