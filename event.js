document.body.addEventListener('touchstart', function(e) {
    e.preventDefault();
});

document.getElementById('mainPanel').addEventListener('click', function(e) {
    let point = globalToMain(new Point(e.x, e.y));
    for (let i = 0; i < mainElements.length; i++) {
        mainElements[i].clickOccured(point);
    }

    mainCtx.fillStyle = "green";
    drawCircle(point, 100, mainCtx);
    mainCtx.fill();
    e.preventDefault();
}, false);


document.getElementById('rightPanel').addEventListener('click', function(e) {
    let point = globalToRight(new Point(e.x, e.y));
    for (let i = 0; i < rightElements.length; i++) {
        rightElements[i].clickOccured(point);
    }
    e.preventDefault();
}, false);


document.getElementById('bottomPanel').addEventListener('click', function(e) {
    let point = globalToBottom(new Point(e.x, e.y));

    for (let i = 0; i < bottomElements.length; i++) {
        bottomElements[i].clickOccured(point);
    }
    e.preventDefault();
}, false);

let startedInRight = false;
document.getElementById('rightPanel').addEventListener('mousedown',function(e) {
    startedInRight = true;
});

document.getElementById('rightPanel').addEventListener('mouseup',function(e) {
    // if (!)
});
