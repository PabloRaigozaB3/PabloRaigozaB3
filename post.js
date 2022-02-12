function loadPostScreen() {
    clearAllCanvas();
    createPostCanv();
    createPostButtons();
    createRightSliders();
}

function createRightSliders() {
    let rightSlidersDiv = document.createElement('div');
    rightSlidersDiv.style.position = "absolute";
    rightSlidersDiv.style.left = POST_WIDTH+"px";
    rightSlidersDiv.style.top = 0+"px";
    rightSlidersDiv.style.width = window.innerWidth - POST_WIDTH+"px";
    rightSlidersDiv.style.height = POST_HEIGHT+"px";
    document.body.appendChild(rightSlidersDiv);

    let rightSliderLabel = document.createElement('h1');
    rightSliderLabel.style.textAlign = "center";
    rightSliderLabel.style.fontSize = POST_HEIGHT/10+"px";
    rightSliderLabel.innerText = "SKILLS";
    rightSlidersDiv.appendChild(rightSliderLabel);

    let driverSlider = document.createElement('input');
    driverSlider.style.textAlgin = "center";
    driverSlider.style.width = "100%";driverSlider.type = "range";
    driverSlider.min = "1";
    driverSlider.min = "5";
    driverSlider.value = "4";
    driverSlider.defaultValue = "2";
    driverSlider.step = "10";
    driverSlider.id = "driverSlider";
    
    rightSlidersDiv.appendChild(driverSlider);
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
    if (postElements.length == 0) {
        let hangerWidth = POST_WIDTH/2;
        let hangerHeight = POST_HEIGHT*4/5;
    
        let btnWidth = hangerWidth*2/(3);
        let btnHeight = hangerHeight*6/(7*4);
        let xSpace = hangerWidth/(3*2);
        let ySpace = hangerHeight/(7*5);
    
        let lwoBtn = new CanvasBtn("LOW", postCtx, new Point(xSpace, ySpace), btnWidth, btnHeight);
        let midBtn = new CanvasBtn("MID", postCtx, new Point(xSpace, btnHeight+ySpace*2), btnWidth, btnHeight);
        let highBtn = new CanvasBtn("HIGH", postCtx, new Point(xSpace, 2*btnHeight+ySpace*3), btnWidth, btnHeight);
        let travBtn = new CanvasBtn("TRAV", postCtx, new Point(xSpace, 3*btnHeight+ySpace*4), btnWidth, btnHeight);
        lwoBtn.draw();
        midBtn.draw();
        highBtn.draw();
        travBtn.draw();
    
        let succWidth = hangerWidth*4/5;
        let succHeight = (POST_HEIGHT-hangerHeight)*7/8;
        let succXSpace = hangerWidth/(5*2);
        let succYSpace = (POST_HEIGHT-hangerHeight)/(8*2);
    
        let succBtn = new CanvasBtn("SUCCESSFUL?", postCtx, new Point(succXSpace, hangerHeight), succWidth, succHeight);
        succBtn.clicked = succBtnClicked;
        succBtn.draw();
    
        let hangerRadio = new RadioBtn();
        hangerRadio.btns.push(lwoBtn);
        hangerRadio.btns.push(midBtn);
        hangerRadio.btns.push(highBtn);
        hangerRadio.btns.push(travBtn);
 
        let tippedWidth = hangerWidth*3/(4*2);
        let tippedHeight = hangerHeight*.375*.75;
        
        let tippedBtn = new CanvasBtn("TIPPED", postCtx, new Point(POST_WIDTH*.625-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        tippedBtn.clicked = tippedBtnClicked;
        tippedBtn.draw();
        let gotUpBtn = new CanvasBtn("GOT UP", postCtx, new Point(POST_WIDTH*.875-tippedWidth/2,POST_HEIGHT*.1875-tippedHeight/2), tippedWidth, tippedHeight);
        gotUpBtn.clickOccured = gotUpBtnClickOccured;
        gotUpBtn.clicked = gotUpBtnClicked;

        let groundBtn = new CanvasBtn("GROUND", postCtx, new Point(tippedBtn.point.x, POST_HEIGHT*.5625-tippedHeight/2), tippedWidth, tippedHeight);
        groundBtn.draw();
        let termBtn = new CanvasBtn("TERMINAL", postCtx, new Point(gotUpBtn.point.x, groundBtn.point.y), tippedWidth, tippedHeight);
        termBtn.draw();
        let pickUpRadio = new RadioBtn();
        pickUpRadio.btns.push(groundBtn);
        pickUpRadio.btns.push(termBtn);
        let dieBtn = new CanvasBtn("DIE", postCtx, new Point(POST_WIDTH*.75-hangerWidth*.375, POST_HEIGHT*.875-tippedHeight/2), hangerWidth*.75, hangerHeight*.2)
        dieBtn.clicked = dieBtnClicked;
        dieBtn.draw();
        postElements.push(hangerRadio);
        postElements.push(succBtn);
        postElements.push(tippedBtn);
        postElements.push(gotUpBtn);

        postElements.push(pickUpRadio);
        postElements.push(dieBtn);
    } else {
        for (let i = 0; i < postElements.length; i++) {
            postElements[i].setCtx(postCtx);
            postElements[i].draw();
        }

    }
    
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

function gotUpBtnClicked(self) {
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
