const isTouch = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

const NO_SHOT = 2999;
const MISS_SHOT = 3000;
const MADE_SHOT = 3001;
// const BLOCK_SHOT = 3002;

let FIELD_WIDTH = window.innerWidth;
let FIELD_HEIGHT = window.innerHeight*.85;

let POST_WIDTH = window.innerWidth*2/3;
let POST_HEIGHT = FIELD_HEIGHT;

let BOTTOM_WIDTH = window.innerWidth;
let BOTTOM_HEIGHT = window.innerHeight-FIELD_HEIGHT;

let RIGHT_WIDTH = window.innerWidth-FIELD_WIDTH;
let RIGHT_HEIGHT = FIELD_HEIGHT;
let CIRLCE_WIDTH = 0;
let SIDE_WIDTH = 0;

let RADIUS = 0;
let BALL_RADIUS = 0;

const START_TRANS_R = 78;
const START_TRANS_G = 78;
const START_TRANS_B = 78;

const MISS_TRANS_R = 255;
const MISS_TRANS_G = 0;
const MISS_TRANS_B = 0;

const MADE_TRANS_R = 0;
const MADE_TRANS_G = 255;
const MADE_TRANS_B = 0;

function repopulateConts() {
    FIELD_WIDTH = window.innerWidth;
    FIELD_HEIGHT = FIELD_WIDTH/2;

    POST_WIDTH = window.innerWidth*2/3;
    POST_HEIGHT = FIELD_HEIGHT;

    BOTTOM_WIDTH = window.innerWidth;
    BOTTOM_HEIGHT = window.innerHeight-FIELD_HEIGHT;

    RIGHT_WIDTH = window.innerWidth-FIELD_WIDTH;
    RIGHT_HEIGHT = FIELD_HEIGHT;
}
