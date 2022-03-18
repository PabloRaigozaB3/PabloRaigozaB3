function getTerminalWidth(width) {
    let terminalWidthAct = 67.76;
    return (terminalWidthAct * width) / 648;
}

function getTerminalHeight(height) {
    let terminalHeightAct = 70.78;
    return (terminalHeightAct * height) / 324;
}

function drawField(width, height, ctx, point = new Point(0,0)) {
    ctx.fillStyle = 'white';
    ctx.fillRect(point.x,point.y,width, height);
    let hangarWidth = (width*127) / (2*324);
    let hangarHeight = (height*114) / (2*162);

    let terminalWidth = getTerminalWidth(width);
    let terminalHeight = getTerminalHeight(height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(point.x,point.y,hangarWidth,hangarHeight);

    ctx.fillStyle = 'red';
    ctx.fillRect(point.x+width-hangarWidth,point.y+height-hangarHeight,hangarWidth,hangarHeight);

    ctx.fillStyle = 'blue';
    drawTriangle(new Point(point.x,point.y+height-terminalHeight),
             new Point(point.x, point.y+height),
             new Point(point.x+terminalWidth, point.y+height), ctx);
    ctx.fillStyle = 'red';
    drawTriangle(new Point(point.x+width-terminalWidth,point.y),
             new Point(width+point.x, point.y),
             new Point(width+point.x, point.y+terminalHeight), ctx);

    for (let i = 0; i < 4; i++) {
        if (i < 2) {ctx.fillStyle = "blue";}
        else {ctx.fillStyle = "red";}

        drawWedge(new Point(point.x+width/2, point.y+height/2),
        height/3,
        65+i*(90),
        155+i*90, ctx);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    ctx.strokeStyle = "black";
    // ctx.fillStyle = "grey";
    // drawWedge(new Point(width/2, height/2),
    //       height/4,
    //       0,
    //       360);
    // ctx.fill();
    ctx.fillStyle = "black";
    drawWedge(new Point(point.x+width/2, point.y+height/2),
          height/9,
          0,
          360, ctx);
    ctx.fill();

    

}

function drawWedge(point1, radius, startAngle, endAngle, ctx, cc = false) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.arc(point1.x, point1.y, radius, startAngle*(Math.PI)/180, endAngle*(Math.PI)/180, cc);
    ctx.closePath();
}

function drawTriangle(point1, point2, point3, ctx) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();
    ctx.fill();
}

function drawCircle(point, radius, ctx) {
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.closePath();
}

function drawLine(point1, point2) {
    mainCtx.beginPath();
    mainCtx.moveTo(point1.x, point1.y);
    mainCtx.lineTo(point2.x, point2.y);
    mainCtx.closePath();
}
