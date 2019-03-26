const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext("2d");
let id = 0;

let STATE = {
    shapes: [],
    clickedShape: null,
    distanceBetweenShapes: 10
};