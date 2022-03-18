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
    // let rung = postElements[0].getSelectedLabel();
    let rung = [];
    for (let i = 0; i < 4; i++) {
        rung.push(postElements[i].select);
    }
    // let tipped = postElements[2].selected;
    // let gotUp = postElements[3].selected;
    let noShow = postElements[4].selected;
    let ground = postElements[5].selected;
    let term = postElements[6].selected;
    let die = postElements[7].selected;
    
    let driver = document.getElementById('DriverSlider').value;
    let damage = document.getElementById('ShootingSlider').value;
    let defense = document.getElementById('DefenseSlider').value;

    let comments = document.getElementById('commentsText').value;

    postData = new PostData(rung, noShow, ground, term, die, driver, damage, defense, comments);
    document.getElementById("skillDiv").remove();
    self.text = "END";
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
        postCtx.fillStyle = "lightgrey";
        postCtx.fillRect(0,0,hangerWidth,FIELD_HEIGHT);    
        let btnWidth = hangerWidth*2/(3);
        let btnHeight = hangerHeight*6/(7*4);
        let xSpace = hangerWidth/(3*2);
        let ySpace = hangerHeight/(7*5);
        let succWidth = hangerWidth*4/5;
        let succHeight = (POST_HEIGHT-hangerHeight)*7/8;
        let succXSpace = hangerWidth/(5*2);
        let succYSpace = (POST_HEIGHT-hangerHeight)/(8*2);

        let hangerLbl = new CanvasBtn("HANGAR", postCtx, new Point(xSpace, ySpace), btnWidth, btnHeight)
        hangerLbl.backgroundColor = "lightgrey";
        hangerLbl.borderColor = "trans";
        hangerLbl.draw();
        let lowBtn = new CanvasBtn("LOW", postCtx, new Point(xSpace, succHeight+ySpace), btnWidth, btnHeight);
        let midBtn = new CanvasBtn("MID", postCtx, new Point(xSpace, succHeight+btnHeight+ySpace*2), btnWidth, btnHeight);
        let highBtn = new CanvasBtn("HIGH", postCtx, new Point(xSpace, succHeight+2*btnHeight+ySpace*3), btnWidth, btnHeight);
        let travBtn = new CanvasBtn("TRAV", postCtx, new Point(xSpace, succHeight+3*btnHeight+ySpace*4), btnWidth, btnHeight);
    
      
    
        // let succBtn = new CanvasBtn("SUCCESSFUL?", postCtx, new Point(succXSpace, hangerHeight), succWidth, succHeight);
        // succBtn.clicked = succBtnClicked;
    
        // let hangerRadio = new RadioBtn();
        // hangerRadio.selectColor = "limegreen";

        if (postElements.length != 0) {
            lowBtn.selected = postElements[0].state;
            midBtn.selected = postElements[1].state;
            highBtn.selected = postElements[2].state;
            travBtn.selected = postElements[3].state;
        }
        lowBtn.clicked = v;
        midBtn.clicked = v;
        highBtn.clicked = v;
        travBtn.clicked = v;
        lowBtn.draw();
        midBtn.draw();
        highBtn.draw();
        travBtn.draw();
        // hangerRadio.btns.push(lowBtn);
        // hangerRadio.btns.push(midBtn);
        // hangerRadio.btns.push(highBtn);
        // hangerRadio.btns.push(travBtn);
 
        // if (postElements.length != 0) {
        //     hangerRadio.select(postElements[0].selectedIndex);
        // }
        // hangerRadio.draw();

        let tippedWidth = hangerWidth*3/(4*2);
        let tippedHeight = hangerHeight*.375*.75;
        
        // let tippedBtn = new CanvasBtn("TIPPED", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        // tippedBtn.clicked = tippedBtnClicked;
        // tippedBtn.draw();
        // let gotUpBtn = new CanvasBtn("GOT UP", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        // gotUpBtn.clickOccured = gotUpBtnClickOccured;
        // gotUpBtn.clicked = v;

        let rightHeight = FIELD_HEIGHT / 6;
        let yRight = (FIELD_HEIGHT / (6*10));
        
        postCtx.fillStyle = "blue";
        postCtx.fillRect(hangerWidth, 0, POST_WIDTH-hangerWidth, 2*rightHeight);

        let intakeLbl = new CanvasBtn("INTAKE", postCtx, new Point(hangerWidth, 0), POST_WIDTH-hangerWidth, rightHeight);
        intakeLbl.backgroundColor = "blue";
        intakeLbl.borderColor = "trans";
        intakeLbl.draw();

        let groundBtn = new CanvasBtn("GND", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2, rightHeight-yRight), tippedWidth, rightHeight);
        groundBtn.clicked = groundBtnClicked;
        groundBtn.backgroundColor = "grey";
        groundBtn.draw();
        let termBtn = new CanvasBtn("TMNL", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2, rightHeight-yRight), tippedWidth, rightHeight);
        termBtn.backgroundColor = "grey";
        termBtn.clicked = groundBtnClicked;
        termBtn.draw();
        
        postCtx.fillStyle = "pink";
        postCtx.fillRect(hangerWidth, rightHeight*2, POST_WIDTH-hangerWidth, rightHeight+3*yRight);

        let dieBtnLbl = new CanvasBtn("DIED?", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2, rightHeight*2+yRight*2), tippedWidth, rightHeight)
        dieBtnLbl.backgroundColor = "pink";
        dieBtnLbl.borderColor= "trans";
        dieBtnLbl.draw();

        let dieBtn = new CanvasBtn("NO", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2, rightHeight*2+yRight*2), tippedWidth, rightHeight)
        dieBtn.backgroundColor = "limegreen";
        dieBtn.clicked = dieBtnClicked;
        dieBtn.draw();

        postCtx.fillStyle = "blue";
        postCtx.fillRect(hangerWidth, rightHeight*2+rightHeight+3*yRight, POST_WIDTH-hangerWidth, rightHeight+2*yRight);

        let foulLbl = new CanvasBtn("FOUL?", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2, rightHeight*3+yRight*4), tippedWidth, rightHeight)
        foulLbl.backgroundColor = "blue";
        foulLbl.borderColor= "trans";
        foulLbl.draw();

        let foulBtn = new CanvasBtn("NO", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2, rightHeight*3+yRight*4), tippedWidth, rightHeight)
        foulBtn.backgroundColor = "grey";
        foulBtn.clicked = foulBtnClicked;
        foulBtn.draw(); 
        
        postCtx.fillStyle = "pink";
        postCtx.fillRect(hangerWidth, rightHeight*2+rightHeight+3*yRight+rightHeight+2*yRight, POST_WIDTH-hangerWidth, 2*rightHeight);

        let noShowLbl = new CanvasBtn("SHOWED?", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2, rightHeight*4+yRight*7), tippedWidth, rightHeight)
        noShowLbl.backgroundColor = "pink";
        noShowLbl.borderColor= "trans";
        noShowLbl.draw();

        let noShow = new CanvasBtn("NO", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2, rightHeight*4+yRight*7), tippedWidth, rightHeight)
        noShow.backgroundColor = "red";
        noShow.clicked = noShowClicked;
        noShow.draw();// noShow.draw();
        // noShow.clicked = dieBtnClicked;
        
        // termBtn.draw();
        
        

        if (postElements.length != 0) {
            // if (postElements[3].selected)
            //     gotUpBtn.clicked(gotUpBtn);
            // if (postElements[2].selected) {
            //     tippedBtn.clicked(tippedBtn);
            //     gotUpBtn.draw();
            // }
            if (postElements[4].selected)
                noShow.clicked(noShow);
            if (postElements[5].selected)
                groundBtn.clicked(groundBtn);
            if (postElements[6].selected)
                termBtn.clicked(termBtn);
            if (postElements[7].selected)
                dieBtn.clicked(dieBtn);
            if (postElements[8].selected)
                dieBtn.clicked(dieBtn);
        }

        postElements = [];
        // postElements.push(hangerRadio);
        postElements.push(lowBtn);
        postElements.push(midBtn);
        postElements.push(highBtn);
        postElements.push(travBtn);
        postElements.push(noShow);
        // postElements.push(tippedBtn);
        // postElements.push(gotUpBtn);

        postElements.push(groundBtn);
        postElements.push(termBtn);
        postElements.push(dieBtn);
        postElements.push(foulBtn);


        
    // } else {
    //     for (let i = 0; i < postElements.length; i++) {
    //         postElements[i].setCtx(postCtx);
    //         postElements[i].draw();
    //     }

    // }
    
}

