const isTouch = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

const NO_SHOT = 2999;
const MISS_SHOT = 3000;
const MADE_SHOT = 3001;
const BLOCK_SHOT = 3002;

const FIELD_WIDTH = window.innerWidth*.85
const FIELD_HEIGHT = FIELD_WIDTH/2;

const BOTTOM_WIDTH = window.innerWidth;
const BOTTOM_HEIGHT = window.innerHeight-FIELD_HEIGHT;

const RIGHT_WIDTH = window.innerWidth-FIELD_WIDTH;
const RIGHT_HEIGHT = FIELD_HEIGHT;

const START_TRANS_R = 78;
const START_TRANS_G = 78;
const START_TRANS_B = 78;

const MISS_TRANS_R = 255;
const MISS_TRANS_G = 0;
const MISS_TRANS_B = 0;

const MADE_TRANS_R = 0;
const MADE_TRANS_G = 255;
const MADE_TRANS_B = 0;