function dieBtnClicked(self) {
    if (!self.selected) {
        self.backgroundColor = 'red';
        self.text = "YES";
    } else {
        self.text = "NO";
        self.backgroundColor = 'limegreen';
    }
    self.selected = !self.selected;
    self.draw();
}

function noShowClicked(self) {
    if (self.selected) {
        self.backgroundColor = 'red';
        self.text = "NO";
    } else {
        self.text = "YES";
        self.backgroundColor = 'limegreen';
    }
    self.selected = !self.selected;
    self.draw();
}

function foulBtnClicked(self) {
    self.state++;
    if (self.state == 3)
        self.state = 0;
    
    if (this.state == 0){
        self.backgroundColor = 'grey';
        self.text = "NO";
    }else if (this.state == 1) {
        self.backgroundColor = "yellow";
        self.text = "YLW";
    }
    else {
        self.backgroundColor = "red";
        self.text = "RED"
    }
    
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
    self.state++;
    if (self.state == 3)
        self.state = 0;
    // if (self.selected) {
    //     self.backgroundColor = 'grey';
    // } else {
    //     self.backgroundColor = 'limegreen';
    // }
    // self.selected = !self.selected;
    
    if (this.state == 0)
        self.backgroundColor = 'grey';
    else if (this.state == 1)
        self.backgroundColor = "red";
    else
        self.backgroundColor = "limegreen";
    
    self.draw();
}

function groundBtnClicked(self) {
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
    // postElements[0].clickOccured(point, true, false);
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
